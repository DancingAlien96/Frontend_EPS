'use client';

import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/axios';
import { UploadField } from '@/components/admin/UploadField';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiEye,
  FiUser,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCalendar,
  FiTrendingUp,
  FiBriefcase,
  FiGlobe,
  FiDownload,
  FiFilter,
  FiSearch,
  FiUsers
} from 'react-icons/fi';

interface Emprendedor {
  id_emprendedor: number;
  nombre_completo: string;
  dpi: string;
  fecha_nacimiento: string;
  genero: string;
  telefono: string;
  telefono_secundario?: string;
  correo_electronico: string;
  id_municipio: number;
  direccion_detallada: string;
  observaciones?: string;
  municipio?: Municipio;
  departamento_emprendimiento?: Departamento;
  nombre_emprendimiento?: string;
  descripcion_emprendimiento?: string;
  id_sector?: number;
  sector?: Sector;
  fase_emprendimiento?: string;
  fecha_inicio_emprendimiento?: string;
  numero_empleados?: number;
  formalizacion_estado?: 'formal' | 'informal';
  tiene_patente?: boolean;
  patente_archivo?: string;
  inscrito_sat?: boolean;
  numero_registro_comercial?: string;
  telefono_negocio?: string;
  correo_negocio?: string;
  sitio_web?: string;
  logotipo_negocio?: string;
  catalogo_pdf?: string;
  necesidades_detectadas?: string;
  id_departamento_emprendimiento?: number;
}

interface Municipio {
  id_municipio: number;
  nombre_municipio: string;
}

interface Sector {
  id_sector: number;
  nombre_sector: string;
}

interface Departamento {
  id_departamento: number;
  nombre_departamento: string;
}

interface SeguimientoEntry {
  id_seguimiento: number;
  titulo: string;
  descripcion: string;
  notas?: string;
  fecha_seguimiento: string;
  tipo?: {
    id_tipo_seguimiento: number;
    nombre_tipo: string;
    color_etiqueta?: string;
  };
  registrador?: {
    id_usuario: number;
    nombre_completo: string;
    institucion?: string;
  };
}

interface TipoSeguimientoOption {
  id_tipo_seguimiento: number;
  nombre_tipo: string;
  descripcion?: string;
  color_etiqueta?: string;
}

