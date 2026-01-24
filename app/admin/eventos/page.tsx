'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';

interface Evento {
  id_evento: number;
  nombre_evento: string;
  descripcion: string;
  fecha_evento: string;
  hora_inicio: string;
  lugar: string;
  municipio?: { nombre_municipio: string };
  nombre_municipio?: string;
  cupo_maximo?: number;
  estado?: string;
  tipo_evento?: string;
}

export default function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('');

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await api.get('/eventos');
      setEventos(response.data);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEventos = eventos.filter(evt => {
    const matchesSearch = (evt.nombre_evento || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
               (evt.lugar || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = !filterEstado || (evt.estado || '').toLowerCase() === filterEstado;
    return matchesSearch && matchesEstado;
  });

  const getEstadoBadge = (estado: string) => {
    const colors = {
      proximo: 'bg-blue-100 text-blue-800',
      en_curso: 'bg-green-100 text-green-800',
      finalizado: 'bg-gray-100 text-gray-800',
      cancelado: 'bg-red-100 text-red-800'
    } as const;
    return colors[estado as keyof typeof colors] || colors.proximo;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Cargando eventos...</div>
      </div>
    );
  }

  return (
    <div className="content-wrapper space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-muted uppercase tracking-[0.2em]">Eventos</p>
        <h1 className="text-3xl font-bold text-dark-gray">Eventos</h1>
        <p className="text-gray-600">Gestión de ferias, talleres y eventos para emprendedores</p>
      </div>

      <div className="card-shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar eventos..."
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
            <option value="proximo">Próximo</option>
            <option value="en_curso">En Curso</option>
            <option value="finalizado">Finalizado</option>
            <option value="cancelado">Cancelado</option>
          </select>

          <button className="bg-official-blue text-white px-6 py-2 rounded-lg hover:bg-secondary-blue transition flex items-center gap-2">
            <FiPlus />
            Nuevo Evento
          </button>
        </div>

        <div className="app-grid app-grid--two">
          {filteredEventos.map((evt) => (
            <div key={evt.id_evento} className="card-shadow border border-transparent p-5 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg mb-1">{evt.nombre_evento}</h3>
                  <span className="text-xs text-gray-500 uppercase">{evt.tipo_evento}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoBadge(evt.estado || 'proximo')}`}>
                  {(evt.estado || 'proximo').replace('_', ' ')}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{evt.descripcion}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiCalendar size={16} className="text-gray-400" />
                  <span>{evt.fecha_evento ? new Date(evt.fecha_evento).toLocaleDateString() : 'Sin fecha'} - {evt.hora_inicio || ''}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiMapPin size={16} className="text-gray-400" />
                  <span>{evt.lugar || 'Sin lugar'}, {evt.municipio?.nombre_municipio || evt.nombre_municipio || ''}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiUsers size={16} className="text-gray-400" />
                  <span>Cupo: {evt.cupo_maximo ?? 'No especificado'} personas</span>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-base">
                <button className="flex-1 text-blue-600 hover:bg-blue-50 py-2 rounded transition text-sm font-medium">
                  Ver inscritos
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

        {filteredEventos.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No se encontraron eventos
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          Mostrando {filteredEventos.length} de {eventos.length} eventos
        </div>
      </div>
    </div>
  );
}
