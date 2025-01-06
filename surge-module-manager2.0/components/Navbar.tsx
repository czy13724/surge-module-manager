import { useTranslation } from '../hooks/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavbarProps {
  onImportClick: () => void;
  onSaveConfig: () => void;
}

export default function Navbar({ onImportClick, onSaveConfig }: NavbarProps) {
  const { t, toggleLanguage, language } = useTranslation();
  const router = useRouter();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-8">
            <span className="text-xl font-semibold">Surge Module Manager</span>
            <div className="flex items-center space-x-2">
              <Link href="/">
                <a className={`px-4 py-2 rounded-lg transition-all ${
                  router.pathname === '/' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}>
                  {t('localMode')}
                </a>
              </Link>
              <Link href="/remote">
                <a className={`px-4 py-2 rounded-lg transition-all ${
                  router.pathname === '/remote' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}>
                  {t('remoteMode')}
                </a>
              </Link>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-all"
            >
              {language === 'en' ? 'EN' : '中文'}
            </button>

            {/* GitHub Login */}
            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all">
              GitHub {t('login')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
