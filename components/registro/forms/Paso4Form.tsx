'use client';

// Paso 4: Logística/Presencia Digital (opcional)

interface Paso4FormProps {
  data: any;
  onChange: (data: any) => void;
  memberType: string;
}

export default function Paso4Form({ data, onChange, memberType }: Paso4FormProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ [field]: value });
  };

  const isVenture = memberType === 'emprendimiento' || memberType === 'empresa';

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Paso 4: {isVenture ? 'Logística y Operaciones' : 'Presencia Digital'}
        </h2>
        <p className="text-gray-600">
          {isVenture 
            ? 'Información sobre tu capacidad operativa'
            : 'Enlaces a tus plataformas digitales'
          }
        </p>
        <p className="text-sm text-yellow-600 mt-2">
          ⚠️ Este paso es opcional. Puedes saltarlo y completarlo más tarde.
        </p>
      </div>

      <form className="space-y-6">
        {isVenture ? (
          <>
            {/* Ubicación del negocio */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ¿Tienes local físico?
              </label>
              <select
                value={data.tiene_local_fisico?.toString() || ''}
                onChange={(e) => handleChange('tiene_local_fisico', e.target.value === 'true')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Selecciona una opción</option>
                <option value="true">Sí, tengo local físico</option>
                <option value="false">No, trabajo desde casa / delivery</option>
              </select>
            </div>

            {/* Dirección */}
            {data.tiene_local_fisico && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Dirección del Local
                </label>
                <input
                  type="text"
                  value={data.direccion_fisica || ''}
                  onChange={(e) => handleChange('direccion_fisica', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Calle, número, zona, referencias"
                />
              </div>
            )}

            {/* Transporte */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ¿Tienes transporte propio?
              </label>
              <select
                value={data.tiene_transporte?.toString() || ''}
                onChange={(e) => handleChange('tiene_transporte', e.target.value === 'true')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Selecciona una opción</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Inventario */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ¿Manejas inventario de productos?
              </label>
              <select
                value={data.maneja_inventario?.toString() || ''}
                onChange={(e) => handleChange('maneja_inventario', e.target.value === 'true')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Selecciona una opción</option>
                <option value="true">Sí, vendo productos físicos</option>
                <option value="false">No, ofrezco servicios</option>
              </select>
            </div>

            {/* Capacidad productiva */}
            {data.maneja_inventario && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Capacidad Productiva Mensual
                </label>
                <input
                  type="number"
                  value={data.capacidad_productiva || ''}
                  onChange={(e) => handleChange('capacidad_productiva', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Unidades que puedes producir al mes"
                  min="0"
                />
              </div>
            )}
          </>
        ) : (
          <>
            {/* Sitio web */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sitio Web
              </label>
              <input
                type="url"
                value={data.sitio_web || ''}
                onChange={(e) => handleChange('sitio_web', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="https://tu-organizacion.org"
              />
            </div>

            {/* Redes sociales */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Facebook
              </label>
              <input
                type="text"
                value={data.facebook_url || ''}
                onChange={(e) => handleChange('facebook_url', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="https://facebook.com/tu-pagina"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Instagram
              </label>
              <input
                type="text"
                value={data.instagram_url || ''}
                onChange={(e) => handleChange('instagram_url', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="@tu_usuario"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                LinkedIn
              </label>
              <input
                type="text"
                value={data.linkedin_url || ''}
                onChange={(e) => handleChange('linkedin_url', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="https://linkedin.com/company/tu-organizacion"
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
}
