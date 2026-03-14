'use client';

// Paso 3: Ventas/Ámbito (opcional, se puede saltar)

interface Paso3FormProps {
  data: any;
  onChange: (data: any) => void;
  memberType: string;
}

export default function Paso3Form({ data, onChange, memberType }: Paso3FormProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ [field]: value });
  };

  const isVenture = memberType === 'emprendimiento' || memberType === 'empresa';

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Paso 3: {isVenture ? 'Información de Ventas' : 'Ámbito de Acción'}
        </h2>
        <p className="text-gray-600">
          {isVenture 
            ? 'Datos sobre tus ventas y alcance comercial'
            : 'Define el alcance geográfico y sectores de tu trabajo'
          }
        </p>
        <p className="text-sm text-yellow-600 mt-2">
          ⚠️ Este paso es opcional. Puedes saltarlo y completarlo más tarde.
        </p>
      </div>

      <form className="space-y-6">
        {isVenture ? (
          <>
            {/* Ventas aproximadas */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ventas Mensuales Aproximadas (Q)
              </label>
              <select
                value={data.rango_ventas || ''}
                onChange={(e) => handleChange('rango_ventas', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Selecciona un rango</option>
                <option value="0-5000">Menos de Q5,000</option>
                <option value="5001-15000">Q5,001 - Q15,000</option>
                <option value="15001-30000">Q15,001 - Q30,000</option>
                <option value="30001-50000">Q30,001 - Q50,000</option>
                <option value="50001+">Más de Q50,000</option>
              </select>
            </div>

            {/* Número de clientes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Número Aproximado de Clientes
              </label>
              <input
                type="number"
                value={data.numero_clientes || ''}
                onChange={(e) => handleChange('numero_clientes', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Ej: 50"
                min="0"
              />
            </div>

            {/* Alcance geográfico */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Alcance Geográfico de tus Ventas
              </label>
              <select
                value={data.alcance_geografico || ''}
                onChange={(e) => handleChange('alcance_geografico', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Selecciona el alcance</option>
                <option value="local">Local (mi municipio)</option>
                <option value="regional">Regional (Chiquimula)</option>
                <option value="nacional">Nacional (Guatemala)</option>
                <option value="internacional">Internacional</option>
              </select>
            </div>

            {/* Canales de venta */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Canales de Venta (puedes seleccionar varios)
              </label>
              <div className="space-y-2">
                {['Tienda física', 'Redes sociales', 'WhatsApp', 'Sitio web', 'Mercados', 'Distribuidores'].map(canal => (
                  <label key={canal} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={data.canales_venta?.includes(canal) || false}
                      onChange={(e) => {
                        const current = data.canales_venta || [];
                        const updated = e.target.checked 
                          ? [...current, canal]
                          : current.filter((c:string) => c !== canal);
                        handleChange('canales_venta', updated);
                      }}
                      className="mr-2"
                    />
                    {canal}
                  </label>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Ámbito geográfico */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ámbito Geográfico de Acción
              </label>
              <select
                value={data.ambito_geografico || ''}
                onChange={(e) => handleChange('ambito_geografico', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Selecciona el ámbito</option>
                <option value="municipal">Municipal</option>
                <option value="departamental">Departamental (Chiquimula)</option>
                <option value="regional">Regional</option>
                <option value="nacional">Nacional</option>
                <option value="internacional">Internacional</option>
              </select>
            </div>

            {/* Sectores que apoyan */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sectores Productivos que Apoyan
              </label>
              <div className="space-y-2">
                {['Agricultura', 'Comercio', 'Servicios', 'Manufactura', 'Tecnología', 'Turismo', 'Todos'].map(sector => (
                  <label key={sector} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={data.sectores_apoyo?.includes(sector) || false}
                      onChange={(e) => {
                        const current = data.sectores_apoyo || [];
                        const updated = e.target.checked 
                          ? [...current, sector]
                          : current.filter((s:string) => s !== sector);
                        handleChange('sectores_apoyo', updated);
                      }}
                      className="mr-2"
                    />
                    {sector}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
