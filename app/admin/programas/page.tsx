'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';

interface Programa {
  id_programa: number;
  nombre_programa: string;
  descripcion: string;
  institucion_responsable?: string;
  entidad?: { nombre: string };
  fecha_inicio?: string;
  fecha_fin?: string;
  fecha_cierre?: string;
  tipo_apoyo?: string;
  estado?: string;
  cupo_maximo?: number;
}

export default function ProgramasPage() {
  const [programas, setProgramas] = useState<Programa[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('');

  useEffect(() => {
    fetchProgramas();
  }, []);

  const fetchProgramas = async () => {
    try {
      const response = await api.get('/programas');
      setProgramas(response.data);
    } catch (error) {
      console.error('Error al cargar programas:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProgramas = programas.filter(prog => {
    const matchesSearch = (prog.nombre_programa || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
               (prog.entidad?.nombre || prog.institucion_responsable || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = !filterEstado || (prog.estado || '').toLowerCase() === filterEstado;
    return matchesSearch && matchesEstado;
  });

  const getEstadoBadge = (estado: string) => {
    const colors = {
      abierto: 'bg-green-100 text-green-800',
      cerrado: 'bg-gray-100 text-gray-800',
      finalizado: 'bg-gray-100 text-gray-800',
      suspendido: 'bg-red-100 text-red-800'
    };
    return colors[estado as keyof typeof colors] || colors.abierto;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Cargando programas...</div>
      </div>
    );
  }

  return (
    <div className="content-wrapper space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-muted uppercase tracking-[0.2em]">Programas</p>
        <h1 className="text-3xl font-bold text-dark-gray">Programas de Apoyo</h1>
        <p className="text-gray-600">Gestión de programas y capacitaciones para emprendedores</p>
      </div>

      <div className="card-shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar programas..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-secondary-blue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-secondary-blue"
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="activo">Activo</option>
            <option value="finalizado">Finalizado</option>
            <option value="suspendido">Suspendido</option>
          </select>

          <button className="bg-official-blue text-white px-6 py-2 rounded-lg hover:bg-secondary-blue transition flex items-center gap-2">
            <FiPlus />
            Nuevo Programa
          </button>
        </div>

        <div className="app-grid app-grid--three">
          {filteredProgramas.map((prog) => (
            <div key={prog.id_programa} className="card-shadow border border-transparent p-4 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-800 text-lg">{prog.nombre_programa}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoBadge(prog.estado || 'abierto')}`}>
                  {prog.estado || 'abierto'}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{prog.descripcion}</p>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <FiCalendar size={14} />
                  <span>{prog.fecha_inicio ? new Date(prog.fecha_inicio).toLocaleDateString() : 'Sin fecha'} - {prog.fecha_fin || prog.fecha_cierre ? new Date((prog.fecha_fin || prog.fecha_cierre) as string).toLocaleDateString() : 'Sin fecha'}</span>
                </div>
                <div>
                  <span className="font-medium">Entidad:</span> {prog.entidad?.nombre || prog.institucion_responsable || 'No indicado'}
                </div>
                <div>
                  <span className="font-medium">Tipo:</span> {prog.tipo_apoyo || 'No indicado'}
                </div>
                <div>
                  <span className="font-medium">Cupos:</span> {prog.cupo_maximo ?? 'Ilimitados'}
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-base">
                <button className="flex-1 text-blue-600 hover:bg-blue-50 py-2 rounded transition text-sm font-medium">
                  Ver detalles
                </button>
                <button className="text-green-600 hover:bg-green-50 p-2 rounded transition">
                  <FiEdit2 size={18} />
                </button>
                <button className="text-red-600 hover:bg-red-50 p-2 rounded transition">
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProgramas.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No se encontraron programas
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          Mostrando {filteredProgramas.length} de {programas.length} programas
        </div>
      </div>
    </div>
  );
}
