"use client";

import React, { useEffect, useState } from 'react';
import api from '@/lib/axios';

export default function AdminSolicitudes() {
  const [solicitudes, setSolicitudes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSolicitudes = async () => {
    setLoading(true);
    try {
      const res = await api.get('/solicitudes');
      setSolicitudes(res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchSolicitudes(); }, []);

  const aprobar = async (id: number) => {
    if (!confirm('¿Aprobar esta solicitud?')) return;
    try { await api.post(`/solicitudes/${id}/aprobar`); fetchSolicitudes(); } catch (e) { alert('Error al aprobar'); }
  };

  const rechazar = async (id: number) => {
    const motivo = prompt('Motivo de rechazo (opcional):');
    try { await api.post(`/solicitudes/${id}/rechazar`, { motivo_rechazo: motivo }); fetchSolicitudes(); } catch (e) { alert('Error al rechazar'); }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Solicitudes para Emprendedor</h1>
      {loading ? (<div>Cargando...</div>) : (
        <div className="space-y-4">
          {solicitudes.map(s => (
            <div key={s.id_solicitud} className="p-4 border rounded">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{s.nombre_completo} — {s.nombre_emprendimiento}</div>
                  <div className="text-sm text-gray-600">{s.correo_electronico} • {s.telefono}</div>
                  <div className="mt-2 text-sm">{s.descripcion_emprendimiento}</div>
                </div>
                <div className="text-right">
                  <div className="mb-2">Estado: <strong>{s.estado_solicitud}</strong></div>
                  {s.estado_solicitud === 'pendiente' && (
                    <div className="flex flex-col gap-2">
                      <button onClick={() => aprobar(s.id_solicitud)} className="px-3 py-1 bg-green-600 text-white rounded">Aprobar</button>
                      <button onClick={() => rechazar(s.id_solicitud)} className="px-3 py-1 border rounded">Rechazar</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { FiSearch, FiEye, FiCheck, FiX } from 'react-icons/fi';

interface Solicitud {
  id_solicitud: number;
  emprendedor?: { nombre_completo: string };
  programa?: { nombre_programa: string };
  nombre_completo?: string;
  fecha_solicitud?: string;
  estado_solicitud: string;
  comentarios?: string;
}

export default function SolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('');

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      const response = await api.get('/solicitudes');
      setSolicitudes(response.data);
    } catch (error) {
      console.error('Error al cargar solicitudes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSolicitudes = solicitudes.filter(sol => {
    const matchesSearch = (sol.emprendedor?.nombre_completo || sol.nombre_completo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
               (sol.programa?.nombre_programa || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = !filterEstado || (sol.estado_solicitud || '').toLowerCase() === filterEstado;
    return matchesSearch && matchesEstado;
  });

  const getEstadoBadge = (estado: string) => {
    const colors = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      aprobada: 'bg-green-100 text-green-800',
      rechazada: 'bg-red-100 text-red-800',
      en_revision: 'bg-blue-100 text-blue-800'
    };
    return colors[estado as keyof typeof colors] || colors.pendiente;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Cargando solicitudes...</div>
      </div>
    );
  }

  return (
    <div className="content-wrapper space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-muted uppercase tracking-[0.2em]">Solicitudes</p>
        <h1 className="text-3xl font-bold text-dark-gray">Solicitudes</h1>
        <p className="text-gray-600">Gestión de solicitudes a programas de apoyo</p>
      </div>

      <div className="card-shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar solicitudes..."
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
            <option value="pendiente">Pendiente</option>
            <option value="en_revision">En Revisión</option>
            <option value="aprobada">Aprobada</option>
            <option value="rechazada">Rechazada</option>
          </select>
        </div>

        <div className="overflow-x-auto soft-scroll">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Emprendedor</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Programa</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fecha</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSolicitudes.map((sol) => (
                <tr key={sol.id_solicitud} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{sol.emprendedor?.nombre_completo || sol.nombre_completo || 'N/D'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{sol.programa?.nombre_programa || 'Sin programa'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(sol.fecha_solicitud).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoBadge(sol.estado_solicitud)}`}>
                      {sol.estado_solicitud.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800" title="Ver detalles">
                        <FiEye size={18} />
                      </button>
                      {sol.estado_solicitud === 'pendiente' && (
                        <>
                          <button className="text-green-600 hover:text-green-800" title="Aprobar">
                            <FiCheck size={18} />
                          </button>
                          <button className="text-red-600 hover:text-red-800" title="Rechazar">
                            <FiX size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredSolicitudes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No se encontraron solicitudes
            </div>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Mostrando {filteredSolicitudes.length} de {solicitudes.length} solicitudes
        </div>
      </div>
    </div>
  );
}
