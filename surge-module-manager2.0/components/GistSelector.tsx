import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from '../contexts/LanguageContext';

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
  selectedGist: Gist | null;
}

export default function GistSelector({ onSelect, onCreateNew, selectedGist }: Props) {
  const [gists, setGists] = useState<Gist[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

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
      const errorMessage = error.response?.data?.error || error.message || t('loadGistsFailed');
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">{t('loading')}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{t('selectGist')}</h3>
        <button
          onClick={onCreateNew}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
        >
          {t('createNew')}
        </button>
      </div>
      <div className="grid gap-4">
        {gists.length > 0 ? (
          gists.map((gist) => (
            <button
              key={gist.id}
              onClick={() => onSelect(gist)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selectedGist?.id === gist.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <h4 className="font-medium">{gist.description || t('untitledGist')}</h4>
              <div className="text-sm text-gray-500 mt-1">
                {Object.keys(gist.files).join(', ')}
              </div>
            </button>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">{t('noGistsFound')}</div>
        )}
      </div>
    </div>
  );
}
