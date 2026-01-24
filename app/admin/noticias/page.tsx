'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';

interface Noticia {
  id_noticia: number;
  titulo: string;
  contenido: string;
  categoria?: string;
  fecha_publicacion?: string;
  autor?: { nombre_completo: string } | string;
  estado?: string;
  imagen_portada?: string;
  imagen_principal?: string;
}

export default function NoticiasPage() {
  const router = useRouter();
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('');

  useEffect(() => {
    fetchNoticias();
  }, []);

  const fetchNoticias = async () => {
    try {
      const response = await api.get('/noticias?estado=');
      setNoticias(response.data);
    } catch (error) {
      console.error('Error al cargar noticias:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta noticia?')) return;
    
    try {
      await api.delete(`/noticias/${id}`);
      alert('Noticia eliminada exitosamente');
      fetchNoticias();
    } catch (error) {
      console.error('Error al eliminar noticia:', error);
      alert('Error al eliminar la noticia');
    }
  };

  const filteredNoticias = noticias.filter(not => {
    const matchesSearch = not.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = !filterCategoria || (not.categoria || '').toLowerCase() === filterCategoria;
    return matchesSearch && matchesCategoria;
  });

  const getEstadoBadge = (estado: string) => {
    const colors = {
      publicado: 'bg-green-100 text-green-800',
      borrador: 'bg-yellow-100 text-yellow-800',
      archivado: 'bg-gray-100 text-gray-800'
    } as const;
    return colors[estado as keyof typeof colors] || colors.borrador;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Cargando noticias...</div>
      </div>
    );
  }

  return (
    <div className="content-wrapper space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-muted uppercase tracking-[0.2em]">Noticias</p>
        <h1 className="text-3xl font-bold text-dark-gray">Noticias</h1>
        <p className="text-gray-600">Gestión de artículos y noticias del sistema</p>
      </div>

      <div className="card-shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar noticias..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-secondary-blue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-secondary-blue"
            value={filterCategoria}
            onChange={(e) => setFilterCategoria(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            <option value="emprendimiento">Emprendimiento</option>
            <option value="capacitacion">Capacitación</option>
            <option value="evento">Evento</option>
            <option value="general">General</option>
          </select>

          <button 
            onClick={() => router.push('/admin/noticias/nueva')}
            className="bg-official-blue text-white px-6 py-2 rounded-lg hover:bg-secondary-blue transition flex items-center gap-2"
          >
            <FiPlus />
            Nueva Noticia
          </button>
        </div>

        <div className="space-y-4">
          {filteredNoticias.map((not) => (
            <div key={not.id_noticia} className="card-shadow border border-transparent p-4 hover:shadow-lg transition">
              <div className="flex gap-4">
                {(not.imagen_portada || not.imagen_principal) && (
                  <div className="w-32 h-24 bg-gray-200 rounded flex-shrink-0">
                    <img 
                      src={not.imagen_portada || not.imagen_principal} 
                      alt={not.titulo}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">{not.titulo}</h3>
                      <div className="flex gap-2 text-xs text-gray-500">
                        <span className="capitalize">{not.categoria || 'general'}</span>
                        <span>•</span>
                        <span>{not.fecha_publicacion ? new Date(not.fecha_publicacion).toLocaleDateString() : 'Sin fecha'}</span>
                        <span>•</span>
                        <span>Por {typeof not.autor === 'string' ? not.autor : not.autor?.nombre_completo || 'MINECO'}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoBadge(not.estado || 'publicado')}`}>
                      {not.estado || 'publicado'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{not.contenido}</p>
                  
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                      <FiEye size={16} />
                      Ver
                    </button>
                    <button 
                      onClick={() => router.push(`/admin/noticias/${not.id_noticia}/editar`)}
                      className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center gap-1"
                    >
                      <FiEdit2 size={16} />
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(not.id_noticia)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1"
                    >
                      <FiTrash2 size={16} />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNoticias.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No se encontraron noticias
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          Mostrando {filteredNoticias.length} de {noticias.length} noticias
        </div>
      </div>
    </div>
  );
}
