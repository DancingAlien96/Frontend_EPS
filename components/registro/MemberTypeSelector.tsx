'use client';

import { motion } from 'framer-motion';
import { Briefcase, Building2, Landmark, Users2, ShoppingBag } from 'lucide-react';

interface MemberType {
  id: 'emprendimiento' | 'empresa' | 'organizacion' | 'institucion' | 'consumidor';
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  ringColor: string;
}

const memberTypes: MemberType[] = [
  {
    id: 'emprendimiento',
    title: 'Emprendimiento',
    subtitle: 'Negocio en desarrollo',
    description: 'Para personas con ideas o negocios sin formalizar que buscan apoyo para crecer',
    icon: <Briefcase className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600',
    ringColor: 'ring-purple-200'
  },
  {
    id: 'empresa',
    title: 'Empresa (MIPYME)',
    subtitle: 'Negocio formalizado',
    description: 'Para micro, pequeñas y medianas empresas formalmente registradas',
    icon: <Building2 className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
    ringColor: 'ring-blue-200'
  },
  {
    id: 'organizacion',
    title: 'Organización Privada',
    subtitle: 'ONG o Fundación',
    description: 'Para organizaciones sin fines de lucro que apoyan el emprendimiento',
    icon: <Users2 className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-600',
    ringColor: 'ring-orange-200'
  },
  {
    id: 'institucion',
    title: 'Institución Pública',
    subtitle: 'Entidad gubernamental',
    description: 'Para ministerios, municipalidades y otras entidades del sector público',
    icon: <Landmark className="w-8 h-8" />,
    color: 'from-green-500 to-green-600',
    ringColor: 'ring-green-200'
  },
  {
    id: 'consumidor',
    title: 'Consumidor/Ciudadano',
    subtitle: 'Usuario del ecosistema',
    description: 'Para personas interesadas en conocer y apoyar emprendimientos locales',
    icon: <ShoppingBag className="w-8 h-8" />,
    color: 'from-pink-500 to-pink-600',
    ringColor: 'ring-pink-200'
  }
];

interface MemberTypeSelectorProps {
  onSelect: (type: MemberType['id']) => void;
  selected?: MemberType['id'];
}

export default function MemberTypeSelector({ onSelect, selected }: MemberTypeSelectorProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          ¿Cómo deseas participar en el ecosistema?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Selecciona el tipo de perfil que mejor describe tu situación. Cada tipo tiene un proceso de registro adaptado a sus necesidades.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memberTypes.map((type, index) => {
          const isSelected = selected === type.id;
          
          return (
            <motion.button
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(type.id)}
              className={`
                relative p-6 rounded-2xl text-left transition-all
                ${isSelected 
                  ? `ring-4 ${type.ringColor} scale-105 shadow-2xl` 
                  : 'hover:shadow-xl hover:scale-102 shadow-lg'
                }
                bg-white border-2 ${isSelected ? 'border-transparent' : 'border-gray-200'}
              `}
            >
              {/* Indicador de selección */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              {/* Ícono con gradiente */}
              <div className={`
                w-16 h-16 rounded-xl bg-gradient-to-br ${type.color}
                flex items-center justify-center text-white mb-4
                ${isSelected ? 'scale-110' : ''}
                transition-transform
              `}>
                {type.icon}
              </div>

              {/* Contenido */}
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {type.title}
              </h3>
              <p className="text-sm font-medium text-gray-500 mb-3">
                {type.subtitle}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {type.description}
              </p>
            </motion.button>
          );
        })}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-600 mb-4">
            Has seleccionado: <span className="font-bold text-gray-900">
              {memberTypes.find(t => t.id === selected)?.title}
            </span>
          </p>
        </motion.div>
      )}
    </div>
  );
}
