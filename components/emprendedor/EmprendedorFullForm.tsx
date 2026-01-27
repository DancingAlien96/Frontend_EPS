"use client";

import React, { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';

interface EmprendedorFormData {
  tipo_persona: string;
  nombre_completo: string;
  dpi: string;
  fecha_nacimiento: string;
  genero: string;
  telefono: string;
  telefono_secundario: string;
  correo_electronico: string;
  id_municipio: string;
  id_departamento_emprendimiento: string;
  direccion_detallada: string;
  observaciones: string;
  foto_perfil: string;
  nombre_emprendimiento: string;
  descripcion_emprendimiento: string;
  id_sector: string;
  fase_emprendimiento: string;
  fecha_inicio_emprendimiento: string;
  numero_empleados: string;
  formalizacion_estado: string;
  tiene_patente: boolean;
  patente_archivo: string;
  inscrito_sat: string;
  numero_registro_comercial: string;
  rtu_pdf: string;
  telefono_negocio: string;
  correo_negocio: string;
  sitio_web: string;
  logotipo_negocio: string;
  catalogo_pdf: string;
  necesidades_detectadas: string;
}

export default function EmprendedorFullForm({ submitTo = 'solicitudes' }: { submitTo?: 'solicitudes' | 'emprendedores' }) {
  const router = useRouter();
  const [departamentos, setDepartamentos] = useState<any[]>([]);
  const [municipios, setMunicipios] = useState<any[]>([]);
  const [sectores, setSectores] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState<EmprendedorFormData>({
    tipo_persona: 'individual',
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
    tiene_patente: false,
    patente_archivo: '',
    inscrito_sat: 'false',
    numero_registro_comercial: '',
    rtu_pdf: '',
    telefono_negocio: '',
    correo_negocio: '',
    sitio_web: '',
    logotipo_negocio: '',
    catalogo_pdf: '',
    necesidades_detectadas: ''
  });

  useEffect(() => {
    loadDepartamentos();
    loadSectores();
  }, []);

  const loadDepartamentos = async () => {
    try {
      const res = await api.get('/catalogos/departamentos');
      setDepartamentos(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error(e);
    }
  };

  const loadSectores = async () => {
    try {
      const res = await api.get('/sectores');
      setSectores(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error(e);
    }
  };

  const loadMunicipios = async (departamentoId?: string) => {
    try {
      const url = departamentoId ? `/catalogos/municipios?id_departamento=${departamentoId}` : '/catalogos/municipios';
      const res = await api.get(url);
      setMunicipios(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'id_departamento_emprendimiento') {
      setForm(prev => ({ ...prev, [name]: value, id_municipio: '' }));
      loadMunicipios(value);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUpload = (field: string, url: string) => {
    setForm(prev => ({ ...prev, [field]: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        id_municipio: form.id_municipio ? Number(form.id_municipio) : null,
        id_sector: form.id_sector ? Number(form.id_sector) : null,
        id_departamento_emprendimiento: form.id_departamento_emprendimiento ? Number(form.id_departamento_emprendimiento) : null,
        numero_empleados: form.numero_empleados === '' ? null : Number(form.numero_empleados),
        fecha_inicio_emprendimiento: form.fecha_inicio_emprendimiento || null
      };

      if (submitTo === 'emprendedores') {
        await api.post('/emprendedores', payload);
        setMessage('Emprendedor creado correctamente.');
      } else {
        await api.post('/solicitudes', payload);
        setMessage('Solicitud enviada correctamente. Nuestro equipo la revisará.');
      }

      setTimeout(() => router.push('/'), 1500);
    } catch (err: any) {
      console.error(err);
      setMessage(err?.response?.data?.error || 'Error al enviar el formulario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {message && <div className="mb-4 p-3 bg-green-50 border border-green-200">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Tipo</label>
          <select name="tipo_persona" value={form.tipo_persona} onChange={handleChange} className="w-full px-3 py-2 border rounded">
            <option value="individual">Emprendedor individual</option>
            <option value="organizacion">Organización</option>
            <option value="entidad">Entidad pública</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Nombre completo</label>
          <input name="nombre_completo" value={form.nombre_completo} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">DPI</label>
            <input name="dpi" value={form.dpi} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Teléfono</label>
            <input name="telefono" value={form.telefono} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Correo electrónico</label>
          <input name="correo_electronico" value={form.correo_electronico} onChange={handleChange} type="email" className="w-full px-3 py-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Nombre del emprendimiento / organización</label>
          <input name="nombre_emprendimiento" value={form.nombre_emprendimiento} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Descripción del emprendimiento</label>
          <textarea name="descripcion_emprendimiento" value={form.descripcion_emprendimiento} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Departamento</label>
            <select name="id_departamento_emprendimiento" value={form.id_departamento_emprendimiento} onChange={handleChange} className="w-full px-3 py-2 border rounded">
              <option value="">Selecciona un departamento</option>
              {departamentos.map(d => <option key={d.id_departamento} value={d.id_departamento}>{d.nombre_departamento}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Municipio</label>
            <select name="id_municipio" value={form.id_municipio} onChange={handleChange} className="w-full px-3 py-2 border rounded">
              <option value="">Selecciona un municipio</option>
              {municipios.map(m => <option key={m.id_municipio} value={m.id_municipio}>{m.nombre_municipio}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Sector</label>
            <select name="id_sector" value={form.id_sector} onChange={handleChange} className="w-full px-3 py-2 border rounded">
              <option value="">Selecciona un sector</option>
              {sectores.map(s => <option key={s.id_sector} value={s.id_sector}>{s.nombre_sector}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Fase</label>
            <select name="fase_emprendimiento" value={form.fase_emprendimiento} onChange={handleChange} className="w-full px-3 py-2 border rounded">
              <option value="idea">Idea</option>
              <option value="puesta_en_marcha_o_mayor_de_1_ano">Puesta en marcha o mayor de 1 año</option>
              <option value="aceleracion">Aceleración</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Dirección</label>
          <input name="direccion_detallada" value={form.direccion_detallada} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Fecha inicio emprendimiento</label>
            <input name="fecha_inicio_emprendimiento" value={form.fecha_inicio_emprendimiento} onChange={handleChange} type="date" className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Número de empleados</label>
            <input name="numero_empleados" value={form.numero_empleados} onChange={handleChange} type="number" className="w-full px-3 py-2 border rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Formalización</label>
          <select name="formalizacion_estado" value={form.formalizacion_estado} onChange={handleChange} className="w-full px-3 py-2 border rounded">
            <option value="informal">Informal</option>
            <option value="formal">Formal</option>
          </select>
        </div>

        {form.formalizacion_estado === 'formal' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">¿Tiene patente?</label>
                <select name="tiene_patente" value={form.tiene_patente ? 'si' : 'no'} onChange={(e) => setForm(prev => ({ ...prev, tiene_patente: e.target.value === 'si' }))} className="w-full px-3 py-2 border rounded">
                  <option value="no">No</option>
                  <option value="si">Sí</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Número de registro comercial</label>
                <input name="numero_registro_comercial" value={form.numero_registro_comercial} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
              </div>
            </div>

            {form.tiene_patente && (
              <div>
                <label className="block text-sm font-medium">Foto de la patente</label>
                <CloudinaryUpload onUpload={(url: string) => handleUpload('patente_archivo', url)} />
                {form.patente_archivo && <img src={form.patente_archivo} alt="patente" className="mt-2 w-32 h-32 object-contain" />}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium">RTU (PDF)</label>
              <CloudinaryUpload onUpload={(url: string) => handleUpload('rtu_pdf', url)} accept="application/pdf" />
              {form.rtu_pdf && <a href={form.rtu_pdf} target="_blank" rel="noreferrer" className="text-blue-600">Ver RTU</a>}
            </div>
          </>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Teléfono negocio</label>
            <input name="telefono_negocio" value={form.telefono_negocio} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Correo negocio</label>
            <input name="correo_negocio" value={form.correo_negocio} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Sitio web</label>
          <input name="sitio_web" value={form.sitio_web} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Logotipo del negocio</label>
            <CloudinaryUpload onUpload={(url: string) => handleUpload('logotipo_negocio', url)} />
            {form.logotipo_negocio && <img src={form.logotipo_negocio} alt="logo" className="mt-2 w-32 h-32 object-contain" />}
          </div>
          <div>
            <label className="block text-sm font-medium">Catálogo (PDF) - enlace</label>
            <input name="catalogo_pdf" value={form.catalogo_pdf} onChange={handleChange} placeholder="https://ejemplo.com/mi-catalogo.pdf" className="w-full px-3 py-2 border rounded" />
            <div className="mt-2 text-xs text-gray-500">También puedes subir el PDF y obtendremos el enlace automáticamente:</div>
            <div className="mt-2">
              <CloudinaryUpload onUpload={(url: string) => handleUpload('catalogo_pdf', url)} accept="application/pdf" />
            </div>
            {form.catalogo_pdf && <a href={form.catalogo_pdf} target="_blank" rel="noreferrer" className="text-blue-600">Ver catálogo</a>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Necesidades detectadas</label>
          <textarea name="necesidades_detectadas" value={form.necesidades_detectadas} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? 'Enviando...' : (submitTo === 'emprendedores' ? 'Guardar' : 'Enviar solicitud')}</button>
          <button type="button" onClick={() => router.push('/')} className="px-4 py-2 border rounded">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
