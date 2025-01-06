import { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface Script {
  name: string;
  type: string;
  pattern: string;
  scriptPath: string;
  mitmDomain?: string;
  mitmMode?: string;
  timeout?: string;
}

export default function LocalEditor() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [moduleName, setModuleName] = useState('');
  const [moduleDesc, setModuleDesc] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  // 预添加脚本区域的状态
  const [scriptName, setScriptName] = useState('');
  const [scriptType, setScriptType] = useState('http-request');
  const [httpPattern, setHttpPattern] = useState('');
  const [mitmDomain, setMitmDomain] = useState('');
  const [mitmMode, setMitmMode] = useState('insert');
  const [cronPattern, setCronPattern] = useState('');
  const [wakeSystem, setWakeSystem] = useState(false);
  const [timeout, setTimeout] = useState('');
  const [scriptPath, setScriptPath] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  }, []);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      
      // 解析模块内容
      const nameMatch = content.match(/#!name=(.+)/);
      const descMatch = content.match(/#!desc=(.+)/);
      const scriptSection = content.match(/\[Script\]([\s\S]*?)(?=\[|$)/);

      if (scriptSection) {
        const scripts = scriptSection[1].trim().split('\n').filter(line => line.trim());
        const parsedScripts: Script[] = scripts.map(script => {
          const [name, ...paramParts] = script.split('=').map(s => s.trim());
          const params = paramParts.join('='); // 重新组合可能包含 = 的部分

          const paramMap = new Map();
          // 使用正则表达式匹配键值对，考虑到值可能包含逗号
          const matches = params.match(/(\w+(-\w+)*)=([^,]+)/g);
          if (matches) {
            matches.forEach(match => {
              const [key, ...valueParts] = match.split('=');
              const value = valueParts.join('='); // 重新组合可能包含 = 的值
              paramMap.set(key.trim(), value.trim());
            });
          }

          const type = paramMap.get('type') || '';
          if (type.includes('http')) {
            return {
              name,
              type,
              pattern: (paramMap.get('pattern') || '').replace(/"/g, ''),
              scriptPath: paramMap.get('script-path') || '',
              mitmDomain: paramMap.get('requires-body') || '',
              mitmMode: type.includes('response') ? 'response' : 'request'
            };
          } else {
            return {
              name,
              type,
              pattern: (paramMap.get('cronexp') || '').replace(/"/g, ''),
              scriptPath: paramMap.get('script-path') || '',
              timeout: paramMap.get('timeout')
            };
          }
        });

        setScripts(parsedScripts);
        setModuleName(nameMatch?.[1] || '');
        setModuleDesc(descMatch?.[1] || '');
      }
    } catch (error) {
      console.error('Failed to parse module file:', error);
      alert(t('parseError'));
    }

    // 清除文件输入，这样同一个文件可以重复选择
    event.target.value = '';
  };

  const handleEdit = (index: number) => {
    const script = scripts[index];
    setScriptName(script.name);
    setScriptType(script.type);
    if (script.type.includes('http')) {
      setHttpPattern(script.pattern);
      setMitmDomain(script.mitmDomain || '');
      setMitmMode(script.mitmMode || 'request');
    } else {
      setCronPattern(script.pattern);
      setTimeout(script.timeout || '6000');
    }
    setScriptPath(script.scriptPath);
    setEditingIndex(index);
  };

  const addScript = useCallback(() => {
    const newScript: Script = {
      name: scriptName,
      type: scriptType,
      pattern: scriptType.includes('http') ? httpPattern : cronPattern,
      scriptPath,
      mitmDomain: scriptType.includes('http') ? mitmDomain : undefined,
      mitmMode: scriptType.includes('http') ? mitmMode : undefined,
      timeout: scriptType === 'cron' ? timeout : undefined
    };

    if (editingIndex !== null) {
      // 编辑现有脚本
      setScripts(prev => {
        const newScripts = [...prev];
        newScripts[editingIndex] = newScript;
        return newScripts;
      });
      setEditingIndex(null);
    } else {
      // 添加新脚本
      setScripts(prev => [...prev, newScript]);
    }

    // 重置表单
    setScriptName('');
    setScriptType('http-request');
    setHttpPattern('');
    setMitmDomain('');
    setMitmMode('request');
    setCronPattern('');
    setTimeout('6000');
    setScriptPath('');
  }, [scriptName, scriptType, httpPattern, cronPattern, scriptPath, mitmDomain, mitmMode, timeout, editingIndex]);

  const deleteScript = useCallback((index: number) => {
    setScripts((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const saveConfig = useCallback(() => {
    try {
      // 实现保存逻辑
      alert('保存成功！');
    } catch (error) {
      alert(t('saveFailed'));
    }
  }, [scripts, moduleName, moduleDesc, t]);

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const generateConfig = useCallback(() => {
    let config = `#!name=${moduleName}\n`;
    config += `#!desc=${moduleDesc}\n\n`;
    config += '[Script]\n';
    
    scripts.forEach(script => {
      if (script.type.includes('http')) {
        config += `${script.name} = type=${script.type},pattern=${script.pattern},requires-body=1,max-size=0,script-path=${script.scriptPath},script-update-interval=604800`;
        if (script.mitmDomain) {
          config += `,${script.mitmMode}-body=${script.mitmDomain}`;
        }
      } else {
        // cron 类型
        config += `${script.name} = type=cron,cronexp=${script.pattern},script-path=${script.scriptPath},script-update-interval=604800,timeout=6000`;
      }
      config += '\n';
    });
    
    return config;
  }, [moduleName, moduleDesc, scripts]);

  const handleDownload = useCallback(() => {
    const config = generateConfig();
    const blob = new Blob([config], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${moduleName || 'surge-module'}.sgmodule`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [generateConfig, moduleName]);

  const handleCopyToClipboard = useCallback(() => {
    const config = generateConfig();
    navigator.clipboard.writeText(config)
      .then(() => alert(t('copySuccess')))
      .catch(() => alert(t('copyFailed')));
  }, [generateConfig, t]);

  useEffect(() => {
    const handleImport = () => {
      fileInputRef.current?.click();
    };

    window.addEventListener('triggerImport', handleImport);
    return () => {
      window.removeEventListener('triggerImport', handleImport);
    };
  }, []);

  useEffect(() => {
    const savedConfig = localStorage.getItem('config');
    if (savedConfig) {
      // 加载已保存的配置
    }
  }, []);

  useEffect(() => {
    const handleSaveConfig = () => {
      saveConfig();
    };

    window.addEventListener('save-config', handleSaveConfig);
    return () => {
      window.removeEventListener('save-config', handleSaveConfig);
    };
  }, [saveConfig]);

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-20">
      {/* 导入模块的文件输入（隐藏） */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* 拖放区域（覆盖整个页面） */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="min-h-full"
      >
        {/* 主内容区域 */}
        <div className="container mx-auto p-8">
          <div className="grid grid-cols-12 gap-8">
            {/* 左侧：预添加脚本区 */}
            <div className="col-span-7">
              <div className="bg-white/70 backdrop-blur-sm shadow-lg rounded-lg p-8 sticky top-24">
                <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2 text-gray-800">
                  <i className="ti ti-plus-circle"></i> {t('addScriptSection')}
                </h2>
                <div className="space-y-8">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-3">
                      {t('scriptName')}
                    </label>
                    <input
                      type="text"
                      value={scriptName}
                      onChange={(e) => setScriptName(e.target.value)}
                      placeholder={t('scriptNamePlaceholder')}
                      className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-3">
                      {t('type')}
                    </label>
                    <select
                      value={scriptType}
                      onChange={(e) => setScriptType(e.target.value)}
                      className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="http-request">HTTP Request</option>
                      <option value="http-response">HTTP Response</option>
                      <option value="cron">Cron</option>
                    </select>
                  </div>

                  {scriptType.includes('http') && (
                    <>
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-3">
                          {t('httpPattern')}
                        </label>
                        <input
                          type="text"
                          value={httpPattern}
                          onChange={(e) => setHttpPattern(e.target.value)}
                          placeholder={t('httpPatternPlaceholder')}
                          className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-3">
                          {t('mitmDomain')}
                        </label>
                        <input
                          type="text"
                          value={mitmDomain}
                          onChange={(e) => setMitmDomain(e.target.value)}
                          placeholder={t('mitmDomainPlaceholder')}
                          className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-3">
                          {t('mitmMode')}
                        </label>
                        <select
                          value={mitmMode}
                          onChange={(e) => setMitmMode(e.target.value)}
                          className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="insert">{t('mitmInsert')}</option>
                          <option value="append">{t('mitmAppend')}</option>
                        </select>
                      </div>
                    </>
                  )}

                  {scriptType === 'cron' && (
                    <>
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-3">
                          {t('cronPattern')}
                        </label>
                        <input
                          type="text"
                          value={cronPattern}
                          onChange={(e) => setCronPattern(e.target.value)}
                          placeholder={t('cronPatternPlaceholder')}
                          className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div className="space-y-6">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={wakeSystem}
                            onChange={(e) => setWakeSystem(e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label className="ml-3 text-lg text-gray-700">
                            {t('wakeSystem')}
                          </label>
                        </div>
                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-3">
                            {t('timeout')}
                          </label>
                          <input
                            type="number"
                            value={timeout}
                            onChange={(e) => setTimeout(e.target.value)}
                            className="w-48 px-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-3">
                      {t('scriptPath')}
                    </label>
                    <input
                      type="text"
                      value={scriptPath}
                      onChange={(e) => setScriptPath(e.target.value)}
                      placeholder={t('scriptPathPlaceholder')}
                      className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <button
                    onClick={addScript}
                    className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg transition-all text-xl font-semibold flex items-center justify-center gap-2"
                  >
                    <i className="ti ti-plus"></i> {t('addScript')}
                  </button>
                </div>
              </div>
            </div>

            {/* 右侧：已存在脚本区和编辑模块详情 */}
            <div className="col-span-5">
              <div className="grid grid-rows-2 gap-8 h-[calc(100vh-8rem)] sticky top-24">
                {/* 已存在脚本区 */}
                <div className="bg-white/70 backdrop-blur-sm shadow-lg rounded-lg p-6 overflow-auto">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800 sticky top-0 bg-white/70 backdrop-blur-sm py-2">
                    <i className="ti ti-list"></i> {t('existingScriptsSection')}
                  </h2>
                  <div className="space-y-4">
                    {scripts.length > 0 ? (
                      scripts.map((script, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow"
                        >
                          <h3 className="text-lg font-semibold mb-2">{script.name}</h3>
                          <div className="grid gap-2 text-sm text-gray-600">
                            <p>
                              <span className="font-medium">{t('type')}:</span> {script.type}
                            </p>
                            {script.type === 'http-request' ? (
                              <>
                                <p>
                                  <span className="font-medium">{t('httpPattern')}:</span>{' '}
                                  {script.pattern}
                                </p>
                                <p>
                                  <span className="font-medium">{t('mitmDomain')}:</span>{' '}
                                  {script.mitmDomain}
                                </p>
                              </>
                            ) : (
                              <>
                                <p>
                                  <span className="font-medium">{t('cronPattern')}:</span>{' '}
                                  {script.pattern}
                                </p>
                                <p>
                                  <span className="font-medium">{t('timeout')}:</span>{' '}
                                  {script.timeout}ms
                                </p>
                              </>
                            )}
                          </div>
                          <div className="mt-4 flex gap-2">
                            <button
                              onClick={() => handleEdit(index)}
                              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg transition-all text-sm"
                            >
                              <i className="ti ti-edit"></i> {t('editScript')}
                            </button>
                            <button
                              onClick={() => deleteScript(index)}
                              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg transition-all text-sm"
                            >
                              <i className="ti ti-trash"></i> {t('delete')}
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        {t('noScriptsMessage')}
                      </div>
                    )}
                  </div>
                </div>

                {/* 编辑模块详情 */}
                <div className="bg-white/70 backdrop-blur-sm shadow-lg rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
                    <i className="ti ti-edit"></i> {t('editDetailsSection')}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('moduleName')}
                      </label>
                      <input
                        type="text"
                        value={moduleName}
                        onChange={(e) => setModuleName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('moduleDesc')}
                      </label>
                      <textarea
                        value={moduleDesc}
                        onChange={(e) => setModuleDesc(e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={saveConfig}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      >
                        {t('saveButton')}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                      >
                        {t('download')}
                      </button>
                      <button
                        onClick={handleCopyToClipboard}
                        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                      >
                        {t('copyToClipboard')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}