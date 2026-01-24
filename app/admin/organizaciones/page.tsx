'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

interface Organizacion {
  id_organizacion: number;
  nombre: string;
  telefono: string;
  direccion: string;
  id_municipio: number;
  departamento: string;
  id_sector: number;
  descripcion_producto_servicios: string;
  numero_asociados: number;
  correo_electronico: string;
  sitio_web: string;
  fecha_constitucion: string;
  registro_legal: string;
  estado: string;
  municipio?: { id_municipio: number; nombre_municipio: string };
  sector?: { id_sector: number; nombre_sector: string };
}

interface Municipio {
  id_municipio: number;
  nombre_municipio: string;
}

interface Sector {
  id_sector: number;
  nombre_sector: string;
}

export default function Organizaciones() {
  const [organizaciones, setOrganizaciones] = useState<Organizacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [sectores, setSectores] = useState<Sector[]>([]);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    id_municipio: '',
    departamento: 'Chiquimula',
    id_sector: '',
    descripcion_producto_servicios: '',
    numero_asociados: '',
    correo_electronico: '',
    sitio_web: '',
    fecha_constitucion: '',
    registro_legal: '',
    estado: 'activo'
  });

  useEffect(() => {
    loadOrganizaciones();
    loadMunicipios();
    loadSectores();
  }, []);

  const loadOrganizaciones = async () => {
    try {
      const response = await api.get('/organizaciones');
      setOrganizaciones(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error al cargar organizaciones:', error);
      setOrganizaciones([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMunicipios = async () => {
    try {
      const response = await api.get('/municipios');
      setMunicipios(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error al cargar municipios:', error);
    }
  };

  const loadSectores = async () => {
    try {
      const response = await api.get('/sectores');
      setSectores(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error al cargar sectores:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/organizaciones/${editingId}`, formData);
      } else {
        await api.post('/organizaciones', formData);
      }
      setShowModal(false);
      resetForm();
      loadOrganizaciones();
    } catch (error) {
      console.error('Error al guardar organizacion:', error);
      alert('Error al guardar la organizacion');
    }
  };

  const handleEdit = (org: Organizacion) => {
    setFormData({
      nombre: org.nombre || '',
      telefono: org.telefono || '',
      direccion: org.direccion || '',
      id_municipio: org.id_municipio ? String(org.id_municipio) : '',
      departamento: org.departamento || 'Chiquimula',
      id_sector: org.id_sector ? String(org.id_sector) : '',
      descripcion_producto_servicios: org.descripcion_producto_servicios || '',
      numero_asociados: org.numero_asociados ? String(org.numero_asociados) : '',
      correo_electronico: org.correo_electronico || '',
      sitio_web: org.sitio_web || '',
      fecha_constitucion: org.fecha_constitucion ? org.fecha_constitucion.split('T')[0] : '',
      registro_legal: org.registro_legal || '',
      estado: org.estado || 'activo'
    });
    setEditingId(org.id_organizacion);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Esta seguro de eliminar esta organizacion?')) {
      try {
        await api.delete(`/organizaciones/${id}`);
        loadOrganizaciones();
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar la organizacion');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      telefono: '',
      direccion: '',
      id_municipio: '',
      departamento: 'Chiquimula',
      id_sector: '',
      descripcion_producto_servicios: '',
      numero_asociados: '',
      correo_electronico: '',
      sitio_web: '',
      fecha_constitucion: '',
      registro_legal: '',
      estado: 'activo'
    });
    setEditingId(null);
  };

  return (
    <div className="content-wrapper space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <p className="text-xs font-semibold text-gray-muted uppercase tracking-[0.2em]">Organizaciones</p>
          <h1 className="text-3xl font-bold text-dark-gray">Organizaciones Aliadas</h1>
          <p className="text-gray-600">Registro y seguimiento de asociaciones y cooperativas.</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md w-full sm:w-auto"
        >
          <FiPlus /> Nueva Organizacion
        </button>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-official-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="card-shadow overflow-hidden">
          <div className="overflow-x-auto soft-scroll">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Municipio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asociados</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {organizaciones.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No hay organizaciones registradas. Haga clic en "Agregar Organizacion" para comenzar.
                  </td>
                </tr>
              ) : (
                organizaciones.map((org) => (
                  <tr key={org.id_organizacion} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{org.nombre}</div>
                      <div className="text-sm text-gray-500">{org.sector?.nombre_sector || 'Sin sector'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {org.municipio?.nombre_municipio || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{org.telefono}</div>
                      <div className="text-sm text-gray-500">{org.correo_electronico}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {org.numero_asociados || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        org.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {org.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(org)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(org.id_organizacion)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-dark-gray">
                {editingId ? 'Editar Organizacion' : 'Nueva Organizacion'}
              </h2>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="text-gray-500 hover:text-gray-700">
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Municipio *</label>
                  <select name="id_municipio" value={formData.id_municipio} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue focus:border-transparent">
                    <option value="">Seleccione</option>
                    {municipios.map(m => <option key={m.id_municipio} value={m.id_municipio}>{m.nombre_municipio}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sector *</label>
                  <select name="id_sector" value={formData.id_sector} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue focus:border-transparent">
                    <option value="">Seleccione</option>
                    {sectores.map(s => <option key={s.id_sector} value={s.id_sector}>{s.nombre_sector}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
                  <input type="text" name="telefono" value={formData.telefono} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo</label>
                  <input type="email" name="correo_electronico" value={formData.correo_electronico} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Asociados</label>
                  <input type="number" name="numero_asociados" value={formData.numero_asociados} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Constitucion</label>
                  <input type="date" name="fecha_constitucion" value={formData.fecha_constitucion} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Direccion</label>
                  <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sitio Web</label>
                  <input type="url" name="sitio_web" value={formData.sitio_web} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Registro Legal</label>
                  <input type="text" name="registro_legal" value={formData.registro_legal} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripcion</label>
                  <textarea name="descripcion_producto_servicios" value={formData.descripcion_producto_servicios} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select name="estado" value={formData.estado} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue">
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-official-blue text-white rounded-lg hover:bg-secondary-blue">{editingId ? 'Actualizar' : 'Guardar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
