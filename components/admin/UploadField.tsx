import { UploadButton } from '@uploadthing/react';
import type { UploadRouter } from '@/app/api/uploadthing/core';

interface UploadFieldProps {
  label: string;
  endpoint: keyof UploadRouter;
  value?: string;
  onChange: (url: string | null) => void;
  helper?: string;
}

export function UploadField({ label, endpoint, value, onChange, helper }: UploadFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {value && (
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-official-blue hover:underline"
          >
            Ver archivo
          </a>
        )}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <UploadButton<UploadRouter>
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            const url = res?.[0]?.url || null;
            onChange(url);
          }}
          onUploadError={(error) => {
            alert(error.message);
          }}
        />
        <div className="text-xs text-gray-500">{helper || 'Sube y obtenemos la URL automáticamente'}</div>
      </div>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value || null)}
        placeholder="URL del archivo"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-secondary-blue focus:ring-2 focus:ring-secondary-blue"
      />
    </div>
  );
}