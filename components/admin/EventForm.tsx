"use client";

import React, { useEffect, useState } from 'react';
import api from '@/lib/axios';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';

interface Props {
  initialData?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface EventFormData {
  nombre_evento: string;
  descripcion: string;
  fecha_evento: string;
  hora_inicio: string;
  hora_fin: string;
  lugar: string;
  id_municipio: string;
  cupo_maximo: string;
  tipo_evento: string;
  imagen_portada: string;
  estado: string;
  requiere_inscripcion: boolean;
  contacto_responsable: string;
  telefono_contacto: string;
}

export default function EventForm({ initialData, onSuccess, onCancel }: Props) {
  const [form, setForm] = useState<EventFormData>({
    nombre_evento: '',
    descripcion: '',
    fecha_evento: '',
    hora_inicio: '',
    hora_fin: '',
    lugar: '',
    id_municipio: '',
    cupo_maximo: '',
    tipo_evento: '',
    imagen_portada: '',
    estado: 'proximo',
    requiere_inscripcion: false,
    contacto_responsable: '',
    telefono_contacto: '',
  });
  const [municipios, setMunicipios] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) setForm({ ...form, ...initialData });
    fetchMunicipios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMunicipios = async () => {
    try {
      const res = await api.get('/catalogos/municipios');
      setMunicipios(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error('Error al cargar municipios', e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpload = (url: string) => {
    setForm(prev => ({ ...prev, imagen_portada: url }));
  };

  const validate = () => {
    if (!form.nombre_evento.trim()) return 'El nombre del evento es obligatorio';
    if (!form.descripcion.trim()) return 'La descripción es obligatoria';
    if (!form.fecha_evento) return 'La fecha es obligatoria';
    if (!form.hora_inicio) return 'La hora de inicio es obligatoria';
    if (!form.lugar.trim()) return 'El lugar es obligatorio';
    if (!form.tipo_evento) return 'El tipo de evento es obligatorio';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const v = validate();
    if (v) return setError(v);

    try {
      setLoading(true);
      const payload = {
        nombre_evento: form.nombre_evento,
        descripcion: form.descripcion,
        tipo_evento: form.tipo_evento || null,
        fecha_evento: form.fecha_evento || null,
        hora_inicio: form.hora_inicio || null,
        hora_fin: form.hora_fin || null,
        lugar: form.lugar,
        id_municipio: form.id_municipio || null,
        cupo_maximo: form.cupo_maximo ? Number(form.cupo_maximo) : null,
        requiere_inscripcion: !!form.requiere_inscripcion,
        contacto_responsable: form.contacto_responsable || null,
        telefono_contacto: form.telefono_contacto || null,
        imagen_evento: form.imagen_portada || null,
        estado: form.estado || 'proximo'
      };

      if (initialData?.id_evento) {
        await api.put(`/eventos/${initialData.id_evento}`, payload);
      } else {
        await api.post('/eventos', payload);
      }

      onSuccess && onSuccess();
    } catch (err: any) {
      console.error('Error al guardar evento', err);
      const serverError = err?.response?.data ? JSON.stringify(err.response.data) : null;
      setError(serverError || err?.response?.data?.error || 'Error al guardar el evento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 bg-red-50 text-red-700 rounded">{error}</div>}

      <div>
        <label className="block text-sm font-medium">Nombre del evento</label>
        <input name="nombre_evento" value={form.nombre_evento} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="w-full px-3 py-2 border rounded" rows={4} />
      </div>

      <div>
        <label className="block text-sm font-medium">Fecha del evento</label>
        <input name="fecha_evento" value={form.fecha_evento} onChange={handleChange} type="date" className="w-full px-3 py-2 border rounded" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium">Hora inicio</label>
          <input name="hora_inicio" value={form.hora_inicio} onChange={handleChange} type="time" className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Hora fin</label>
          <input name="hora_fin" value={form.hora_fin} onChange={handleChange} type="time" className="w-full px-3 py-2 border rounded" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium">Lugar</label>
          <input name="lugar" value={form.lugar} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Municipio</label>
          <select name="id_municipio" value={form.id_municipio} onChange={handleChange} className="w-full px-3 py-2 border rounded">
            <option value="">Selecciona un municipio</option>
            {municipios.map(m => <option key={m.id_municipio} value={m.id_municipio}>{m.nombre_municipio}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium">Cupo máximo</label>
          <input name="cupo_maximo" value={form.cupo_maximo} onChange={handleChange} type="number" className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Tipo</label>
          <select name="tipo_evento" value={form.tipo_evento} onChange={handleChange} className="w-full px-3 py-2 border rounded">
            <option value="">Selecciona un tipo</option>
                    <option value="taller">Taller</option>
            <option value="capacitacion">Capacitación</option>
            <option value="feria">Feria</option>
            <option value="networking">Networking</option>
            <option value="otro">Otro</option>
          </select>
        </div>
      </div>

      <div>
        <label className="flex items-center">
          <input name="requiere_inscripcion" checked={form.requiere_inscripcion} onChange={(e) => setForm(prev => ({ ...prev, requiere_inscripcion: e.target.checked }))} type="checkbox" className="mr-2" />
          Requiere inscripción
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium">Contacto responsable</label>
          <input name="contacto_responsable" value={form.contacto_responsable} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Teléfono contacto</label>
          <input name="telefono_contacto" value={form.telefono_contacto} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Imagen de portada</label>
        <CloudinaryUpload onUpload={handleUpload} accept="image/*" />
        {form.imagen_portada && <img src={form.imagen_portada} className="mt-2 w-48 h-28 object-cover rounded" alt="cover" />}
      </div>

      <div>
        <label className="block text-sm font-medium">Estado</label>
        <select name="estado" value={form.estado} onChange={handleChange} className="w-full px-3 py-2 border rounded">
          <option value="proximo">Próximo</option>
          <option value="en_curso">En Curso</option>
          <option value="finalizado">Finalizado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-official-blue text-white rounded">{loading ? 'Guardando...' : (initialData ? 'Actualizar' : 'Crear Evento')}</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">Cancelar</button>
      </div>
    </form>
  );
}
