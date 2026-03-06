'use client';

import { useLang } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <button
      onClick={toggleLang}
      className="text-[10px] font-medium px-3 py-1.5 rounded-full tracking-widest uppercase transition-all duration-300 glass-panel"
      style={{
        color: 'var(--t1)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg2)';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-hi)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = '';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
      }}
    >
      {lang === 'en' ? 'العربية' : 'EN'}
    </button>
  );
}