export default function EmprendedoresPage() {
  const [emprendedores, setEmprendedores] = useState<Emprendedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [sectores, setSectores] = useState<Sector[]>([]);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [selectedEmprendedor, setSelectedEmprendedor] = useState<Emprendedor | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [seguimientos, setSeguimientos] = useState<SeguimientoEntry[]>([]);
  const [seguimientosLoading, setSeguimientosLoading] = useState(false);
  const [seguimientosError, setSeguimientosError] = useState<string | null>(null);
  const [tiposSeguimiento, setTiposSeguimiento] = useState<TipoSeguimientoOption[]>([]);
  const [seguimientoForm, setSeguimientoForm] = useState({
    id_tipo_seguimiento: '',
    fecha_seguimiento: new Date().toISOString().slice(0, 10),
    titulo: '',
    descripcion: '',
    notas: ''
  });
  const [savingSeguimiento, setSavingSeguimiento] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    nombre_completo: '',
    dpi: '',
    fecha_nacimiento: '',
    genero: 'masculino',
    telefono: '',
    telefono_secundario: '',
    correo_electronico: '',
    id_municipio: '',
    id_departamento_emprendimiento: '',
    direccion_detallada: '',
    observaciones: '',
    foto_perfil: '',
    nombre_emprendimiento: '',
    descripcion_emprendimiento: '',
    id_sector: '',
    fase_emprendimiento: 'idea',
    fecha_inicio_emprendimiento: '',
    numero_empleados: '',
    formalizacion_estado: 'informal',
    tiene_patente: 'false',
    patente_archivo: '',
    inscrito_sat: 'false',
    numero_registro_comercial: '',
    telefono_negocio: '',
    correo_negocio: '',
    sitio_web: '',
    logotipo_negocio: '',
    catalogo_pdf: '',
    necesidades_detectadas: ''
  });

  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  // Funciones de carga de datos
  const loadDepartamentos = async () => {
    try {
      const response = await api.get('/catalogos/departamentos');
      setDepartamentos(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error al cargar departamentos:', error);
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

  const fetchTiposSeguimiento = async () => {
    try {
      const response = await api.get('/seguimientos/tipos');
      setTiposSeguimiento(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error al cargar tipos de seguimiento:', error);
    }
  };

  const loadSeguimientos = async (id_emprendedor: number) => {
    setSeguimientosLoading(true);
    setSeguimientosError(null);
    try {
      const response = await api.get(`/seguimientos/emprendedor/${id_emprendedor}`);
      setSeguimientos(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error al obtener seguimiento:', error);
      setSeguimientosError('No se pudo cargar el historial de seguimiento.');
    } finally {
      setSeguimientosLoading(false);
    }
  };

  const loadEmprendedores = async () => {
    try {
      const response = await api.get('/emprendedores');
      setEmprendedores(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error al cargar emprendedores:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMunicipios = async (departamentoId?: number) => {
    try {
      const url = departamentoId
        ? `/catalogos/municipios?id_departamento=${departamentoId}`
        : '/catalogos/municipios';
      console.log('🔍 Cargando municipios desde:', url);
      const response = await api.get(url);
      const municipiosData = Array.isArray(response.data) ? response.data : [];
      console.log('✅ Municipios cargados:', municipiosData.length, municipiosData);
      console.log('📋 IDs disponibles:', municipiosData.map(m => m.id_municipio).join(', '));
      setMunicipios(municipiosData);
    } catch (error) {
      console.error('❌ Error al cargar municipios:', error);
    }
  };

  // Handlers de formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`📝 Campo ${name} cambió a:`, value);
    
    // Si cambia el departamento, limpiar el municipio seleccionado
    if (name === 'id_departamento_emprendimiento') {
      setFormData(prev => ({ ...prev, [name]: value, id_municipio: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('📤 Enviando datos del formulario:', formData);
      const isFormal = formData.formalizacion_estado === 'formal';
      const payload = {
        ...formData,
        id_municipio: formData.id_municipio ? Number(formData.id_municipio) : null,
        id_sector: formData.id_sector ? Number(formData.id_sector) : null,
        id_departamento_emprendimiento: formData.id_departamento_emprendimiento
          ? Number(formData.id_departamento_emprendimiento)
          : null,
        numero_empleados:
          formData.numero_empleados === '' ? null : Number(formData.numero_empleados),
        fecha_inicio_emprendimiento: formData.fecha_inicio_emprendimiento || null,
        formalizacion_estado: formData.formalizacion_estado,
        tiene_patente: isFormal ? formData.tiene_patente === 'true' : false,
        patente_archivo: isFormal ? formData.patente_archivo || null : null,
        inscrito_sat: isFormal ? formData.inscrito_sat === 'true' : false,
        numero_registro_comercial: isFormal ? formData.numero_registro_comercial || null : null,
        logotipo_negocio: formData.logotipo_negocio || null,
        catalogo_pdf: formData.catalogo_pdf || null
      };
      console.log('🚀 Payload final a enviar:', payload);

      if (editingId) {
        await api.put(`/emprendedores/${editingId}`, payload);
      } else {
        await api.post('/emprendedores', payload);
      }
      setShowModal(false);
      resetForm();
      loadEmprendedores();
    } catch (error) {
      console.error('Error al guardar emprendedor:', error);
      alert('Error al guardar el emprendedor');
    }
  };

  const handleEdit = (emp: Emprendedor) => {
    setFormData({
      nombre_completo: emp.nombre_completo || '',
      dpi: emp.dpi || '',
      fecha_nacimiento: emp.fecha_nacimiento ? emp.fecha_nacimiento.split('T')[0] : '',
      genero: emp.genero || 'masculino',
      telefono: emp.telefono || '',
      telefono_secundario: emp.telefono_secundario || '',
      correo_electronico: emp.correo_electronico || '',
      id_municipio: emp.id_municipio ? String(emp.id_municipio) : '',
      id_departamento_emprendimiento: emp.id_departamento_emprendimiento
        ? String(emp.id_departamento_emprendimiento)
        : '',
      direccion_detallada: emp.direccion_detallada || '',
      observaciones: emp.observaciones || '',
      nombre_emprendimiento: emp.nombre_emprendimiento || '',
      descripcion_emprendimiento: emp.descripcion_emprendimiento || '',
      id_sector: emp.id_sector ? String(emp.id_sector) : '',
      fase_emprendimiento: emp.fase_emprendimiento || 'idea',
      fecha_inicio_emprendimiento: emp.fecha_inicio_emprendimiento
        ? emp.fecha_inicio_emprendimiento.split('T')[0]
        : '',
      numero_empleados:
        typeof emp.numero_empleados === 'number' ? String(emp.numero_empleados) : '',
      formalizacion_estado: emp.formalizacion_estado || 'informal',
      tiene_patente: String(emp.tiene_patente ?? false),
      patente_archivo: emp.patente_archivo || '',
      inscrito_sat: String(emp.inscrito_sat ?? false),
      numero_registro_comercial: emp.numero_registro_comercial || '',
      telefono_negocio: emp.telefono_negocio || '',
      correo_negocio: emp.correo_negocio || '',
      sitio_web: emp.sitio_web || '',
      logotipo_negocio: emp.logotipo_negocio || '',
      catalogo_pdf: emp.catalogo_pdf || '',
      necesidades_detectadas: emp.necesidades_detectadas || '',
      foto_perfil: emp.foto_perfil || ''
    });
    setEditingId(emp.id_emprendedor);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Está seguro de eliminar este emprendedor?')) {
      try {
        await api.delete(`/emprendedores/${id}`);
        loadEmprendedores();
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar el emprendedor');
      }
    }
  };

  const openDetailModal = (emp: Emprendedor) => {
    setSelectedEmprendedor(emp);
    setDetailOpen(true);
    setSeguimientoForm({
      id_tipo_seguimiento: '',
      fecha_seguimiento: new Date().toISOString().slice(0, 10),
      titulo: '',
      descripcion: '',
      notas: ''
    });
    loadSeguimientos(emp.id_emprendedor);
  };

  const closeDetailModal = () => {
    setDetailOpen(false);
    setSelectedEmprendedor(null);
    setSeguimientos([]);
    setSeguimientosError(null);
  };

  const handleSeguimientoInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSeguimientoForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSeguimientoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmprendedor) return;
    if (!seguimientoForm.id_tipo_seguimiento || !seguimientoForm.titulo.trim()) {
      alert('Selecciona un tipo y agrega un título para el seguimiento.');
      return;
    }

    try {
      setSavingSeguimiento(true);
      await api.post('/seguimientos', {
        ...seguimientoForm,
        id_emprendedor: selectedEmprendedor.id_emprendedor
      });
      await loadSeguimientos(selectedEmprendedor.id_emprendedor);
      setSeguimientoForm(prev => ({
        ...prev,
        titulo: '',
        descripcion: '',
        notas: ''
      }));
    } catch (error) {
      console.error('Error al registrar seguimiento:', error);
      alert('No se pudo registrar el seguimiento, intenta de nuevo.');
    } finally {
      setSavingSeguimiento(false);
    }
  };

  const formatFriendlyDate = (value?: string) => {
    if (!value) return 'Sin registro';
    try {
      return new Intl.DateTimeFormat('es-GT', { dateStyle: 'medium' }).format(new Date(value));
    } catch (error) {
      console.error('Error formateando fecha:', error);
      return value;
    }
  };

  const formatPhase = (value?: string) => {
    if (!value) return 'No asignada';
    const map: Record<string, string> = {
      idea: 'Idea',
      puesta_en_marcha_o_mayor_de_1_ano: 'Puesta en marcha o mayor de 1 año',
      aceleracion: 'Aceleración'
    };
    return map[value] || value;
  };

  const resetForm = () => {
    setFormData({
      nombre_completo: '',
      dpi: '',
      fecha_nacimiento: '',
      genero: 'masculino',
      telefono: '',
      telefono_secundario: '',
      correo_electronico: '',
      id_municipio: '',
      id_departamento_emprendimiento: '',
      direccion_detallada: '',
      observaciones: '',
      foto_perfil: '',
      nombre_emprendimiento: '',
      descripcion_emprendimiento: '',
      id_sector: '',
      fase_emprendimiento: 'idea',
      fecha_inicio_emprendimiento: '',
      numero_empleados: '',
      formalizacion_estado: 'informal',
      tiene_patente: 'false',
      patente_archivo: '',
      inscrito_sat: 'false',
      numero_registro_comercial: '',
      telefono_negocio: '',
      correo_negocio: '',
      sitio_web: '',
      logotipo_negocio: '',
      catalogo_pdf: '',
      necesidades_detectadas: ''
    });
    setEditingId(null);
  };

  // useEffect hooks
  useEffect(() => {
    loadEmprendedores();
    loadMunicipios();
    loadDepartamentos();
    loadSectores();
    fetchTiposSeguimiento();
  }, []);

  useEffect(() => {
    if (formData.id_departamento_emprendimiento) {
      console.log('🔄 Departamento cambió a:', formData.id_departamento_emprendimiento);
      loadMunicipios(Number(formData.id_departamento_emprendimiento));
    } else {
      console.log('⚠️ No hay departamento seleccionado, limpiando municipios');
      setMunicipios([]);
    }
  }, [formData.id_departamento_emprendimiento]);

  const filteredEmprendedores = useMemo(() => {
    if (!searchTerm.trim()) return emprendedores;
    const term = searchTerm.toLowerCase();
    return emprendedores.filter((emp) =>
      [
        emp.nombre_completo,
        emp.nombre_emprendimiento,
        emp.dpi,
        emp.municipio?.nombre_municipio,
        emp.correo_electronico,
      ]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(term))
    );
  }, [emprendedores, searchTerm]);

  const emptyState = filteredEmprendedores.length === 0;

  // Actualizado - diseño de búsqueda y tabla
  return (
    <div className="space-y-4 sm:space-y-6">
      <section className="bg-white rounded-2xl sm:rounded-[32px] border border-gray-100 shadow-sm px-4 sm:px-6 lg:px-10 py-4 sm:py-6">
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-500">Emprendedores individuales</p>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-dark-gray mt-1">Emprendedores registrados</h1>
            <p className="text-gray-600 text-xs sm:text-sm mt-1.5">Gestiona el perfil y la ficha del negocio de personas emprendedoras en un solo formulario unificado.</p>
          </div>
          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-md"
          >
            <FiPlus /> Nuevo Emprendedor
          </button>
        </div>
      </section>

      <section className="bg-white rounded-2xl sm:rounded-[32px] border border-gray-100 shadow-sm px-4 sm:px-6 lg:px-10 py-4 sm:py-6">
        <div className="space-y-4 mb-6">
          <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 shadow-sm hover:border-gray-300 focus-within:border-blue-400 focus-within:bg-white transition-all">
            <FiSearch className="text-gray-400 mr-3" size={20} />
            <input
              type="text"
              placeholder="Buscar por nombre, DPI o negocio..."
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all">
              <FiFilter size={16} /> <span className="hidden sm:inline">Filtros</span>
            </button>
            <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all">
              <FiDownload size={16} /> <span className="hidden sm:inline">Exportar</span>
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : emptyState ? (
          <div className="flex flex-col items-center justify-center gap-4 px-6 py-20 text-center bg-gray-50">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <FiUsers className="text-blue-600" size={28} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <FiSearch className="text-white" size={16} />
              </div>
            </div>
            <div className="max-w-md space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">No hay emprendedores registrados</h3>
              <p className="text-sm text-gray-600">Parece que aún no has agregado ningún emprendedor a la base de datos de Chiquimula. Comienza haciendo clic en el botón de abajo.</p>
            </div>
            <button
              onClick={() => { resetForm(); setShowModal(true); }}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 shadow-md"
            >
              <FiPlus size={18} /> Agregar mi primer Emprendedor
            </button>
          </div>
          ) : (
            <div className="space-y-4">
              {isMobile ? (
                <div className="grid gap-3">
                  {filteredEmprendedores.map((emp) => (
                    <div key={emp.id_emprendedor} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{emp.nombre_completo}</p>
                          <p className="text-xs text-gray-500">{emp.genero}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => openDetailModal(emp)} className="text-blue-600 hover:text-blue-700" title="Ver detalle">
                            <FiEye size={18} />
                          </button>
                          <button onClick={() => handleEdit(emp)} className="text-gray-500 hover:text-blue-600" title="Editar">
                            <FiEdit2 size={18} />
                          </button>
                          <button onClick={() => handleDelete(emp.id_emprendedor)} className="text-gray-500 hover:text-red-600" title="Eliminar">
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 space-y-2 text-xs text-gray-600">
                        <div>
                          <p className="font-semibold text-gray-700">Emprendimiento</p>
                          <p>{emp.nombre_emprendimiento || 'Sin registro'} • {emp.sector?.nombre_sector || 'Sector no asignado'}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">Ubicación</p>
                          <p>{emp.municipio?.nombre_municipio || 'N/A'} • {emp.departamento_emprendimiento?.nombre_departamento || 'Sin departamento'}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">Contacto</p>
                          <p>{emp.telefono || 'Sin teléfono'} • {emp.correo_electronico || 'Sin correo'}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">DPI</p>
                          <p>{emp.dpi || 'No registrado'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                <thead className="bg-white border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Emprendimiento</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">DPI</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ubicación negocio</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contacto</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredEmprendedores.map((emp) => (
                    <tr key={emp.id_emprendedor} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{emp.nombre_completo}</div>
                        <div className="text-xs text-gray-500">{emp.genero}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{emp.nombre_emprendimiento || 'Sin registro'}</div>
                        <div className="text-xs text-gray-500">{emp.sector?.nombre_sector || 'Sector no asignado'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{emp.dpi}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{emp.municipio?.nombre_municipio || 'N/A'}</div>
                        <div className="text-xs text-gray-500">{emp.departamento_emprendimiento?.nombre_departamento || 'Sin departamento'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{emp.telefono}</div>
                        <div className="text-xs text-gray-500">{emp.correo_electronico}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <button onClick={() => openDetailModal(emp)} className="text-blue-600 hover:text-blue-700" title="Ver detalle">
                            <FiEye size={18} />
                          </button>
                          <button onClick={() => handleEdit(emp)} className="text-gray-500 hover:text-blue-600" title="Editar">
                            <FiEdit2 size={18} />
                          </button>
                          <button onClick={() => handleDelete(emp.id_emprendedor)} className="text-gray-500 hover:text-red-600" title="Eliminar">
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-gray-200 bg-white px-4 sm:px-6 py-3.5 text-sm text-gray-600">
            <span>Mostrando {filteredEmprendedores.length} de {emprendedores.length} emprendedores</span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-400 cursor-not-allowed hover:bg-gray-50">‹</button>
              <button className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-400 cursor-not-allowed hover:bg-gray-50">›</button>
            </div>
          </div>
        </div>
      </section>

      {detailOpen && selectedEmprendedor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto soft-scroll">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b px-4 sm:px-6 py-4">
              <div className="flex items-start gap-4">
                {selectedEmprendedor.foto_perfil && (
                  <img 
                    src={selectedEmprendedor.foto_perfil} 
                    alt={selectedEmprendedor.nombre_completo}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                )}
                <div>
                  <p className="text-xs font-semibold text-gray-muted uppercase tracking-[0.2em]">Detalle</p>
                  <h2 className="text-2xl font-bold text-dark-gray">{selectedEmprendedor.nombre_completo}</h2>
                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">DPI {selectedEmprendedor.dpi}</div>
                </div>
              </div>
              <button onClick={closeDetailModal} className="p-2 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900">
                <FiX size={20} />
              </button>
            </div>

            <div className="px-4 sm:px-6 py-5 sm:py-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="card-shadow p-4">
                  <h3 className="text-sm font-semibold text-gray-muted uppercase tracking-[0.2em] mb-3">Información general</h3>
                  <dl className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <FiUser className="text-secondary-blue" />
                      <div>
                        <dt className="font-semibold">Género</dt>
                        <dd className="capitalize">{selectedEmprendedor.genero || 'No registrado'}</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-secondary-blue" />
                      <div>
                        <dt className="font-semibold">Fecha de nacimiento</dt>
                        <dd>{formatFriendlyDate(selectedEmprendedor.fecha_nacimiento)}</dd>
                      </div>
                    </div>
                  </dl>
                </div>

                <div className="card-shadow p-4">
                  <h3 className="text-sm font-semibold text-gray-muted uppercase tracking-[0.2em] mb-3">Contacto</h3>
                  <dl className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <FiPhone className="text-secondary-blue" />
                      <div>
                        <dt className="font-semibold">Teléfono principal</dt>
                        <dd>{selectedEmprendedor.telefono || 'No registrado'}</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiPhone className="text-secondary-blue" />
                      <div>
                        <dt className="font-semibold">Teléfono secundario</dt>
                        <dd>{selectedEmprendedor.telefono_secundario || 'No registrado'}</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMail className="text-secondary-blue" />
                      <div>
                        <dt className="font-semibold">Correo electrónico</dt>
                        <dd>{selectedEmprendedor.correo_electronico || 'No registrado'}</dd>
                      </div>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="card-shadow p-4">
                <h3 className="text-sm font-semibold text-gray-muted uppercase tracking-[0.2em] mb-3">Ubicación</h3>
                <div className="flex flex-wrap gap-6 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-secondary-blue" />
                    <div>
                      <p className="font-semibold">Municipio</p>
                      <p>{selectedEmprendedor.municipio?.nombre_municipio || 'No indicado'}</p>
                    </div>
                  </div>
                    <div>
                      <p className="font-semibold">Departamento</p>
                      <p>{selectedEmprendedor.departamento_emprendimiento?.nombre_departamento || 'No indicado'}</p>
                    </div>
                  <div>
                    <p className="font-semibold">Dirección</p>
                    <p>{selectedEmprendedor.direccion_detallada || 'Sin dirección'}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="card-shadow p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-muted uppercase tracking-[0.2em]">Emprendimiento</p>
                      <h3 className="text-lg font-semibold text-dark-gray">Ficha principal</h3>
                    </div>
                  </div>
                  <dl className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <FiBriefcase className="text-secondary-blue" />
                      <div>
                        <dt className="font-semibold">Nombre comercial</dt>
                        <dd>{selectedEmprendedor.nombre_emprendimiento || 'Sin registro'}</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiTrendingUp className="text-secondary-blue" />
                      <div>
                        <dt className="font-semibold">Fase</dt>
                        <dd className="capitalize">{formatPhase(selectedEmprendedor.fase_emprendimiento)}</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-secondary-blue" />
                      <div>
                        <dt className="font-semibold">Sector</dt>
                        <dd>{selectedEmprendedor.sector?.nombre_sector || 'Sin sector'}</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-secondary-blue" />
                      <div>
                        <dt className="font-semibold">Departamento del negocio</dt>
                        <dd>{selectedEmprendedor.departamento_emprendimiento?.nombre_departamento || 'No indicado'}</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-secondary-blue" />
                      <div>
                        <dt className="font-semibold">Municipio del negocio</dt>
                        <dd>{selectedEmprendedor.municipio?.nombre_municipio || 'No indicado'}</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-secondary-blue" />
                      <div>
                        <dt className="font-semibold">Inicio de operaciones</dt>
                        <dd>{formatFriendlyDate(selectedEmprendedor.fecha_inicio_emprendimiento)}</dd>
                      </div>
                    </div>
                  </dl>
                </div>

                <div className="card-shadow p-4">
                  <h3 className="text-sm font-semibold text-gray-muted uppercase tracking-[0.2em] mb-3">Operación</h3>
                  <dl className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <FiUser className="text-secondary-blue" />
                      <div>
                        <dt className="font-semibold">Equipo</dt>
                        <dd>
                          {typeof selectedEmprendedor.numero_empleados === 'number'
                            ? `${selectedEmprendedor.numero_empleados} personas`
                            : 'No registrado'}
                        </dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiPhone className="text-secondary-blue" />
                      <div>
                        <dt className="font-semibold">Teléfono del negocio</dt>
                        <dd>{selectedEmprendedor.telefono_negocio || 'No registrado'}</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMail className="text-secondary-blue" />
                      <div>
                        <dt className="font-semibold">Correo del negocio</dt>
                        <dd>{selectedEmprendedor.correo_negocio || 'No registrado'}</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiGlobe className="text-secondary-blue" />
                      <div>
                        <dt className="font-semibold">Sitio o red social</dt>
                        <dd>{selectedEmprendedor.sitio_web || 'Sin enlace'}</dd>
                      </div>
                    </div>
                    <div>
                      <dt className="font-semibold">Logotipo del negocio</dt>
                      <dd>{selectedEmprendedor.logotipo_negocio || 'No cargado'}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Catálogo (PDF)</dt>
                      <dd>{selectedEmprendedor.catalogo_pdf || 'No cargado'}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Formalización</dt>
                      <dd className="capitalize flex flex-col gap-1">
                        <span>
                          {selectedEmprendedor.formalizacion_estado === 'formal'
                            ? 'Formal'
                            : selectedEmprendedor.formalizacion_estado === 'informal'
                              ? 'Informal'
                              : 'No indicado'}
                        </span>
                        {selectedEmprendedor.formalizacion_estado === 'formal' && (
                          <div className="space-y-1 text-gray-600">
                            <div>Patente: {selectedEmprendedor.tiene_patente ? 'Sí' : 'No'}</div>
                            {selectedEmprendedor.patente_archivo && (
                              <div>Archivo/Referencia: {selectedEmprendedor.patente_archivo}</div>
                            )}
                            <div>SAT: {selectedEmprendedor.inscrito_sat ? 'Inscrito' : 'No inscrito'}</div>
                            {selectedEmprendedor.numero_registro_comercial && (
                              <div>Registro comercial: {selectedEmprendedor.numero_registro_comercial}</div>
                            )}
                          </div>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {selectedEmprendedor.descripcion_emprendimiento && (
                <div className="card-shadow p-4">
                  <h3 className="text-sm font-semibold text-gray-muted uppercase tracking-[0.2em] mb-3">Descripción del negocio</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedEmprendedor.descripcion_emprendimiento}</p>
                </div>
              )}

              {selectedEmprendedor.necesidades_detectadas && (
                <div className="card-shadow p-4">
                  <h3 className="text-sm font-semibold text-gray-muted uppercase tracking-[0.2em] mb-3">Necesidades priorizadas</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedEmprendedor.necesidades_detectadas}</p>
                </div>
              )}

              {selectedEmprendedor.observaciones && (
                <div className="card-shadow p-4">
                  <h3 className="text-sm font-semibold text-gray-muted uppercase tracking-[0.2em] mb-3">Observaciones</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedEmprendedor.observaciones}</p>
                </div>
              )}

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="card-shadow p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-muted uppercase tracking-[0.2em]">Seguimiento</p>
                      <h3 className="text-lg font-semibold text-dark-gray">Historial reciente</h3>
                    </div>
                    <span className="text-sm text-gray-500">{seguimientos.length} registros</span>
                  </div>

                  {seguimientosLoading ? (
                    <div className="flex items-center justify-center py-10 text-gray-500">Cargando seguimiento...</div>
                  ) : seguimientosError ? (
                    <div className="rounded-lg bg-red-50 text-red-700 text-sm p-3">{seguimientosError}</div>
                  ) : seguimientos.length === 0 ? (
                    <div className="rounded-lg bg-gray-50 text-gray-500 text-sm p-4">
                      Todavía no hay seguimientos registrados para este emprendedor.
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-72 overflow-y-auto soft-scroll pr-1">
                      {seguimientos.map(item => (
                        <div key={item.id_seguimiento} className="border-l-4 border-secondary-blue pl-4 py-2 bg-gray-50/60 rounded-r-lg">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-semibold text-dark-gray">{item.titulo}</p>
                            <span className="text-xs text-gray-500">{formatFriendlyDate(item.fecha_seguimiento)}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{item.descripcion}</p>
                          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                            {item.tipo && (
                              <span
                                className="px-2 py-1 rounded-full font-semibold"
                                style={{ backgroundColor: item.tipo.color_etiqueta || '#E5F0FF' }}
                              >
                                {item.tipo.nombre_tipo}
                              </span>
                            )}
                            {item.registrador?.nombre_completo && (
                              <span>Por {item.registrador.nombre_completo}</span>
                            )}
                          </div>
                          {item.notas && (
                            <p className="text-xs text-gray-500 mt-2">Notas: {item.notas}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="card-shadow p-4">
                  <p className="text-xs font-semibold text-gray-muted uppercase tracking-[0.2em]">Nuevo seguimiento</p>
                  <h3 className="text-lg font-semibold text-dark-gray mb-4">Registrar interacción</h3>
                  <form className="space-y-4" onSubmit={handleSeguimientoSubmit}>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1 block">Tipo de seguimiento *</label>
                      <select
                        name="id_tipo_seguimiento"
                        value={seguimientoForm.id_tipo_seguimiento}
                        onChange={handleSeguimientoInput}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-secondary-blue focus:ring-2 focus:ring-secondary-blue"
                        required
                      >
                        <option value="">Seleccione una opción</option>
                        {tiposSeguimiento.map(tipo => (
                          <option key={tipo.id_tipo_seguimiento} value={tipo.id_tipo_seguimiento}>
                            {tipo.nombre_tipo}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">Fecha *</label>
                        <input
                          type="date"
                          name="fecha_seguimiento"
                          value={seguimientoForm.fecha_seguimiento}
                          onChange={handleSeguimientoInput}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-secondary-blue focus:ring-2 focus:ring-secondary-blue"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-700 mb-1 block">Título *</label>
                        <input
                          type="text"
                          name="titulo"
                          value={seguimientoForm.titulo}
                          onChange={handleSeguimientoInput}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-secondary-blue focus:ring-2 focus:ring-secondary-blue"
                          placeholder="Ej. Visita domiciliaria"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1 block">Descripción *</label>
                      <textarea
                        name="descripcion"
                        value={seguimientoForm.descripcion}
                        onChange={handleSeguimientoInput}
                        rows={3}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-secondary-blue focus:ring-2 focus:ring-secondary-blue"
                        placeholder="Anota los hallazgos principales"
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1 block">Notas internas</label>
                      <textarea
                        name="notas"
                        value={seguimientoForm.notas}
                        onChange={handleSeguimientoInput}
                        rows={2}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-secondary-blue focus:ring-2 focus:ring-secondary-blue"
                        placeholder="Pendientes o próximos pasos"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={savingSeguimiento}
                      className="w-full rounded-lg bg-secondary-blue px-4 py-2 font-semibold text-white transition hover:bg-official-blue disabled:opacity-50"
                    >
                      {savingSeguimiento ? 'Guardando...' : 'Guardar seguimiento'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-6 border-b">
              <h2 className="text-xl sm:text-2xl font-bold text-dark-gray">
                {editingId ? 'Editar Emprendedor Individual' : 'Nuevo Emprendedor Individual'}
              </h2>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="text-gray-500 hover:text-gray-700">
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo *</label>
                  <input type="text" name="nombre_completo" value={formData.nombre_completo} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">DPI *</label>
                  <input type="text" name="dpi" value={formData.dpi} onChange={handleInputChange} required maxLength={13} placeholder="0000000000000" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento *</label>
                  <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Genero *</label>
                  <select name="genero" value={formData.genero} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue">
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefono *</label>
                  <input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefono Secundario</label>
                  <input type="tel" name="telefono_secundario" value={formData.telefono_secundario} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electronico</label>
                  <input type="email" name="correo_electronico" value={formData.correo_electronico} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Direccion Detallada *</label>
                  <input type="text" name="direccion_detallada" value={formData.direccion_detallada} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div>
                  <CloudinaryUpload
                    label="Foto de Perfil"
                    value={formData.foto_perfil || ''}
                    onChange={(url) => setFormData(prev => ({ ...prev, foto_perfil: url }))}
                    helper="Sube una foto del emprendedor (máx 5MB)"
                  />
                </div>

                <div className="lg:col-span-2 pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-muted uppercase tracking-[0.2em]">Información del emprendimiento</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Departamento *</label>
                  <select
                    name="id_departamento_emprendimiento"
                    value={formData.id_departamento_emprendimiento}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue"
                  >
                    <option value="">Seleccione un departamento</option>
                    {departamentos.map(dep => (
                      <option key={dep.id_departamento} value={dep.id_departamento}>{dep.nombre_departamento}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Municipio *</label>
                  <select
                    name="id_municipio"
                    value={formData.id_municipio}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.id_departamento_emprendimiento}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    <option value="">{formData.id_departamento_emprendimiento ? 'Seleccione' : 'Seleccione un departamento primero'}</option>
                    {municipios.map(m => <option key={m.id_municipio} value={m.id_municipio}>{m.nombre_municipio}</option>)}
                  </select>
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Emprendimiento *</label>
                  <input type="text" name="nombre_emprendimiento" value={formData.nombre_emprendimiento} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción del Negocio *</label>
                  <textarea
                    name="descripcion_emprendimiento"
                    value={formData.descripcion_emprendimiento}
                    onChange={handleInputChange}
                    rows={3}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sector *</label>
                  <select name="id_sector" value={formData.id_sector} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue">
                    <option value="">Seleccione un sector</option>
                    {sectores.map((sector) => (
                      <option key={sector.id_sector} value={sector.id_sector}>{sector.nombre_sector}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fase *</label>
                  <select
                    name="fase_emprendimiento"
                    value={formData.fase_emprendimiento}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue"
                  >
                    <option value="idea">Idea</option>
                    <option value="puesta_en_marcha_o_mayor_de_1_ano">Puesta en marcha o mayor de 1 año</option>
                    <option value="aceleracion">Aceleración</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Inicio</label>
                  <input type="date" name="fecha_inicio_emprendimiento" value={formData.fecha_inicio_emprendimiento} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Número de Empleados</label>
                  <input type="number" min="0" name="numero_empleados" value={formData.numero_empleados} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado de formalización</label>
                  <select
                    name="formalizacion_estado"
                    value={formData.formalizacion_estado}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue"
                  >
                    <option value="informal">Informal</option>
                    <option value="formal">Formal</option>
                  </select>
                </div>
                {formData.formalizacion_estado === 'formal' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">¿Tiene patente?</label>
                      <select
                        name="tiene_patente"
                        value={formData.tiene_patente}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue"
                      >
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Referencia o archivo de patente</label>
                      <input
                        type="text"
                        name="patente_archivo"
                        value={formData.patente_archivo}
                        onChange={handleInputChange}
                        placeholder="URL o nombre de archivo"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">¿Inscrito en SAT?</label>
                      <select
                        name="inscrito_sat"
                        value={formData.inscrito_sat}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue"
                      >
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Número de registro comercial</label>
                      <input
                        type="text"
                        name="numero_registro_comercial"
                        value={formData.numero_registro_comercial}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue"
                      />
                    </div>
                  </>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono del Negocio</label>
                  <input type="tel" name="telefono_negocio" value={formData.telefono_negocio} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo del Negocio</label>
                  <input type="email" name="correo_negocio" value={formData.correo_negocio} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sitio web / Red social</label>
                  <input type="url" name="sitio_web" value={formData.sitio_web} onChange={handleInputChange} placeholder="https://" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logotipo del negocio</label>
                  <input 
                    type="text"
                    name="logotipo_negocio"
                    value={formData.logotipo_negocio}
                    onChange={handleInputChange}
                    placeholder="URL del logotipo (ej: https://...)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue"
                  />
                  <p className="text-xs text-gray-500 mt-1">Pega la URL de la imagen del logotipo</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Catálogo en PDF</label>
                  <input 
                    type="text"
                    name="catalogo_pdf"
                    value={formData.catalogo_pdf}
                    onChange={handleInputChange}
                    placeholder="URL del catálogo PDF (ej: https://...)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue"
                  />
                  <p className="text-xs text-gray-500 mt-1">Pega la URL del catálogo PDF</p>
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Necesidades detectadas</label>
                  <textarea
                    name="necesidades_detectadas"
                    value={formData.necesidades_detectadas}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue"
                  ></textarea>
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Observaciones internas</label>
                  <textarea name="observaciones" value={formData.observaciones} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-official-blue"></textarea>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-6">
                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancelar</button>
                <button type="submit" className="w-full sm:w-auto px-4 py-2 bg-official-blue text-white rounded-lg hover:bg-secondary-blue">{editingId ? 'Actualizar' : 'Guardar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
