'use client';

// Paso 5: Formalización (solo para emprendimientos, opcional)

interface Paso5FormProps {
  data: any;
  onChange: (data: any) => void;
}

export default function Paso5Form({ data, onChange }: Paso5FormProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ [field]: value });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Paso 5: Formalización del Negocio
        </h2>
        <p className="text-gray-600">
          Información sobre el estado legal y formalización de tu emprendimiento
        </p>
        <p className="text-sm text-yellow-600 mt-2">
          ⚠️ Este paso es opcional. Puedes saltarlo y completarlo más tarde.
        </p>
      </div>

      <form className="space-y-6">
        {/* ¿Está formalizado? */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ¿Tu negocio está formalizado legalmente?
          </label>
          <select
            value={data.esta_formalizado?.toString() || ''}
            onChange={(e) => handleChange('esta_formalizado', e.target.value === 'true')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Selecciona una opción</option>
            <option value="true">Sí, está formalizado</option>
            <option value="false">No, aún no está formalizado</option>
          </select>
        </div>

        {/* Si está formalizado */}
        {data.esta_formalizado && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipo de Registro
              </label>
              <select
                value={data.tipo_registro || ''}
                onChange={(e) => handleChange('tipo_registro', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Selecciona el tipo</option>
                <option value="patente_comercio">Patente de Comercio</option>
                <option value="sociedad_anonima">Sociedad Anónima (S.A.)</option>
                <option value="sociedad_responsabilidad_limitada">Sociedad de Responsabilidad Limitada</option>
                <option value="empresa_individual">Empresa Individual</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Número de Registro / Patente
              </label>
              <input
                type="text"
                value={data.numero_registro || ''}
                onChange={(e) => handleChange('numero_registro', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Número de registro o patente"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fecha de Registro
              </label>
              <input
                type="date"
                value={data.fecha_registro_legal || ''}
                onChange={(e) => handleChange('fecha_registro_legal', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </>
        )}

        {/* RTU */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ¿Tienes RTU (Registro Tributario Unificado)?
          </label>
          <select
            value={data.tiene_rtu?.toString() || ''}
            onChange={(e) => handleChange('tiene_rtu', e.target.value === 'true')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Selecciona una opción</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>

        {data.tiene_rtu && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              NIT
            </label>
            <input
              type="text"
              value={data.nit || ''}
              onChange={(e) => handleChange('nit', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="12345678-9"
            />
          </div>
        )}

        {/* Registro SAT */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ¿Emites facturas?
          </label>
          <select
            value={data.emite_facturas?.toString() || ''}
            onChange={(e) => handleChange('emite_facturas', e.target.value === 'true')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Selecciona una opción</option>
            <option value="true">Sí, emito facturas</option>
            <option value="false">No, solo recibos o sin documentos</option>
          </select>
        </div>

        {/* Contador */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ¿Tienes contador?
          </label>
          <select
            value={data.tiene_contador?.toString() || ''}
            onChange={(e) => handleChange('tiene_contador', e.target.value === 'true')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Selecciona una opción</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Información adicional */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>💡 Sobre la formalización:</strong> No es requisito estar formalizado para participar en el ecosistema. 
            Si aún no lo estás, podemos ayudarte en el proceso de formalización.
          </p>
        </div>
      </form>
    </div>
  );
}
