import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface Props {
  gistId?: string;
  initialContent?: string;
  onSave: () => void;
}

export default function ModuleEditor({ gistId, initialContent = '', onSave }: Props) {
  const { data: session } = useSession();
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!session?.accessToken) {
      alert('请先登录！');
      return;
    }

    setIsSaving(true);
    try {
      if (gistId) {
        // 更新已存在的 Gist
        const response = await axios.patch(`/api/github/gist`, {
          gist_id: gistId,
          content,
        });
        console.log('Gist updated:', response.data);
      } else {
        // 创建新的 Gist
        const response = await axios.post('/api/github/gists', {
          filename: 'surge-module.sgmodule',
          content,
          description: 'Surge Module',
        });
        console.log('New gist created:', response.data);
      }
      onSave();
    } catch (error: any) {
      console.error('保存失败:', error.response || error);
      const errorMessage = error.response?.data?.error || error.message || '保存失败，请重试！';
      alert(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-96 p-4 font-mono text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="在此输入你的 Surge 模块内容..."
      />
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-4 py-2 rounded-md text-white ${
            isSaving
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-500 hover:bg-indigo-600'
          }`}
        >
          {isSaving ? '保存中...' : '保存'}
        </button>
      </div>
    </div>
  );
}
