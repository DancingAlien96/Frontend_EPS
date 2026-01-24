'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';

export default function NuevaNoticiaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    resumen: '',
    autor: '',
    imagen_principal: '',
    estado: 'borrador'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({ ...prev, imagen_principal: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/noticias', formData);
      alert('Noticia creada exitosamente');
      router.push('/admin/noticias');
    } catch (error: any) {
      console.error('Error al crear noticia:', error);
      alert(error.response?.data?.error || 'Error al crear la noticia');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-wrapper space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <FiArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-muted uppercase tracking-[0.2em]">Noticias</p>
          <h1 className="text-3xl font-bold text-dark-gray">Nueva Noticia</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card-shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Información General</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-secondary-blue"
                placeholder="Título de la noticia"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resumen
              </label>
              <textarea
                name="resumen"
                value={formData.resumen}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-secondary-blue"
                placeholder="Breve resumen de la noticia"
              />
              <p className="text-xs text-gray-500 mt-1">Máximo 500 caracteres</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenido <span className="text-red-500">*</span>
              </label>
              <textarea
                name="contenido"
                value={formData.contenido}
                onChange={handleChange}
                rows={12}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-secondary-blue font-mono text-sm"
                placeholder="Contenido completo de la noticia..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Autor
                </label>
                <input
                  type="text"
                  name="autor"
                  value={formData.autor}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-secondary-blue"
                  placeholder="Nombre del autor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado <span className="text-red-500">*</span>
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-secondary-blue"
                  required
                >
                  <option value="borrador">Borrador</option>
                  <option value="publicado">Publicado</option>
                  <option value="archivado">Archivado</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="card-shadow p-6 space-y-4">
          <CloudinaryUpload
            label="Imagen Principal"
            value={formData.imagen_principal}
            onChange={handleImageUpload}
            helper="Imagen que se mostrará en la noticia (máximo 5MB)"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-official-blue text-white px-6 py-2 rounded-lg hover:bg-secondary-blue transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSave />
            {loading ? 'Guardando...' : 'Guardar Noticia'}
          </button>
        </div>
      </form>
    </div>
  );
}
