'use client';

import { useState, useRef, forwardRef, useImperativeHandle, DragEvent, ChangeEvent } from 'react';
import { useLang } from '@/contexts/LanguageContext';

interface UploadZoneProps {
  onFile: (file: File) => void;
  loading: boolean;
}

export interface UploadZoneHandle {
  open: () => void;
}

const UploadZone = forwardRef<UploadZoneHandle, UploadZoneProps>(function UploadZone(
  { onFile, loading },
  ref
) {
  const { t } = useLang();
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => inputRef.current?.click(),
  }));

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
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => !loading && inputRef.current?.click()}
      className="premium-glow relative cursor-pointer px-6 py-12 flex flex-col items-center justify-center gap-6 transition-all duration-300 w-full"
      style={{
        border: `1px dashed ${dragging ? 'var(--t1)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-card)',
        backgroundColor: dragging ? 'var(--bg2)' : 'var(--bg1)',
        opacity: loading ? 0.6 : dragging ? 0.9 : 1,
        cursor: loading ? 'not-allowed' : 'pointer',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleChange}
      />

      <svg className="w-6 h-6 transition-colors duration-300" style={{ color: dragging ? 'var(--t1)' : 'var(--t3)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>

      {selected ? (
        <div className="text-center">
          <p className="text-sm font-medium" style={{ color: 'var(--t1)' }}>
            {t('upload.selected')} {selected}
          </p>
          <p className="text-[11px] mt-2 uppercase tracking-widest" style={{ color: 'var(--t3)' }}>Processing...</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg font-light tracking-wide" style={{ color: 'var(--t1)' }}>{t('upload.drop')}</p>
          <p className="text-[11px] mt-3 font-light tracking-widest uppercase" style={{ color: 'var(--t3)' }}>{t('upload.limit')}</p>
        </div>
      )}
    </div>
  );
});

export default UploadZone;
