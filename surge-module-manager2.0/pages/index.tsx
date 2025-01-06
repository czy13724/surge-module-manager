import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import Head from 'next/head';
import ModuleEditor from '../components/ModuleEditor';
import GistSelector from '../components/GistSelector';
import dynamic from 'next/dynamic';
import { useTranslation } from '../contexts/LanguageContext';
import Navbar from '../components/Navbar';

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

  const handleImportClick = () => {
    // 触发 LocalEditor 中的文件输入
    const fileInput = document.querySelector('#fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
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
        onBack={handleBack}
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

      <Navbar 
        onImportClick={handleImportClick} 
        mode={mode} 
        onModeSwitch={handleModeSwitch} 
        session={session} 
        onLogin={() => signIn('github')} 
        onLogout={() => signOut()} 
        onLanguageSwitch={toggleLanguage} 
        language={language} 
      />

      <main className="min-h-screen">
        {/* 主内容区域 */}
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

      <footer className="fixed bottom-0 left-0 w-full text-center py-4">
        <div className="inline-block bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">
          <span>
            Powered by <a href="https://github.com/czy13724" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-600">Levi</a>
          </span>
          <span className="mx-1">•</span>
          <span className="text-gray-500">
            Copyright &copy; {new Date().getFullYear()} Levi. All rights reserved.
          </span>
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
