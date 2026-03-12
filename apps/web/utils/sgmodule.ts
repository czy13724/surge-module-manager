export type ScriptType = 'http-request' | 'http-response' | 'cron';

export interface ScriptItem {
  name: string;
  type: ScriptType;
  pattern: string;
  scriptPath: string;
  mitmDomain?: string;
  mitmMode?: 'insert' | 'append';
  timeout?: string;
  wakeSystem?: boolean;
  updateIntervalEnabled?: boolean;
  updateInterval?: string;
}

export interface ParsedModule {
  name: string;
  author?: string;
  desc: string;
  icon?: string;
  category?: string;
  scripts: ScriptItem[];
}

const NAME_RE = /#!name[= ]\s*(.+)/i;
const AUTHOR_RE = /#!author[= ]\s*(.+)/i;
const DESC_RE = /#!desc[= ]\s*(.+)/i;
const ICON_RE = /#!icon[= ]\s*(.+)/i;
const CATEGORY_RE = /#!category\s*=?\s*(.+)/i;

function splitParams(input: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      current += ch;
      continue;
    }
    if (ch === ',' && !inQuotes) {
      if (current.trim()) result.push(current.trim());
      current = '';
      continue;
    }
    current += ch;
  }
  if (current.trim()) result.push(current.trim());
  return result;
}

function parseParams(paramStr: string): Map<string, string> {
  const map = new Map<string, string>();
  const parts = splitParams(paramStr);
  for (const part of parts) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    const key = part.slice(0, eq).trim();
    let value = part.slice(eq + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    map.set(key, value);
  }
  return map;
}

export function parseModuleContent(content: string): ParsedModule {
  const nameMatch = content.match(NAME_RE);
  const authorMatch = content.match(AUTHOR_RE);
  const descMatch = content.match(DESC_RE);
  const iconMatch = content.match(ICON_RE);
  const categoryMatch = content.match(CATEGORY_RE);
  const scriptSectionMatch = content.match(/\[Script\]([\s\S]*?)(?=\n\[|$)/i);

  const scripts: ScriptItem[] = [];
  if (scriptSectionMatch) {
    const lines = scriptSectionMatch[1]
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith('#') && !line.startsWith(';'));

    for (const line of lines) {
      const [namePart, ...paramParts] = line.split('=');
      if (!namePart || paramParts.length === 0) continue;
      const name = namePart.trim();
      const params = paramParts.join('=').trim();
      const paramMap = parseParams(params);

      const type = (paramMap.get('type') || '') as ScriptType;
      if (type.includes('http')) {
        const mitmDomain = paramMap.get('insert-body') || paramMap.get('append-body');
        const mitmMode = paramMap.get('append-body')
          ? 'append'
          : (paramMap.get('insert-body') ? 'insert' : undefined);
        const updateIntervalRaw = paramMap.get('script-update-interval');
        const updateIntervalEnabled = Boolean(updateIntervalRaw && updateIntervalRaw !== '-1');
        scripts.push({
          name,
          type,
          pattern: paramMap.get('pattern') || '',
          scriptPath: paramMap.get('script-path') || '',
          mitmDomain,
          mitmMode,
          updateIntervalEnabled,
          updateInterval: updateIntervalRaw || '',
        });
      } else if (type === 'cron') {
        const wakeRaw = paramMap.get('wake-system');
        const wakeSystem = wakeRaw === '1' || wakeRaw === 'true';
        const updateIntervalRaw = paramMap.get('script-update-interval');
        const updateIntervalEnabled = Boolean(updateIntervalRaw && updateIntervalRaw !== '-1');
        scripts.push({
          name,
          type,
          pattern: paramMap.get('cronexp') || '',
          scriptPath: paramMap.get('script-path') || '',
          timeout: paramMap.get('timeout'),
          wakeSystem,
          updateIntervalEnabled,
          updateInterval: updateIntervalRaw || '',
        });
      }
    }
  }

  return {
    name: nameMatch?.[1]?.trim() || '',
    author: authorMatch?.[1]?.trim() || '',
    desc: descMatch?.[1]?.trim() || '',
    icon: iconMatch?.[1]?.trim() || '',
    category: categoryMatch?.[1]?.trim() || '',
    scripts,
  };
}

export function buildModuleContent(
  name: string,
  desc: string,
  scripts: ScriptItem[],
  meta?: { author?: string; icon?: string; category?: string }
): string {
  const mitmSeen = new Set<string>();
  let content = `#!name=${name || 'Untitled Module'}\n`;
  if (meta?.author) content += `#!author=${meta.author}\n`;
  content += `#!desc=${desc || ''}\n`;
  if (meta?.icon) content += `#!icon=${meta.icon}\n`;
  if (meta?.category) content += `#!category=${meta.category}\n`;
  content += '\n';

  if (scripts.length > 0) {
    content += '[Script]\n';
    for (const script of scripts) {
      content += `${script.name} = type=${script.type}`;
      if (script.type.includes('http')) {
        content += `,pattern=${script.pattern}`;
        content += `,requires-body=true,max-size=0,script-path=${script.scriptPath}`;
        const intervalValue = script.updateIntervalEnabled
          ? (script.updateInterval || '0')
          : '-1';
        content += `,script-update-interval=${intervalValue}`;
        if (script.mitmDomain && script.mitmMode) {
          const key = `${script.mitmMode}:${script.mitmDomain}`;
          if (!mitmSeen.has(key)) {
            content += `,${script.mitmMode}-body=${script.mitmDomain}`;
            mitmSeen.add(key);
          }
        }
      } else {
        content += `,cronexp=${script.pattern}`;
        content += `,script-path=${script.scriptPath}`;
        const intervalValue = script.updateIntervalEnabled
          ? (script.updateInterval || '0')
          : '-1';
        content += `,script-update-interval=${intervalValue}`;
        if (script.timeout) {
          content += `,timeout=${script.timeout}`;
        }
        if (script.wakeSystem) {
          content += `,wake-system=1`;
        }
      }
      content += '\n';
    }
  }

  return content;
}
