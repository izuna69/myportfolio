import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="absolute top-4 right-4 z-50">
      <div className="flex bg-[#181818] rounded-lg border border-gray-700 overflow-hidden shadow-lg shadow-emerald-500/10">
        <button
          onClick={() => setLanguage('en')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            language === 'en'
              ? 'bg-emerald-500 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('ja')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            language === 'ja'
              ? 'bg-emerald-500 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          日本語
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
