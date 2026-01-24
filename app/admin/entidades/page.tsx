'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

interface Entidad {
  id_entidad: number;
  nombre: string;
  responsable: string;
  correo_electronico: string;
  telefono: string;
  id_municipio: number;
  departamento: string;
  direccion: string;
  descripcion_programas_proyectos: string;
  tipo_entidad: string;
  sitio_web: string;
  estado: string;
  municipio?: { id_municipio: number; nombre_municipio: string };
}

interface Municipio {
  id_municipio: number;
  nombre_municipio: string;
}

export default function Entidades() {
  const [entidades, setEntidades] = useState<Entidad[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [formData, setFormData] = useState({
    nombre: '',
    responsable: '',
    correo_electronico: '',
    telefono: '',
    id_municipio: '',
    departamento: 'Chiquimula',
    direccion: '',
    descripcion_programas_proyectos: '',
    tipo_entidad: 'gubernamental',
    sitio_web: '',
    estado: 'activo'
  });

  useEffect(() => {
    loadEntidades();
    loadMunicipios();
  }, []);

  const loadEntidades = async () => {
    try {
      const response = await api.get('/entidades');
      setEntidades(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error al cargar entidades:', error);
      setEntidades([]);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/entidades/${editingId}`, formData);
      } else {
        await api.post('/entidades', formData);
      }
      setShowModal(false);
      resetForm();
      loadEntidades();
    } catch (error) {
      console.error('Error al guardar entidad:', error);
      alert('Error al guardar la entidad');
    }
  };

  const handleEdit = (entidad: Entidad) => {
    setFormData({
      nombre: entidad.nombre || '',
      responsable: entidad.responsable || '',
      correo_electronico: entidad.correo_electronico || '',
      telefono: entidad.telefono || '',
      id_municipio: entidad.id_municipio ? String(entidad.id_municipio) : '',
      departamento: entidad.departamento || 'Chiquimula',
      direccion: entidad.direccion || '',
      descripcion_programas_proyectos: entidad.descripcion_programas_proyectos || '',
      tipo_entidad: entidad.tipo_entidad || 'gubernamental',
      sitio_web: entidad.sitio_web || '',
      estado: entidad.estado || 'activo'
    });
    setEditingId(entidad.id_entidad);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Esta seguro de eliminar esta entidad?')) {
      try {
        await api.delete(`/entidades/${id}`);
        loadEntidades();
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar la entidad');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      responsable: '',
      correo_electronico: '',
      telefono: '',
      id_municipio: '',
      departamento: 'Chiquimula',
      direccion: '',
      descripcion_programas_proyectos: '',
      tipo_entidad: 'gubernamental',
      sitio_web: '',
      estado: 'activo'
    });
    setEditingId(null);
  };

  const getTipoColor = (tipo: string) => {
    const colors: Record<string, string> = {
      gubernamental: 'bg-blue-100 text-blue-800',
      ong: 'bg-green-100 text-green-800',
      privada: 'bg-purple-100 text-purple-800',
      academica: 'bg-yellow-100 text-yellow-800',
      otra: 'bg-gray-100 text-gray-800'
    };
    return colors[tipo] || colors.otra;
  };

  return (
    <div className="content-wrapper space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <p className="text-xs font-semibold text-gray-muted uppercase tracking-[0.2em]">Entidades</p>
          <h1 className="text-3xl font-bold text-dark-gray">Entidades Aliadas</h1>
          <p className="text-gray-600">Controla convenios vigentes y responsables por municipio.</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md w-full sm:w-auto"
        >
          <FiPlus /> Nueva Entidad
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsable</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Municipio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entidades.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No hay entidades registradas. Haga clic en "Agregar Entidad" para comenzar.
                  </td>
                </tr>
              ) : (
                entidades.map((entidad) => (
                  <tr key={entidad.id_entidad} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{entidad.nombre}</div>
                      <div className="text-sm text-gray-500">{entidad.correo_electronico}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{entidad.responsable}</div>
                      <div className="text-sm text-gray-500">{entidad.telefono}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entidad.municipio?.nombre_municipio || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTipoColor(entidad.tipo_entidad)}`}>
                        {entidad.tipo_entidad}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        entidad.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {entidad.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEdit(entidad)} className="text-blue-600 hover:text-blue-900 mr-3">
                        <FiEdit2 />
                      </button>
                      <button onClick={() => handleDelete(entidad.id_entidad)} className="text-red-600 hover:text-red-900">
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
                {editingId ? 'Editar Entidad' : 'Nueva Entidad'}
              </h2>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="text-gray-500 hover:text-gray-700">
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Responsable *</label>
                  <input type="text" name="responsable" value={formData.responsable} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Entidad *</label>
                  <select name="tipo_entidad" value={formData.tipo_entidad} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue">
                    <option value="gubernamental">Gubernamental</option>
                    <option value="ong">ONG</option>
                    <option value="privada">Privada</option>
                    <option value="academica">Academica</option>
                    <option value="otra">Otra</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Municipio *</label>
                  <select name="id_municipio" value={formData.id_municipio} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue">
                    <option value="">Seleccione</option>
                    {municipios.map(m => <option key={m.id_municipio} value={m.id_municipio}>{m.nombre_municipio}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
                  <input type="text" name="telefono" value={formData.telefono} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electronico</label>
                  <input type="email" name="correo_electronico" value={formData.correo_electronico} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sitio Web</label>
                  <input type="url" name="sitio_web" value={formData.sitio_web} onChange={handleInputChange} placeholder="https://" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Direccion</label>
                  <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripcion de Programas/Proyectos</label>
                  <textarea name="descripcion_programas_proyectos" value={formData.descripcion_programas_proyectos} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue"></textarea>
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
