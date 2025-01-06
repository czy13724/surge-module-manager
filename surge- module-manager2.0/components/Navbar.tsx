import { useTranslation } from '../hooks/useTranslation';

interface NavbarProps {
  onImportClick: () => void;
  onSaveConfig: () => void;
}

export default function Navbar({ onImportClick, onSaveConfig }: NavbarProps) {
  const { t, toggleLanguage, currentLanguage } = useTranslation();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <i className="ti ti-box text-2xl text-indigo-600"></i>
            <span className="text-xl font-semibold">Surge Module Manager</span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Import Button */}
            <button
              onClick={onImportClick}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all"
            >
              <i className="ti ti-upload"></i>
              <span>{t('importModule')}</span>
            </button>

            {/* Save Config Button */}
            <button
              onClick={onSaveConfig}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all"
            >
              <i className="ti ti-device-floppy"></i>
              <span>{t('saveConfig')}</span>
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-all"
            >
              <i className="ti ti-language text-xl"></i>
              <span>{currentLanguage === 'en' ? '中文' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
