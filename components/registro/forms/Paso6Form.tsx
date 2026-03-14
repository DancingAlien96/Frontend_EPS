'use client';

// Paso 6: Intereses y Necesidades de Apoyo (solo para emprendimientos, opcional)

interface Paso6FormProps {
  data: any;
  onChange: (data: any) => void;
}

export default function Paso6Form({ data, onChange }: Paso6FormProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ [field]: value });
  };

  const apoyosDisponibles = [
    'Capacitación empresarial',
    'Asesoría técnica',
    'Financiamiento / Créditos',
    'Marketing y publicidad',
    'Networking',
    'Legalización',
    'Contabilidad',
    'Tecnología',
    'Exportación'
  ];

  const temasCapacitacion = [
    'Administración de negocios',
    'Finanzas personales y empresariales',
    'Marketing digital',
    'Ventas',
    'Atención al cliente',
    'Uso de tecnología',
    'Formalización legal',
    'Exportación'
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Paso 6: ¿Cómo podemos apoyarte?
        </h2>
        <p className="text-gray-600">
          Cuéntanos qué necesitas para hacer crecer tu emprendimiento
        </p>
        <p className="text-sm text-yellow-600 mt-2">
          ⚠️ Este es el último paso opcional. Avanza para finalizar tu registro.
        </p>
      </div>

      <form className="space-y-6">
        {/* Tipos de apoyo que necesita */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            ¿Qué tipos de apoyo necesitas? (selecciona todos los que apliquen)
          </label>
          <div className="space-y-2">
            {apoyosDisponibles.map(apoyo => (
              <label key={apoyo} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={data.tipos_apoyo_necesita?.includes(apoyo) || false}
                  onChange={(e) => {
                    const current = data.tipos_apoyo_necesita || [];
                    const updated = e.target.checked 
                      ? [...current, apoyo]
                      : current.filter((a:string) => a !== apoyo);
                    handleChange('tipos_apoyo_necesita', updated);
                  }}
                  className="mr-3"
                />
                <span className="text-sm">{apoyo}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Temas de capacitación */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            ¿En qué te gustaría capacitarte?
          </label>
          <div className="space-y-2">
            {temasCapacitacion.map(tema => (
              <label key={tema} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={data.temas_interes_capacitacion?.includes(tema) || false}
                  onChange={(e) => {
                    const current = data.temas_interes_capacitacion || [];
                    const updated = e.target.checked 
                      ? [...current, tema]
                      : current.filter((t:string) => t !== tema);
                    handleChange('temas_interes_capacitacion', updated);
                  }}
                  className="mr-3"
                />
                <span className="text-sm">{tema}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Necesidad de financiamiento */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ¿Necesitas financiamiento?
          </label>
          <select
            value={data.necesita_financiamiento?.toString() || ''}
            onChange={(e) => handleChange('necesita_financiamiento', e.target.value === 'true')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Selecciona una opción</option>
            <option value="true">Sí, necesito financiamiento</option>
            <option value="false">No por el momento</option>
          </select>
        </div>

        {data.necesita_financiamiento && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Monto Aproximado que Necesitas (Q)
            </label>
            <select
              value={data.monto_financiamiento || ''}
              onChange={(e) => handleChange('monto_financiamiento', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Selecciona un rango</option>
              <option value="0-10000">Menos de Q10,000</option>
              <option value="10001-25000">Q10,001 - Q25,000</option>
              <option value="25001-50000">Q25,001 - Q50,000</option>
              <option value="50001-100000">Q50,001 - Q100,000</option>
              <option value="100001+">Más de Q100,000</option>
            </select>
          </div>
        )}

        {/* Objetivo principal */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ¿Cuál es tu principal objetivo al unirte al ecosistema?
          </label>
          <textarea
            value={data.objetivo_principal || ''}
            onChange={(e) => handleChange('objetivo_principal', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            placeholder="Describe brevemente qué esperas lograr..."
          />
        </div>

        {/* Información adicional */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            <strong>🎉 ¡Último paso!</strong> Después de completar este formulario, enviaremos tu solicitud 
            para ser revisada por nuestro equipo. Te contactaremos pronto para darte la bienvenida oficial al ecosistema.
          </p>
        </div>
      </form>
    </div>
  );
}
