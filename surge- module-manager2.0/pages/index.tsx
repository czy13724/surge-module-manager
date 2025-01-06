import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import ModuleEditor from '../components/ModuleEditor';
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

  const handleModeSwitch = (newMode: 'local' | 'remote') => {
    if (newMode === 'remote' && !session) {
      const confirmSwitch = window.confirm(t('loginPrompt'));
      if (confirmSwitch) {
        signIn('github');
        return;
      }
    }
    setMode(newMode);
  };

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content="Manage your Surge modules" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.40.0/tabler-icons.min.css" />
      </Head>

      <div className="min-h-screen">
        <nav className="bg-white/90 backdrop-blur-sm shadow fixed top-0 w-full z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <i className="ti ti-box"></i> 
                  {t('title')}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                {mode === 'local' && (
                  <>
                    <button
                      onClick={() => {
                        // 触发本地编辑器的导入功能
                        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                        if (fileInput) fileInput.click();
                      }}
                      className="px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white transition-all flex items-center gap-2"
                    >
                      <i className="ti ti-upload"></i> {t('importModule')}
                    </button>
                    <button
                      onClick={() => {
                        // 触发本地编辑器的保存功能
                        const event = new CustomEvent('save-config');
                        window.dispatchEvent(event);
                      }}
                      className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white transition-all flex items-center gap-2"
                    >
                      <i className="ti ti-device-floppy"></i> {t('saveConfig')}
                    </button>
                  </>
                )}
                <button
                  onClick={toggleLanguage}
                  className="px-4 py-2 rounded-md bg-gray-900 hover:bg-gray-800 text-white transition-all flex items-center gap-2"
                >
                  <i className="ti ti-language"></i> {language === 'zh' ? 'EN' : '中文'}
                </button>
                <div className="grid grid-cols-2 p-0.5 rounded-lg bg-gray-700 relative w-56">
                  {/* 滑动的背景块 */}
                  <div
                    className={`absolute top-0.5 bottom-0.5 w-[50%] bg-blue-500 rounded-md transition-transform duration-300 ease-in-out ${
                      mode === 'remote' ? 'translate-x-full' : ''
                    }`}
                  ></div>
                  {/* 按钮 */}
                  <button
                    onClick={() => handleModeSwitch('local')}
                    className="relative z-10 px-3 py-1.5 rounded-md flex items-center justify-center gap-1.5 text-white text-sm"
                  >
                    <i className="ti ti-device-laptop"></i> {t('localMode')}
                  </button>
                  <button
                    onClick={() => handleModeSwitch('remote')}
                    className="relative z-10 px-3 py-1.5 rounded-md flex items-center justify-center gap-1.5 text-white text-sm"
                  >
                    <i className="ti ti-cloud"></i> {t('remoteMode')}
                  </button>
                </div>
                {mode === 'remote' && (
                  session ? (
                    <>
                      <span className="text-sm text-gray-600">
                        <i className="ti ti-user"></i> {session.user?.name}
                      </span>
                      <button
                        onClick={() => signOut()}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all"
                      >
                        <i className="ti ti-logout"></i> {t('logout')}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => signIn('github')}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-all"
                    >
                      <i className="ti ti-brand-github"></i> {t('login')}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-16">
          {mode === 'local' ? (
            <LocalEditor />
          ) : (
            <div className="bg-white/90 backdrop-blur-sm shadow rounded-lg p-6">
              {!isEditing ? (
                <div className="space-y-4">
                  {!session ? (
                    <div className="text-center py-8">
                      <i className="ti ti-lock text-4xl text-gray-400"></i>
                      <p className="mt-2 text-gray-600">{t('loginRequired')}</p>
                      <button
                        onClick={() => signIn('github')}
                        className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-md transition-all"
                      >
                        <i className="ti ti-brand-github"></i> {t('login')}
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={handleCreateNew}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-all"
                      >
                        <i className="ti ti-plus"></i> {t('addScript')}
                      </button>
                      {/* 远程 Gist 列表 */}
                    </>
                  )}
                </div>
              ) : (
                <ModuleEditor
                  gistId={selectedGist?.id}
                  initialContent={selectedGist?.files[Object.keys(selectedGist.files)[0]]?.content}
                  onSave={handleSaveComplete}
                />
              )}
            </div>
          )}
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
      </div>

      <style jsx global>{`
        body {
          background: url('https://cdn.jsdelivr.net/gh/czy13724/czy13724.github.io@master/img/bg/image_16.jpg') center/cover fixed no-repeat;
        }
      `}</style>
    </>
  );
}
