'use client';

import { Mail, User, Phone, Hash, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

interface Paso1FormProps {
  data: any;
  onChange: (data: any) => void;
  memberType: string;
}

export default function Paso1Form({ data, onChange, memberType }: Paso1FormProps) {
  const { user, userProfile } = useAuth();

  // Pre-llenar email y nombre si ya están autenticados con Firebase
  useEffect(() => {
    if (user && !data.email) {
      const updates: any = {};
      if (user.email && !data.email) {
        updates.email = user.email;
      }
      if (user.displayName && !data.nombre_completo) {
        updates.nombre_completo = user.displayName;
      }
      if (Object.keys(updates).length > 0) {
        onChange(updates);
      }
    }
  }, [user]); // Solo ejecutar cuando user cambie, no cuando data cambie para evitar loops

  const handleChange = (field: string, value: any) => {
    onChange({ [field]: value });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Paso 1: Información Personal
        </h2>
        <p className="text-gray-600">
          Proporciona tus datos básicos para completar tu perfil en el ecosistema
        </p>
      </div>

      <form className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Mail className="inline w-4 h-4 mr-1" />
            Correo Electrónico <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            readOnly={!!user?.email}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
              user?.email ? 'bg-gray-50 cursor-not-allowed' : ''
            }`}
            placeholder="tu@email.com"
          />
          {user?.email && (
            <p className="text-xs text-gray-500 mt-1">✓ Email verificado desde tu cuenta de Google</p>
          )}
        </div>

        {/* Nombre completo y teléfono */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <User className="inline w-4 h-4 mr-1" />
              Nombre Completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={data.nombre_completo || ''}
              onChange={(e) => handleChange('nombre_completo', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Nombre y apellidos"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Phone className="inline w-4 h-4 mr-1" />
              Teléfono (WhatsApp) <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={data.telefono_whatsapp || ''}
              onChange={(e) => handleChange('telefono_whatsapp', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="5512-3456"
            />
          </div>
        </div>

        {/* DPI y Fecha de nacimiento (opcionales pero recomendados) */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Hash className="inline w-4 h-4 mr-1" />
              DPI / Número de Identificación
            </label>
            <input
              type="text"
              value={data.numero_identificacion || ''}
              onChange={(e) => handleChange('numero_identificacion', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="1234567890101"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              value={data.fecha_nacimiento || ''}
              onChange={(e) => handleChange('fecha_nacimiento', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Ubicación */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Municipio
          </label>
          <select
            value={data.municipio_id || ''}
            onChange={(e) => handleChange('municipio_id', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="">Selecciona tu municipio</option>
            <option value="2001">Chiquimula</option>
            <option value="2002">Esquipulas</option>
            <option value="2003">Quetzaltepeque</option>
            <option value="2004">Camotán</option>
            <option value="2005">Jocotán</option>
            <option value="2006">Olopa</option>
            <option value="2007">San Juan Ermita</option>
            <option value="2008">Concepción Las Minas</option>
            <option value="2009">San Jacinto</option>
            <option value="2010">San José La Arada</option>
            <option value="2011">Ipala</option>
          </select>
        </div>

        {/* Información adicional */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>💡 Nota:</strong> Estos datos son básicos y te permitirán crear tu cuenta. 
            En los siguientes pasos completarás tu perfil según el tipo de miembro que seleccionaste: 
            <strong className="capitalize"> {memberType}</strong>.
          </p>
        </div>
      </form>
    </div>
  );
}
