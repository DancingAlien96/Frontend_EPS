'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Building2, 
  Landmark, 
  HandHeart,
  ArrowRight,
  ArrowLeft,
  Upload,
  Check,
  Store,
  FileText,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Lock,
  Hash,
  Building,
  Globe,
  Users,
  Target
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type TipoUsuario = 'emprendedor_informal' | 'emprendedor_mipyme' | 'entidad_publica' | 'organizacion_privada' | null;

// Configuración de pasos por tipo de usuario
const PASOS_CONFIG = {
  emprendedor_informal: {
    total: 3,
    titulos: ['Datos Personales', 'Ubicación', 'Tu Emprendimiento']
  },
  emprendedor_mipyme: {
    total: 5,
    titulos: ['Datos de la Empresa', 'Información Legal', 'Representante Legal', 'Ubicación', 'Información del Negocio']
  },
  entidad_publica: {
    total: 3,
    titulos: ['Información de la Entidad', 'Representante/Contacto', 'Ubicación y Documentos']
  },
  organizacion_privada: {
    total: 4,
    titulos: ['Información Legal', 'Representante', 'Áreas de Trabajo', 'Presencia Digital']
  }
};

export default function RegistroPage() {
  const router = useRouter();
  const [tipoSeleccionado, setTipoSeleccionado] = useState<TipoUsuario>(null);
  const [paso, setPaso] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

  const tiposUsuario = [
    {
      tipo: 'emprendedor_informal' as TipoUsuario,
      icon: <User className="w-8 h-8" />,
      titulo: 'Emprendedor',
      subtitulo: 'Inicias tu negocio',
      descripcion: 'Para personas con ideas o negocios sin formalizar',
      color: 'from-purple-500 to-purple-600',
      ringColor: 'ring-purple-200'
    },
    {
      tipo: 'emprendedor_mipyme' as TipoUsuario,
      icon: <Store className="w-8 h-8" />,
      titulo: 'MIPYME',
      subtitulo: 'Negocio establecido',
      descripcion: 'Para empresas formalizadas con patente de comercio',
      color: 'from-blue-500 to-blue-600',
      ringColor: 'ring-blue-200'
    },
    {
      tipo: 'entidad_publica' as TipoUsuario,
      icon: <Landmark className="w-8 h-8" />,
      titulo: 'Entidad Pública',
      subtitulo: 'Institución de gobierno',
      descripcion: 'Ministerios, municipalidades y entidades públicas',
      color: 'from-green-500 to-green-600',
      ringColor: 'ring-green-200'
    },
    {
      tipo: 'organizacion_privada' as TipoUsuario,
      icon: <HandHeart className="w-8 h-8" />,
      titulo: 'Organización Privada',
      subtitulo: 'ONG o Fundación',
      descripcion: 'Organizaciones de apoyo al emprendimiento',
      color: 'from-orange-500 to-orange-600',
      ringColor: 'ring-orange-200'
    }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const siguientePaso = () => setPaso(paso + 1);
  const pasoAnterior = () => setPaso(paso - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    console.log('Datos del formulario:', { tipo: tipoSeleccionado, ...formData });
    
    // TODO: Conectar con el backend
    // try {
    //   await axios.post('/api/solicitudes-registro', {
    //     tipo_solicitud: tipoSeleccionado,
    //     datos_formulario: formData
    //   });
    //   alert('✅ Solicitud enviada exitosamente. Será revisada por nuestro equipo.');
    //   router.push('/');
    // } catch (err: any) {
    //   setError(err.response?.data?.message || 'Error al enviar solicitud');
    // }
    
    setTimeout(() => {
      alert('✅ Solicitud enviada exitosamente. Será revisada por nuestro equipo.');
      router.push('/');
      setLoading(false);
    }, 1500);
  };

  if (!tipoSeleccionado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Crea tu Cuenta
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Selecciona el tipo de perfil que mejor se ajuste a ti
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {tiposUsuario.map((tipo, index) => (
              <motion.button
                key={tipo.tipo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setTipoSeleccionado(tipo.tipo)}
                className="bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-all text-left group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${tipo.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform ring-4 ${tipo.ringColor}`}>
                  {tipo.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{tipo.titulo}</h3>
                <p className="text-sm font-semibold text-gray-500 mb-3">{tipo.subtitulo}</p>
                <p className="text-gray-600">{tipo.descripcion}</p>
                <div className="flex items-center gap-2 text-blue-600 font-semibold mt-4 group-hover:gap-3 transition-all">
                  Continuar <ArrowRight className="w-5 h-5" />
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link href="/auth/login" className="text-blue-600 font-semibold hover:underline">
                Inicia sesión aquí
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  const tipoConfig = tiposUsuario.find(t => t.tipo === tipoSeleccionado)!;
  const pasosInfo = PASOS_CONFIG[tipoSeleccionado];

  // Renderizar formulario según el tipo y paso actual
  const renderFormularioPaso = () => {
    switch (tipoSeleccionado) {
      case 'emprendedor_informal':
        return renderEmprendedorInformalForm();
      case 'emprendedor_mipyme':
        return renderEmprendedorMIPYMEForm();
      case 'entidad_publica':
        return renderEntidadPublicaForm();
      case 'organizacion_privada':
        return renderOrganizacionPrivadaForm();
      default:
        return null;
    }
  };

  // FORMULARIO: Emprendedor Informal (3 pasos)
  const renderEmprendedorInformalForm = () => {
    if (paso === 1) {
      return (
        <motion.div
          key="paso1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Nombre Completo *
              </label>
              <input
                type="text"
                required
                value={formData.nombre_completo || ''}
                onChange={(e) => handleInputChange('nombre_completo', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
                placeholder="Juan Pérez López"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Teléfono *
              </label>
              <input
                type="tel"
                required
                value={formData.telefono || ''}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
                placeholder="1234-5678"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Correo Electrónico *
            </label>
            <input
              type="email"
              required
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
              placeholder="juan@example.com"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Contraseña *
              </label>
              <input
                type="password"
                required
                value={formData.password || ''}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Confirmar Contraseña *
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword || ''}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
                placeholder="Repite la contraseña"
              />
            </div>
          </div>
        </motion.div>
      );
    }

    if (paso === 2) {
      return (
        <motion.div
          key="paso2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Departamento *
              </label>
              <select
                required
                value={formData.id_departamento || ''}
                onChange={(e) => handleInputChange('id_departamento', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
              >
                <option value="">Selecciona...</option>
                <option value="20">Chiquimula</option>
                <option value="6">Guatemala</option>
                <option value="13">Sacatepéquez</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Municipio *
              </label>
              <select
                required
                value={formData.id_municipio || ''}
                onChange={(e) => handleInputChange('id_municipio', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
              >
                <option value="">Selecciona...</option>
                <option value="1">Chiquimula (Cabecera)</option>
                <option value="2">Esquipulas</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Building className="w-4 h-4 inline mr-2" />
              Dirección
            </label>
            <input
              type="text"
              value={formData.direccion || ''}
              onChange={(e) => handleInputChange('direccion', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
              placeholder="Zona, colonia, barrio..."
            />
          </div>
        </motion.div>
      );
    }

    if (paso === 3) {
      return (
        <motion.div
          key="paso3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Store className="w-4 h-4 inline mr-2" />
              Nombre del Emprendimiento *
            </label>
            <input
              type="text"
              required
              value={formData.nombre_emprendimiento || ''}
              onChange={(e) => handleInputChange('nombre_emprendimiento', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
              placeholder="Ej: Artesanías La Montaña"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Target className="w-4 h-4 inline mr-2" />
              Sector Económico *
            </label>
            <select
              required
              value={formData.id_sector || ''}
              onChange={(e) => handleInputChange('id_sector', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
            >
              <option value="">Selecciona...</option>
              <option value="1">Agroindustria</option>
              <option value="2">Artesanías</option>
              <option value="3">Comercio</option>
              <option value="4">Servicios</option>
              <option value="5">Tecnología</option>
              <option value="6">Turismo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Descripción del Emprendimiento
            </label>
            <textarea
              rows={4}
              value={formData.descripcion || ''}
              onChange={(e) => handleInputChange('descripcion', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all resize-none"
              placeholder="Cuéntanos sobre tu emprendimiento, qué productos o servicios ofreces..."
            />
          </div>
        </motion.div>
      );
    }

    return null;
  };

  // FORMULARIO: Emprendedor MIPYME (5 pasos)
  const renderEmprendedorMIPYMEForm = () => {
    if (paso === 1) {
      return (
        <motion.div
          key="paso1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Building className="w-4 h-4 inline mr-2" />
              Razón Social *
            </label>
            <input
              type="text"
              required
              value={formData.razon_social || ''}
              onChange={(e) => handleInputChange('razon_social', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              placeholder="Ej: Distribuidora La Esperanza, S.A."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Hash className="w-4 h-4 inline mr-2" />
                NIT *
              </label>
              <input
                type="text"
                required
                value={formData.nit || ''}
                onChange={(e) => handleInputChange('nit', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                placeholder="12345678-9"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Número de Patente *
              </label>
              <input
                type="text"
                required
                value={formData.numero_patente || ''}
                onChange={(e) => handleInputChange('numero_patente', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                placeholder="Número de patente de comercio"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Store className="w-4 h-4 inline mr-2" />
              Nombre Comercial
            </label>
            <input
              type="text"
              value={formData.nombre_emprendimiento || ''}
              onChange={(e) => handleInputChange('nombre_emprendimiento', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              placeholder="Si es diferente a la razón social"
            />
          </div>
        </motion.div>
      );
    }

    if (paso === 2) {
      return (
        <motion.div
          key="paso2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Fecha de Constitución
              </label>
              <input
                type="date"
                value={formData.fecha_constitucion || ''}
                onChange={(e) => handleInputChange('fecha_constitucion', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Categoría MIPYME *
              </label>
              <select
                required
                value={formData.categoria_mipyme || ''}
                onChange={(e) => handleInputChange('categoria_mipyme', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              >
                <option value="">Selecciona...</option>
                <option value="micro">Microempresa (1-10 empleados)</option>
                <option value="pequena">Pequeña (11-50 empleados)</option>
                <option value="mediana">Mediana (51-100 empleados)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Facturación Anual Aproximada (Opcional)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.facturacion_anual_aproximada || ''}
              onChange={(e) => handleInputChange('facturacion_anual_aproximada', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              placeholder="Ej: 250000"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Upload className="w-4 h-4 inline mr-2" />
              Documento Constitutivo (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleInputChange('documento_constitucion', e.target.files?.[0])}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-all"
            />
            <p className="text-xs text-gray-500 mt-2">Acta constitutiva o documento de inscripción</p>
          </div>
        </motion.div>
      );
    }

    if (paso === 3) {
      return (
        <motion.div
          key="paso3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Nombre del Representante Legal *
              </label>
              <input
                type="text"
                required
                value={formData.nombre_completo || ''}
                onChange={(e) => handleInputChange('nombre_completo', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                placeholder="Nombre completo"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Cargo
              </label>
              <input
                type="text"
                value={formData.cargo || ''}
                onChange={(e) => handleInputChange('cargo', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                placeholder="Ej: Gerente General, Propietario"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Correo Electrónico *
              </label>
              <input
                type="email"
                required
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                placeholder="correo@empresa.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Teléfono *
              </label>
              <input
                type="tel"
                required
                value={formData.telefono || ''}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                placeholder="1234-5678"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Contraseña *
              </label>
              <input
                type="password"
                required
                value={formData.password || ''}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Confirmar Contraseña *
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword || ''}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                placeholder="Repite la contraseña"
              />
            </div>
          </div>
        </motion.div>
      );
    }

    if (paso === 4) {
      return (
        <motion.div
          key="paso4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Departamento *
              </label>
              <select
                required
                value={formData.id_departamento || ''}
                onChange={(e) => handleInputChange('id_departamento', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              >
                <option value="">Selecciona...</option>
                <option value="20">Chiquimula</option>
                <option value="6">Guatemala</option>
                <option value="13">Sacatepéquez</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Municipio *
              </label>
              <select
                required
                value={formData.id_municipio || ''}
                onChange={(e) => handleInputChange('id_municipio', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              >
                <option value="">Selecciona...</option>
                <option value="1">Chiquimula (Cabecera)</option>
                <option value="2">Esquipulas</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Building className="w-4 h-4 inline mr-2" />
              Dirección de la Empresa *
            </label>
            <input
              type="text"
              required
              value={formData.direccion || ''}
              onChange={(e) => handleInputChange('direccion', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              placeholder="Dirección completa de la sede principal"
            />
          </div>
        </motion.div>
      );
    }

    if (paso === 5) {
      return (
        <motion.div
          key="paso5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Target className="w-4 h-4 inline mr-2" />
              Sector Económico Principal *
            </label>
            <select
              required
              value={formData.id_sector || ''}
              onChange={(e) => handleInputChange('id_sector', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
            >
              <option value="">Selecciona...</option>
              <option value="1">Agroindustria</option>
              <option value="2">Artesanías</option>
              <option value="3">Comercio</option>
              <option value="4">Servicios</option>
              <option value="5">Tecnología</option>
              <option value="6">Turismo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Descripción de Productos/Servicios
            </label>
            <textarea
              rows={4}
              value={formData.descripcion || ''}
              onChange={(e) => handleInputChange('descripcion', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
              placeholder="Describe los principales productos o servicios que ofrece tu empresa..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-2" />
              Número de Empleados Actuales
            </label>
            <input
              type="number"
              min="1"
              value={formData.numero_empleados || ''}
              onChange={(e) => handleInputChange('numero_empleados', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              placeholder="Ej: 15"
            />
          </div>
        </motion.div>
      );
    }

    return null;
  };

  // FORMULARIO: Entidad Pública (3 pasos)
  const renderEntidadPublicaForm = () => {
    if (paso === 1) {
      return (
        <motion.div
          key="paso1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Landmark className="w-4 h-4 inline mr-2" />
              Nombre de la Entidad *
            </label>
            <input
              type="text"
              required
              value={formData.nombre_entidad || ''}
              onChange={(e) => handleInputChange('nombre_entidad', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
              placeholder="Ej: Municipalidad de Chiquimula"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Building className="w-4 h-4 inline mr-2" />
                Tipo de Entidad *
              </label>
              <select
                required
                value={formData.tipo_entidad || ''}
                onChange={(e) => handleInputChange('tipo_entidad', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
              >
                <option value="">Selecciona...</option>
                <option value="ministerio">Ministerio</option>
                <option value="secretaria">Secretaría</option>
                <option value="direccion">Dirección</option>
                <option value="municipalidad">Municipalidad</option>
                <option value="gobernacion">Gobernación</option>
                <option value="otra">Otra</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Siglas
              </label>
              <input
                type="text"
                value={formData.siglas || ''}
                onChange={(e) => handleInputChange('siglas', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                placeholder="Ej: MINECO, MAGA"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Hash className="w-4 h-4 inline mr-2" />
              NIT Institucional
            </label>
            <input
              type="text"
              value={formData.nit_institucional || ''}
              onChange={(e) => handleInputChange('nit_institucional', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
              placeholder="NIT de la institución"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Descripción de la Entidad
            </label>
            <textarea
              rows={3}
              value={formData.descripcion_entidad || ''}
              onChange={(e) => handleInputChange('descripcion_entidad', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all resize-none"
              placeholder="Funciones y áreas de trabajo de la entidad..."
            />
          </div>
        </motion.div>
      );
    }

    if (paso === 2) {
      return (
        <motion.div
          key="paso2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Nombre del Responsable *
              </label>
              <input
                type="text"
                required
                value={formData.nombre_contacto || ''}
                onChange={(e) => handleInputChange('nombre_contacto', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                placeholder="Nombre completo"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Cargo *
              </label>
              <input
                type="text"
                required
                value={formData.cargo_contacto || ''}
                onChange={(e) => handleInputChange('cargo_contacto', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                placeholder="Ej: Director, Coordinador"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Correo Electrónico *
              </label>
              <input
                type="email"
                required
                value={formData.correo_contacto || ''}
                onChange={(e) => handleInputChange('correo_contacto', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                placeholder="correo@entidad.gob.gt"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Teléfono *
              </label>
              <input
                type="tel"
                required
                value={formData.telefono_contacto || ''}
                onChange={(e) => handleInputChange('telefono_contacto', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                placeholder="1234-5678"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Contraseña *
              </label>
              <input
                type="password"
                required
                value={formData.password || ''}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Confirmar Contraseña *
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword || ''}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                placeholder="Repite la contraseña"
              />
            </div>
          </div>
        </motion.div>
      );
    }

    if (paso === 3) {
      return (
        <motion.div
          key="paso3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Departamento *
              </label>
              <select
                required
                value={formData.id_departamento || ''}
                onChange={(e) => handleInputChange('id_departamento', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
              >
                <option value="">Selecciona...</option>
                <option value="20">Chiquimula</option>
                <option value="6">Guatemala</option>
                <option value="13">Sacatepéquez</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Municipio *
              </label>
              <select
                required
                value={formData.id_municipio || ''}
                onChange={(e) => handleInputChange('id_municipio', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
              >
                <option value="">Selecciona...</option>
                <option value="1">Chiquimula (Cabecera)</option>
                <option value="2">Esquipulas</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Building className="w-4 h-4 inline mr-2" />
              Dirección Completa
            </label>
            <input
              type="text"
              value={formData.direccion_completa || ''}
              onChange={(e) => handleInputChange('direccion_completa', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
              placeholder="Dirección de la sede"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Globe className="w-4 h-4 inline mr-2" />
              Sitio Web Oficial
            </label>
            <input
              type="url"
              value={formData.sitio_web || ''}
              onChange={(e) => handleInputChange('sitio_web', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Upload className="w-4 h-4 inline mr-2" />
              Documento de Acreditación (PDF) *
            </label>
            <input
              type="file"
              accept=".pdf"
              required
              onChange={(e) => handleInputChange('documento_acreditacion', e.target.files?.[0])}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-400 transition-all"
            />
            <p className="text-xs text-gray-500 mt-2">Documento que acredite la representación oficial</p>
          </div>
        </motion.div>
      );
    }

    return null;
  };

  // FORMULARIO: Organización Privada (4 pasos)
  const renderOrganizacionPrivadaForm = () => {
    if (paso === 1) {
      return (
        <motion.div
          key="paso1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Building className="w-4 h-4 inline mr-2" />
              Razón Social *
            </label>
            <input
              type="text"
              required
              value={formData.razon_social || ''}
              onChange={(e) => handleInputChange('razon_social', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
              placeholder="Nombre legal de la organización"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <HandHeart className="w-4 h-4 inline mr-2" />
                Tipo de Organización *
              </label>
              <select
                required
                value={formData.tipo_organizacion || ''}
                onChange={(e) => handleInputChange('tipo_organizacion', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
              >
                <option value="">Selecciona...</option>
                <option value="ong">ONG</option>
                <option value="fundacion">Fundación</option>
                <option value="asociacion">Asociación</option>
                <option value="cooperativa">Cooperativa</option>
                <option value="empresa_privada">Empresa Privada</option>
                <option value="camara_comercio">Cámara de Comercio</option>
                <option value="gremial">Gremial</option>
                <option value="otra">Otra</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Hash className="w-4 h-4 inline mr-2" />
                NIT
              </label>
              <input
                type="text"
                value={formData.nit || ''}
                onChange={(e) => handleInputChange('nit', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                placeholder="12345678-9"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Número de Registro
              </label>
              <input
                type="text"
                value={formData.numero_registro || ''}
                onChange={(e) => handleInputChange('numero_registro', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                placeholder="Registro en Gobernación o SAT"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Fecha de Constitución
              </label>
              <input
                type="date"
                value={formData.fecha_constitucion || ''}
                onChange={(e) => handleInputChange('fecha_constitucion', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Upload className="w-4 h-4 inline mr-2" />
              Acta Constitutiva (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleInputChange('documento_constitucion', e.target.files?.[0])}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-400 transition-all"
            />
          </div>
        </motion.div>
      );
    }

    if (paso === 2) {
      return (
        <motion.div
          key="paso2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Nombre del Representante *
              </label>
              <input
                type="text"
                required
                value={formData.nombre_contacto || ''}
                onChange={(e) => handleInputChange('nombre_contacto', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                placeholder="Nombre completo"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Cargo
              </label>
              <input
                type="text"
                value={formData.cargo_contacto || ''}
                onChange={(e) => handleInputChange('cargo_contacto', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                placeholder="Ej: Director Ejecutivo"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Correo Electrónico *
              </label>
              <input
                type="email"
                required
                value={formData.correo_contacto || ''}
                onChange={(e) => handleInputChange('correo_contacto', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                placeholder="contacto@organizacion.org"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Teléfono *
              </label>
              <input
                type="tel"
                required
                value={formData.telefono_contacto || ''}
                onChange={(e) => handleInputChange('telefono_contacto', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                placeholder="1234-5678"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Departamento *
              </label>
              <select
                required
                value={formData.id_departamento || ''}
                onChange={(e) => handleInputChange('id_departamento', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
              >
                <option value="">Selecciona...</option>
                <option value="20">Chiquimula</option>
                <option value="6">Guatemala</option>
                <option value="13">Sacatepéquez</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Municipio *
              </label>
              <select
                required
                value={formData.id_municipio || ''}
                onChange={(e) => handleInputChange('id_municipio', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
              >
                <option value="">Selecciona...</option>
                <option value="1">Chiquimula (Cabecera)</option>
                <option value="2">Esquipulas</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Contraseña *
              </label>
              <input
                type="password"
                required
                value={formData.password || ''}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Confirmar Contraseña *
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword || ''}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                placeholder="Repite la contraseña"
              />
            </div>
          </div>
        </motion.div>
      );
    }

    if (paso === 3) {
      return (
        <motion.div
          key="paso3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Descripción de la Organización
            </label>
            <textarea
              rows={3}
              value={formData.descripcion_organizacion || ''}
              onChange={(e) => handleInputChange('descripcion_organizacion', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all resize-none"
              placeholder="Misión y objetivos de la organización..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Target className="w-4 h-4 inline mr-2" />
              Áreas de Enfoque
            </label>
            <input
              type="text"
              value={formData.areas_enfoque || ''}
              onChange={(e) => handleInputChange('areas_enfoque', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
              placeholder="Ej: Empleabilidad, Financiamiento, Capacitación"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-2" />
              Población Objetivo
            </label>
            <input
              type="text"
              value={formData.poblacion_objetivo || ''}
              onChange={(e) => handleInputChange('poblacion_objetivo', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
              placeholder="Ej: Emprendedores, MIPYME, Jóvenes, Mujeres"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Cobertura Geográfica
            </label>
            <textarea
              rows={2}
              value={formData.cobertura_geografica || ''}
              onChange={(e) => handleInputChange('cobertura_geografica', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all resize-none"
              placeholder="Departamentos o municipios donde trabajan..."
            />
          </div>
        </motion.div>
      );
    }

    if (paso === 4) {
      return (
        <motion.div
          key="paso4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                Sitio Web
              </label>
              <input
                type="url"
                value={formData.sitio_web || ''}
                onChange={(e) => handleInputChange('sitio_web', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Facebook
              </label>
              <input
                type="text"
                value={formData.facebook || ''}
                onChange={(e) => handleInputChange('facebook', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                placeholder="Página de Facebook"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Instagram
              </label>
              <input
                type="text"
                value={formData.instagram || ''}
                onChange={(e) => handleInputChange('instagram', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                placeholder="@usuario"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                LinkedIn
              </label>
              <input
                type="text"
                value={formData.linkedin || ''}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                placeholder="Perfil de LinkedIn"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Building className="w-4 h-4 inline mr-2" />
              Dirección de Oficinas
            </label>
            <input
              type="text"
              value={formData.direccion_completa || ''}
              onChange={(e) => handleInputChange('direccion_completa', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
              placeholder="Dirección completa"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Servicios/Programas que Ofrecen
            </label>
            <textarea
              rows={3}
              value={formData.servicios_ofrecidos || ''}
              onChange={(e) => handleInputChange('servicios_ofrecidos', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all resize-none"
              placeholder="Describe los servicios o programas de apoyo que ofrecen..."
            />
          </div>
        </motion.div>
      );
    }

    return null;
  };

  const tipoConfig = tiposUsuario.find(t => t.tipo === tipoSeleccionado)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className={`w-20 h-20 bg-gradient-to-br ${tipoConfig.color} rounded-3xl flex items-center justify-center text-white mx-auto mb-4 ring-4 ${tipoConfig.ringColor}`}>
            {tipoConfig.icon}
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
            Registro: {tipoConfig.titulo}
          </h1>
          <p className="text-gray-600">{tipoConfig.descripcion}</p>
          <button
            onClick={() => {
              setTipoSeleccionado(null);
              setPaso(1);
              setFormData({});
            }}
            className="text-sm text-blue-600 hover:underline mt-2"
          >
            Cambiar tipo de registro
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-elegant p-8"
        >
          {/* Indicador de pasos */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {Array.from({ length: pasosInfo.total }, (_, i) => i + 1).map((num) => (
                <div key={num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                        num < paso
                          ? `bg-gradient-to-br ${tipoConfig.color} text-white`
                          : num === paso
                          ? `bg-gradient-to-br ${tipoConfig.color} text-white ring-4 ${tipoConfig.ringColor} scale-110`
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {num < paso ? <Check className="w-5 h-5" /> : num}
                    </div>
                    <span className={`text-xs mt-2 text-center ${num === paso ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                      {pasosInfo.titulos[num - 1]}
                    </span>
                  </div>
                  {num < pasosInfo.total && (
                    <div
                      className={`h-1 flex-1 mx-2 rounded transition-all ${
                        num < paso ? `bg-gradient-to-r ${tipoConfig.color}` : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {renderFormularioPaso()}
            </AnimatePresence>

            {/* Botones de navegación */}
            <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t-2 border-gray-100">
              {paso > 1 ? (
                <button
                  type="button"
                  onClick={pasoAnterior}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Atrás
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setTipoSeleccionado(null);
                    setPaso(1);
                    setFormData({});
                  }}
                  className="px-6 py-3 text-gray-600 hover:text-gray-900 font-semibold transition-all"
                >
                  ← Cambiar tipo
                </button>
              )}

              {paso < pasosInfo.total ? (
                <button
                  type="button"
                  onClick={siguientePaso}
                  className={`flex items-center gap-2 px-8 py-3 bg-gradient-to-r ${tipoConfig.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
                >
                  Siguiente
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center gap-2 px-8 py-3 bg-gradient-to-r ${tipoConfig.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? 'Enviando...' : 'Enviar Solicitud'}
                  {!loading && <Check className="w-5 h-5" />}
                </button>
              )}
            </div>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            Tu solicitud será revisada por nuestro equipo. Te contactaremos pronto.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
