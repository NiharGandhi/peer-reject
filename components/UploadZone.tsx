'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { useLang } from '@/contexts/LanguageContext';

interface UploadZoneProps {
  onFile: (file: File) => void;
  onSample: () => void;
  loading: boolean;
}

export default function UploadZone({ onFile, onSample, loading }: UploadZoneProps) {
  const { t } = useLang();
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type === 'application/pdf') {
      setSelected(file.name);
      onFile(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelected(file.name);
      onFile(file);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-xl mx-auto">
      {/* Drop target */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="relative cursor-pointer rounded-2xl px-8 py-10 flex flex-col items-center gap-4 transition-all duration-200"
        style={{
          background: dragging ? 'var(--cr-lo)' : 'var(--bg1)',
          border: `2px dashed ${dragging ? 'var(--cr)' : 'var(--border-hi)'}`,
          boxShadow: dragging ? '0 0 0 4px var(--cr-lo)' : 'none',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleChange}
        />

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: 'var(--bg2)', border: '1px solid var(--border-hi)' }}
        >
          <svg className="w-7 h-7" style={{ color: 'var(--t3)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>

        {selected ? (
          <div className="text-center">
            <p className="text-sm font-semibold" style={{ color: 'var(--sky)' }}>
              {t('upload.selected')} {selected}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--t3)' }}>Processing...</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm font-medium" style={{ color: 'var(--t1)' }}>{t('upload.drop')}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--t3)' }}>{t('upload.limit')}</p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 px-2">
        <div className="flex-1 h-px" style={{ background: 'var(--border-hi)' }} />
        <span className="text-xs font-medium" style={{ color: 'var(--t3)' }}>{t('upload.or')}</span>
        <div className="flex-1 h-px" style={{ background: 'var(--border-hi)' }} />
      </div>

      {/* Sample button */}
      <button
        onClick={onSample}
        disabled={loading}
        className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 disabled:opacity-50"
        style={{
          background: 'var(--cr-lo)',
          border: '1px solid rgba(192,48,48,0.3)',
          color: 'var(--cr-hi)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(192,48,48,0.2)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'var(--cr-lo)';
        }}
      >
        {t('upload.sample')}
      </button>
    </div>
  );
}
