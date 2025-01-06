import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import Head from 'next/head';
import ModuleEditor from '../components/ModuleEditor';
import GistSelector from '../components/GistSelector';
import dynamic from 'next/dynamic';
import { useTranslation } from '../hooks/useTranslation';

// 动态导入不需要 SSR 的组件
const LocalEditor = dynamic(() => import('../components/LocalEditor'), {
  ssr: false
});

export default function Home() {
  const { data: session } = useSession();
  const [mode, setMode] = useState<'local' | 'remote'>('local');
  const [selectedGist, setSelectedGist] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { t, language, toggleLanguage } = useTranslation();

  const handleGistSelect = (gist) => {
    if (!session) {
      alert(t('loginRequired'));
      return;
    }
    setSelectedGist(gist);
    setIsEditing(true);
  };

  const handleCreateNew = () => {
    if (!session && mode === 'remote') {
      alert(t('loginRequired'));
      return;
    }
    setSelectedGist(null);
    setIsEditing(true);
  };

  const handleSaveComplete = () => {
    setIsEditing(false);
    setSelectedGist(null);
  };

  const handleBack = () => {
    setIsEditing(false);
    setSelectedGist(null);
  };

  const handleModeSwitch = (newMode: 'local' | 'remote') => {
    if (newMode === 'remote' && !session) {
      const confirmSwitch = window.confirm(t('loginPrompt'));
      if (confirmSwitch) {
        signIn('github');
        return;
      }
    }
    setMode(newMode);
    setSelectedGist(null);
    setIsEditing(false);
  };

  if (isEditing) {
    return mode === 'local' ? (
      <LocalEditor />
    ) : (
      <ModuleEditor
        gistId={selectedGist?.id}
        initialContent={selectedGist?.files?.['surge-module.sgmodule']?.content}
        onSave={handleSaveComplete}
      />
    );
  }

  return (
    <div>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content="Manage your Surge modules" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.40.0/tabler-icons.min.css" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* 导航栏 */}
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <h1 className="text-xl font-semibold text-gray-900">{t('title')}</h1>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleModeSwitch('local')}
                    className={`px-4 py-2 rounded-md ${
                      mode === 'local'
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {t('localMode')}
                  </button>
                  <button
                    onClick={() => handleModeSwitch('remote')}
                    className={`px-4 py-2 rounded-md ${
                      mode === 'remote'
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {t('remoteMode')}
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleLanguage}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  {language === 'zh' ? 'EN' : '中文'}
                </button>
                {session ? (
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2 text-red-600 hover:text-red-700"
                  >
                    {t('logout')}
                  </button>
                ) : (
                  <button
                    onClick={() => signIn('github')}
                    className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                  >
                    {t('login')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* 主要内容区域 */}
        <div className="container mx-auto px-4 pt-20">
          {mode === 'local' ? (
            <LocalEditor />
          ) : (
            <GistSelector
              onSelect={handleGistSelect}
              onCreateNew={handleCreateNew}
              selectedGist={selectedGist}
            />
          )}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-black/50 backdrop-blur-sm text-white text-center py-4">
        <div className="space-y-1">
          <div>
            Powered by <a href="https://github.com/czy13724" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">Levi</a>
          </div>
          <div className="text-sm text-gray-400">
            Copyright &copy; {new Date().getFullYear()} Levi. All rights reserved.
          </div>
        </div>
      </footer>

      <style jsx global>{`
        body {
          background: url('https://cdn.jsdelivr.net/gh/czy13724/czy13724.github.io@master/img/bg/image_16.jpg') center/cover fixed no-repeat;
        }
      `}</style>
    </div>
  );
}
