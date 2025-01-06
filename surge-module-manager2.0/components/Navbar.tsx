import { useTranslation } from '../contexts/LanguageContext';
import Link from 'next/link';
import { Session } from 'next-auth';

interface NavbarProps {
  onImportClick: () => void;
  onSaveConfig: () => void;
  mode: 'local' | 'remote';
  onModeSwitch: (mode: 'local' | 'remote') => void;
  session: Session | null;
  onLogin: () => void;
  onLogout: () => void;
  onLanguageSwitch: () => void;
  language: 'zh' | 'en';
}

export default function Navbar({
  onImportClick,
  onSaveConfig,
  mode,
  onModeSwitch,
  session,
  onLogin,
  onLogout,
  onLanguageSwitch,
  language
}: NavbarProps) {
  const { t } = useTranslation();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center space-x-2">
                <i className="ti ti-box text-xl"></i>
                <span className="text-xl font-semibold">Surge Module Manager</span>
              </a>
            </Link>
          </div>

          {/* Center: Actions */}
          <div className="flex items-center space-x-4">
            {mode === 'local' && (
              <>
                <button
                  onClick={onImportClick}
                  className="flex items-center space-x-1 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all"
                >
                  <i className="ti ti-upload"></i>
                  <span>{t('importModule')}</span>
                </button>
                <button
                  onClick={onSaveConfig}
                  className="flex items-center space-x-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                >
                  <i className="ti ti-device-floppy"></i>
                  <span>{t('saveConfig')}</span>
                </button>
              </>
            )}
          </div>

          {/* Right: Mode, Language and Login */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onLanguageSwitch}
              className="px-3 py-1.5 text-gray-600 hover:text-gray-900 transition-all"
            >
              {language === 'en' ? 'EN' : '中文'}
            </button>
            <button
              onClick={() => onModeSwitch('local')}
              className={`px-4 py-1.5 rounded-l-lg transition-all ${
                mode === 'local' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t('localMode')}
            </button>
            <button
              onClick={() => onModeSwitch('remote')}
              className={`px-4 py-1.5 rounded-r-lg transition-all ${
                mode === 'remote' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t('remoteMode')}
            </button>
            {session ? (
              <button
                onClick={onLogout}
                className="px-4 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all flex items-center space-x-1"
              >
                <i className="ti ti-logout"></i>
                <span>{t('logout')}</span>
              </button>
            ) : (
              <button
                onClick={onLogin}
                className="px-4 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all flex items-center space-x-1"
              >
                <i className="ti ti-brand-github"></i>
                <span>{t('login')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
