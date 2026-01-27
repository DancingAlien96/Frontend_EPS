'use client';

import { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';

interface CloudinaryUploadProps {
  label?: string;
  value?: string;
  // callback when upload completes - kept for backward compatibility both names
  onChange?: (url: string) => void;
  onUpload?: (url: string) => void;
  helper?: string;
  accept?: string; // e.g., 'image/*' or 'application/pdf'
}

export default function CloudinaryUpload({ label, value = '', onChange, onUpload, helper, accept = 'image/*' }: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    // Validate accepted types
    if (accept.includes('image') && !isImage && !isPdf) {
      alert('Por favor selecciona un archivo válido.');
      return;
    }

    // Size limits: images 5MB, pdfs 20MB
    if (isImage && file.size > 5_000_000) {
      alert('La imagen no debe superar 5MB');
      return;
    }
    if (isPdf && file.size > 20_000_000) {
      alert('El PDF no debe superar 20MB');
      return;
    }

    try {
      setUploading(true);

      // Create FormData for Cloudinary unsigned upload
      const formData = new FormData();
      formData.append('file', file as Blob);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');
      formData.append('folder', 'emprendedores');

      // Choose endpoint depending on resource type
      const resourceType = isPdf ? 'raw' : 'image';
      const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;

      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir el archivo');
      }

      const data = await response.json();
      const url = data.secure_url;
      // support both onChange and older onUpload prop names
      if (typeof onChange === 'function') onChange(url);
      else if (typeof onUpload === 'function') onUpload(url);
    } catch (error) {
      console.error('Error al subir archivo:', error);
      alert('Error al subir el archivo. Por favor intenta de nuevo.');
    } finally {
      setUploading(false);
      // Clear input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}

      {value ? (
        <div className="relative inline-block">
          {value.endsWith('.pdf') || value.includes('pdf') ? (
            <div className="flex items-center gap-3">
              <a href={value} target="_blank" rel="noreferrer" className="text-blue-600">Ver archivo (PDF)</a>
              <button type="button" onClick={handleRemove} className="text-sm text-red-500">Eliminar</button>
            </div>
          ) : (
            <>
              <img src={value} alt="Preview" className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300" />
              <button type="button" onClick={handleRemove} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <input ref={fileInputRef} type="file" accept={accept} onChange={handleFileChange} className="hidden" />
          <button type="button" onClick={handleButtonClick} disabled={uploading} className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-2"></div>
                <p className="text-xs text-gray-500">Subiendo archivo...</p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-xs text-gray-500">Haz clic para seleccionar archivo</p>
              </>
            )}
          </button>
        </>
      )}

      {helper && <p className="text-xs text-gray-500 mt-1">{helper}</p>}
    </div>
  );
}
