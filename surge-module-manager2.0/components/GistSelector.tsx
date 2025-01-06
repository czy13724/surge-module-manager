import { useState, useEffect } from 'react';
import axios from 'axios';

interface Gist {
  id: string;
  description: string;
  files: {
    [key: string]: {
      filename: string;
      raw_url: string;
    };
  };
}

interface Props {
  onSelect: (gist: Gist) => void;
  onCreateNew: () => void;
}

export default function GistSelector({ onSelect, onCreateNew }: Props) {
  const [gists, setGists] = useState<Gist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGists();
  }, []);

  const loadGists = async () => {
    try {
      const response = await axios.get('/api/github/gists');
      console.log('Loaded gists:', response.data);
      setGists(response.data);
    } catch (error: any) {
      console.error('Failed to load gists:', error.response || error);
      const errorMessage = error.response?.data?.error || error.message || '加载 Gist 失败';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">加载中...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">选择 Gist</h3>
        <button
          onClick={onCreateNew}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          创建新配置
        </button>
      </div>
      
      <div className="grid gap-4">
        {gists.map((gist) => (
          <div
            key={gist.id}
            className="border rounded p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => onSelect(gist)}
          >
            <h4 className="font-medium">{gist.description || '未命名配置'}</h4>
            <div className="text-sm text-gray-500 mt-1">
              文件: {Object.keys(gist.files).join(', ')}
            </div>
          </div>
        ))}
        {gists.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            没有找到私有 Gist，点击上方按钮创建新配置
          </div>
        )}
      </div>
    </div>
  );
}
