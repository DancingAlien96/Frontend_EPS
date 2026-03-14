'use client';

import { Building, FileText, Layers, Calendar, Image } from 'lucide-react';

interface Paso2FormProps {
  data: any;
  onChange: (data: any) => void;
  memberType: string;
}

export default function Paso2Form({ data, onChange, memberType }: Paso2FormProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ [field]: value });
  };

  const isVenture = memberType === 'emprendimiento' || memberType === 'empresa';
  const isOrganization = memberType === 'organizacion' || memberType === 'institucion';

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Paso 2: Perfil {isVenture ? 'del Negocio' : 'de la Organización'}
        </h2>
        <p className="text-gray-600">
          {isVenture 
            ? 'Cuéntanos sobre tu emprendimiento o empresa'
            : 'Información básica de tu organización o institución'
          }
        </p>
      </div>

      <form className="space-y-6">
        {isVenture && (
          <>
            {/* Nombre del emprendimiento */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Building className="inline w-4 h-4 mr-1" />
                Nombre del Emprendimiento/Empresa <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={data.nombre_emprendimiento || ''}
                onChange={(e) => handleChange('nombre_emprendimiento', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Nombre comercial de tu negocio"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FileText className="inline w-4 h-4 mr-1" />
                Descripción Corta <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={data.descripcion_corta || ''}
                onChange={(e) => handleChange('descripcion_corta', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                placeholder="Describe brevemente a qué se dedica tu negocio (máximo 200 caracteres)"
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1">
                {(data.descripcion_corta || '').length}/200 caracteres
              </p>
            </div>

            {/* Sector y Etapa */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Layers className="inline w-4 h-4 mr-1" />
                  Sector <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={data.sector_id || ''}
                  onChange={(e) => handleChange('sector_id', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Selecciona el sector</option>
                  <option value="1">Agricultura</option>
                  <option value="2">Comercio</option>
                  <option value="3">Servicios</option>
                  <option value="4">Manufactura</option>
                  <option value="5">Tecnología</option>
                  <option value="6">Turismo</option>
                  <option value="7">Alimentos y Bebidas</option>
                  <option value="8">Textil y Confección</option>
                  <option value="9">Construcción</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Etapa del Negocio <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={data.etapa_negocio || ''}
                  onChange={(e) => handleChange('etapa_negocio', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Selecciona la etapa</option>
                  <option value="idea">Idea (aún no he iniciado)</option>
                  <option value="inicio">Inicio (menos de 1 año)</option>
                  <option value="crecimiento">Crecimiento (1-3 años)</option>
                  <option value="consolidacion">Consolidación (más de 3 años)</option>
                </select>
              </div>
            </div>

            {/* Fecha de inicio */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Fecha de Inicio del Negocio
              </label>
              <input
                type="date"
                value={data.fecha_inicio || ''}
                onChange={(e) => handleChange('fecha_inicio', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Logo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Image className="inline w-4 h-4 mr-1" />
                ¿Tienes logo?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tiene_logo"
                    checked={data.tiene_logo === true}
                    onChange={() => handleChange('tiene_logo', true)}
                    className="mr-2"
                  />
                  Sí
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tiene_logo"
                    checked={data.tiene_logo === false}
                    onChange={() => handleChange('tiene_logo', false)}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>
          </>
        )}

        {isOrganization && (
          <>
            {/* Nombre de la organización */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Building className="inline w-4 h-4 mr-1" />
                Nombre de la Organización <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={data.nombre_organizacion || ''}
                onChange={(e) => handleChange('nombre_organizacion', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Nombre oficial de la organización"
              />
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipo de Entidad <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={data.tipo_entidad || ''}
                onChange={(e) => handleChange('tipo_entidad', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Selecciona el tipo</option>
                {memberType === 'organizacion' ? (
                  <>
                    <option value="ong">ONG</option>
                    <option value="fundacion">Fundación</option>
                    <option value="asociacion">Asociación Civil</option>
                    <option value="cooperativa">Cooperativa</option>
                  </>
                ) : (
                  <>
                    <option value="ministerio">Ministerio</option>
                    <option value="municipalidad">Municipalidad</option>
                    <option value="secretaria">Secretaría</option>
                    <option value="otra">Otra entidad pública</option>
                  </>
                )}
              </select>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FileText className="inline w-4 h-4 mr-1" />
                Descripción de la Misión <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={data.descripcion_mision || ''}
                onChange={(e) => handleChange('descripcion_mision', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                placeholder="Describe la misión y objetivos de tu organización"
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
}
