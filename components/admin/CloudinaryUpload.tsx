'use client';

import { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';

interface CloudinaryUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helper?: string;
}

export default function CloudinaryUpload({ label, value, onChange, helper }: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona solo archivos de imagen');
      return;
    }

    // Validar tamaño (5MB máximo)
    if (file.size > 5000000) {
      alert('La imagen no debe superar 5MB');
      return;
    }

    try {
      setUploading(true);

      // Crear FormData para enviar a Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');
      formData.append('folder', 'emprendedores');

      // Subir directamente a Cloudinary (unsigned upload)
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }

      const data = await response.json();
      onChange(data.secure_url);
    } catch (error) {
      console.error('Error al subir imagen:', error);
      alert('Error al subir la imagen. Por favor intenta de nuevo.');
    } finally {
      setUploading(false);
      // Limpiar input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      
      {value ? (
        <div className="relative inline-block">
          <img 
            src={value} 
            alt="Preview" 
            className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={uploading}
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-2"></div>
                <p className="text-xs text-gray-500">Subiendo imagen...</p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-xs text-gray-500">Haz clic para seleccionar imagen</p>
              </>
            )}
          </button>
        </>
      )}

      {helper && <p className="text-xs text-gray-500 mt-1">{helper}</p>}
    </div>
  );
}
