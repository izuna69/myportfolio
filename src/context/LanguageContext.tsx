import React, { createContext, useState, useContext, type ReactNode } from 'react';
import { PROFILE_DATA as profileEn, PROFILE_DATA_JA as profileJa } from '../data/stacks/constants';
import { PROJECT_LIST as projectsEn, PROJECT_LIST_JA as projectsJa } from '../data/project_list/projects_list';

type Language = 'en' | 'ja';

interface Translations {
  profile: typeof profileEn;
  projects: typeof projectsEn;
  labels: {
    residence: string;
    age: string;
    email: string;
    languages: string;
    expertise: string;
    tools: string;
    projectsTitle: string;
    footer: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    profile: profileEn,
    projects: projectsEn,
    labels: {
      residence: "Residence",
      age: "Age",
      email: "Email",
      languages: "Languages",
      expertise: "Expertise",
      tools: "Tools",
      projectsTitle: "Projects",
      footer: "©2026 All Rights Reserved. Rama"
    }
  },
  ja: {
    profile: profileJa,
    projects: projectsJa,
    labels: {
      residence: "居住地",
      age: "年齢",
      email: "メール",
      languages: "言語",
      expertise: "専門知識",
      tools: "ツール",
      projectsTitle: "プロジェクト",
      footer: "© 2025 無断転載禁止. IZUNA"
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
