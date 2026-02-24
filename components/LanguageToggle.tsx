'use client';

import { useLang } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <button
      onClick={toggleLang}
      className="text-xs font-semibold px-3 py-1.5 rounded-lg tracking-wide transition-all duration-200"
      style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border-hi)',
        color: 'var(--t2)',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--t1)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--t2)'; }}
    >
      {lang === 'en' ? 'العربية' : 'English'}
    </button>
  );
}
