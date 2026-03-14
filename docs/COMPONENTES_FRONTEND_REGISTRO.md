# COMPONENTES FRONTEND - REGISTRO PROGRESIVO
## Next.js 16 + React 19 + Tailwind CSS

---

## ARQUITECTURA DE COMPONENTES

```
app/
├── auth/
│   ├── registro/
│   │   ├── page.tsx                    # Paso 0: Selección de perfil
│   │   ├── paso/
│   │   │   └── [step]/
│   │   │       └── page.tsx            # Pasos 1-6 dinámicos
│   │   └── completado/
│   │       └── page.tsx                # Página de éxito
│   └── login/
│       └── page.tsx
│
components/
├── registro/
│   ├── StepWizard.tsx                  # Contenedor principal del wizard
│   ├── ProgressBar.tsx                 # Barra de progreso
│   ├── StepNavigation.tsx              # Botones Atrás/Siguiente/Saltar
│   ├── ProfileTypeCard.tsx             # Tarjeta de selección de tipo
│   │
│   ├── steps/
│   │   ├── Step0TypeSelection.tsx      # Paso 0: Selección
│   │   ├── Step1CreateAccess.tsx       # Paso 1: Crear acceso
│   │   ├── Step2BaseProfile.tsx        # Paso 2: Perfil base
│   │   ├── Step3SalesPayments.tsx      # Paso 3: Ventas
│   │   ├── Step4Logistics.tsx          # Paso 4: Logística
│   │   ├── Step5Formalization.tsx      # Paso 5: Formalización
│   │   └── Step6Interests.tsx          # Paso 6: Intereses
│   │
│   ├── fields/
│   │   ├── ConditionalField.tsx        # Campo que se muestra según condiciones
│   │   ├── CheckboxGroup.tsx           # Grupo de checkboxes
│   │   ├── RadioGroup.tsx              # Grupo de radios
│   │   ├── CloudinaryUpload.tsx        # Subir archivos (ya existe)
│   │   ├── MunicipioSelector.tsx       # Selector municipio+departamento
│   │   └── SectorEconomicoSelector.tsx # Selector de sector
│   │
│   └── ProfileCompletionCard.tsx       # Card con % y recomendaciones
│
contexts/
├── RegistrationContext.tsx             # Estado global del registro
└── AuthContext.tsx                     # Ya existe

hooks/
├── useAutoSave.ts                      # Hook para guardado automático
├── useStepValidation.ts                # Validación por paso
└── useConditionalFields.ts             # Lógica condicional
```

---

## 1. PASO 0: SELECCIÓN DE TIPO DE USUARIO

### `ProfileTypeCard.tsx`
```tsx
import { motion } from 'framer-motion';

interface ProfileTypeCardProps {
  id: string;
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export default function ProfileTypeCard({
  id,
  icon,
  title,
  description,
  selected,
  onClick
}: ProfileTypeCardProps) {
  return (
    <motion.div
      className={`
        relative cursor-pointer rounded-2xl border-2 p-6
        transition-all duration-200 hover:shadow-lg
        ${selected 
          ? 'border-primary-600 bg-primary-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-primary-300'
        }
      `}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Icono grande */}
      <div className="mb-4 text-6xl text-center">
        {icon}
      </div>
      
      {/* Título */}
      <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
        {title}
      </h3>
      
      {/* Descripción */}
      <p className="text-sm text-gray-600 text-center">
        {description}
      </p>
      
      {/* Checkmark si está seleccionado */}
      {selected && (
        <motion.div
          className="absolute top-3 right-3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}
```

### `app/auth/registro/page.tsx` (Paso 0)
```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileTypeCard from '@/components/registro/ProfileTypeCard';

const USER_TYPES = [
  {
    id: 'emprendimiento',
    icon: '🚀',
    title: 'Emprendedor',
    description: 'Estoy iniciando mi negocio o idea'
  },
  {
    id: 'empresa',
    icon: '🏢',
    title: 'Empresa (MIPYME)',
    description: 'Tengo un negocio formalizado'
  },
  {
    id: 'organizacion',
    icon: '🏛️',
    title: 'Organización',
    description: 'ONG, asociación o incubadora'
  },
  {
    id: 'institucion',
    icon: '🏢',
    title: 'Institución Pública',
    description: 'Municipalidad o entidad de gobierno'
  },
  // Condicionalmente mostrar consumidor
  ...(process.env.NEXT_PUBLIC_ENABLE_CONSUMERS === 'true' ? [{
    id: 'consumidor',
    icon: '🛍️',
    title: 'Consumidor Local',
    description: 'Me interesa apoyar negocios locales'
  }] : [])
];

export default function SeleccionPerfilPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedType) return;
    
    setLoading(true);
    
    // Guardar en localStorage para el siguiente paso
    localStorage.setItem('registration_member_type', selectedType);
    
    // Navegar al paso 1
    router.push('/auth/registro/paso/1');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¡Bienvenido! 👋
          </h1>
          <p className="text-lg text-gray-600">
            ¿Cómo quieres participar en el Ecosistema Emprendedor?
          </p>
        </div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {USER_TYPES.map((type) => (
            <ProfileTypeCard
              key={type.id}
              {...type}
              selected={selectedType === type.id}
              onClick={() => setSelectedType(type.id)}
            />
          ))}
        </div>

        {/* Botón continuar */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedType || loading}
            className="
              px-8 py-4 bg-primary-600 text-white rounded-full
              font-semibold text-lg shadow-lg
              disabled:bg-gray-300 disabled:cursor-not-allowed
              hover:bg-primary-700 transition-colors
              min-w-[200px]
            "
          >
            {loading ? 'Cargando...' : 'Continuar →'}
          </button>
        </div>

        {/* Link a login */}
        <p className="text-center mt-6 text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <a href="/auth/login" className="text-primary-600 hover:underline font-semibold">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
```

---

## 2. WIZARD PRINCIPAL

### `StepWizard.tsx`
```tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from './ProgressBar';
import StepNavigation from './StepNavigation';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useAuth } from '@/contexts/AuthContext';

interface StepWizardProps {
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
  onNext: (data: any) => Promise<boolean>;
  onBack?: () => void;
  canSkip?: boolean;
  initialData?: any;
}

export default function StepWizard({
  currentStep,
  totalSteps,
  children,
  onNext,
  onBack,
  canSkip = false,
  initialData = {}
}: StepWizardProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Auto-save cada 30 segundos
  useAutoSave(formData, currentStep, user?.id);

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const success = await onNext(formData);
      if (success) {
        // Navegar al siguiente paso
        router.push(`/auth/registro/paso/${currentStep + 1}`);
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    setLoading(true);
    
    try {
      // Llamar endpoint de saltar paso
      await fetch(`/api/registro/saltar-paso/${currentStep}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Navegar al siguiente
      router.push(`/auth/registro/paso/${currentStep + 1}`);
    } catch (err) {
      console.error('Error al saltar paso:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Barra de progreso */}
        <ProgressBar 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
          percentage={Math.round((currentStep / totalSteps) * 100)}
        />

        {/* Contenido del paso */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-6">
          {/* Renderizar el formulario del paso */}
          {typeof children === 'function' 
            ? children({ formData, handleFieldChange })
            : children
          }

          {/* Error */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              ⚠️ {error}
            </div>
          )}

          {/* Navegación */}
          <StepNavigation
            onBack={onBack}
            onNext={handleNext}
            onSkip={canSkip ? handleSkip : undefined}
            isFirst={currentStep === 1}
            isLast={currentStep === totalSteps}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
```

### `ProgressBar.tsx`
```tsx
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  percentage: number;
}

export default function ProgressBar({ currentStep, totalSteps, percentage }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      {/* Barra visual */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-primary-500 to-primary-600 h-full transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Texto */}
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">
          Paso {currentStep} de {totalSteps}
        </span>
        <span className="font-semibold text-primary-600">
          {percentage}% completo
        </span>
      </div>
    </div>
  );
}
```

### `StepNavigation.tsx`
```tsx
interface StepNavigationProps {
  onBack?: () => void;
  onNext: () => void;
  onSkip?: () => void;
  isFirst: boolean;
  isLast: boolean;
  loading?: boolean;
}

export default function StepNavigation({
  onBack,
  onNext,
  onSkip,
  isFirst,
  isLast,
  loading = false
}: StepNavigationProps) {
  return (
    <div className="flex items-center justify-between mt-8 gap-4">
      {/* Botón Atrás */}
      {!isFirst && onBack && (
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          ← Atrás
        </button>
      )}
      
      <div className="flex-1" />

      {/* Botón Saltar (opcional) */}
      {onSkip && (
        <button
          type="button"
          onClick={onSkip}
          disabled={loading}
          className="px-4 py-3 text-gray-500 hover:text-gray-700 underline text-sm disabled:opacity-50"
        >
          Completar después
        </button>
      )}

      {/* Botón Siguiente/Finalizar */}
      <button
        type="button"
        onClick={onNext}
        disabled={loading}
        className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 min-w-[150px]"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Guardando...
          </span>
        ) : (
          isLast ? 'Finalizar 🎉' : 'Siguiente →'
        )}
      </button>
    </div>
  );
}
```

---

## 3. CAMPOS CONDICIONALES

### `ConditionalField.tsx`
```tsx
import { motion, AnimatePresence } from 'framer-motion';

interface ConditionalFieldProps {
  show: boolean;
  children: React.ReactNode;
}

export default function ConditionalField({ show, children }: ConditionalFieldProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### Uso en formulario:
```tsx
const [tiene_logo, setTieneLogo] = useState(false);

return (
  <div>
    {/* Toggle principal */}
    <label className="flex items-center space-x-3 cursor-pointer">
      <input
        type="checkbox"
        checked={tiene_logo}
        onChange={(e) => setTieneLogo(e.target.checked)}
        className="w-5 h-5 text-primary-600"
      />
      <span className="text-sm font-medium text-gray-700">
        ¿Tienes logo?
      </span>
    </label>

    {/* Campo condicional */}
    <ConditionalField show={tiene_logo}>
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sube tu logo
        </label>
        <CloudinaryUpload 
          onUpload={(url) => handleFieldChange('logo_url', url)}
          accept="image/*"
          maxSize={5}
        />
      </div>
    </ConditionalField>
  </div>
);
```

---

## 4. HOOKS PERSONALIZADOS

### `useAutoSave.ts`
```tsx
import { useEffect, useRef } from 'react';
import { debounce } from 'lodash';

export function useAutoSave(
  data: any,
  stepNumber: number,
  userId?: number,
  delay: number = 3000
) {
  const savedData = useRef(data);

  useEffect(() => {
    // Solo auto-guardar si hay cambios
    if (JSON.stringify(data) === JSON.stringify(savedData.current)) {
      return;
    }

    const saveToBackend = debounce(async () => {
      if (!userId) return;

      try {
        const response = await fetch('/api/registro/guardado-automatico', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            step: stepNumber,
            data
          })
        });

        if (response.ok) {
          savedData.current = data;
          console.log('✅ Cambios guardados automáticamente');
        }
      } catch (error) {
        console.error('Error en auto-save:', error);
      }
    }, delay);

    saveToBackend();

    return () => saveToBackend.cancel();
  }, [data, stepNumber, userId, delay]);
}
```

### `useStepValidation.ts`
```tsx
import { useState } from 'react';

interface ValidationRule {
  field: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  message: string;
}

export function useStepValidation(rules: ValidationRule[]) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: any): boolean => {
    const newErrors: Record<string, string> = {};

    rules.forEach(rule => {
      const value = data[rule.field];

      // Requerido
      if (rule.required && (!value || value === '')) {
        newErrors[rule.field] = rule.message;
        return;
      }

      // Si no es requerido y está vacío, skip otras validaciones
      if (!value) return;

      // Longitud mínima
      if (rule.minLength && value.length < rule.minLength) {
        newErrors[rule.field] = rule.message;
        return;
      }

      // Longitud máxima
      if (rule.maxLength && value.length > rule.maxLength) {
        newErrors[rule.field] = rule.message;
        return;
      }

      // Patrón (regex)
      if (rule.pattern && !rule.pattern.test(value)) {
        newErrors[rule.field] = rule.message;
        return;
      }

      // Validación personalizada
      if (rule.custom && !rule.custom(value)) {
        newErrors[rule.field] = rule.message;
        return;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return { errors, validate, clearError };
}
```

---

## 5. EJEMPLO: PASO 1 (CREAR ACCESO)

### `Step1CreateAccess.tsx`
```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepWizard from '@/components/registro/StepWizard';
import { useStepValidation } from '@/hooks/useStepValidation';

export default function Step1CreateAccess() {
  const router = useRouter();
  const memberType = localStorage.getItem('registration_member_type');
  
  const { errors, validate } = useStepValidation([
    { field: 'nombre_completo', required: true, minLength: 3, message: 'Ingresa tu nombre completo' },
    { field: 'correo_electronico', required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email inválido' },
    { field: 'telefono_whatsapp', required: true, pattern: /^\+502\d{8}$/, message: 'Formato: +502XXXXXXXX' },
    { 
      field: 'contrasena', 
      required: true, 
      minLength: 8,
      custom: (value) => /[A-Z]/.test(value) && /[0-9]/.test(value),
      message: 'Mínimo 8 caracteres, 1 mayúscula y 1 número'
    }
  ]);

  const handleSubmit = async (formData: any) => {
    if (!validate(formData)) {
      return false;
    }

    try {
      const response = await fetch('/api/auth/registro/paso-1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          member_type: memberType
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear cuenta');
      }

      // Guardar token
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);

      return true;
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <StepWizard
      currentStep={1}
      totalSteps={6}
      onNext={handleSubmit}
      canSkip={false}
    >
      {({ formData, handleFieldChange }) => (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Crea tu cuenta
            </h2>
            <p className="text-gray-600">
              Información básica para acceder al sistema
            </p>
          </div>

          {/* Nombre completo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre completo *
            </label>
            <input
              type="text"
              value={formData.nombre_completo || ''}
              onChange={(e) => handleFieldChange('nombre_completo', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Juan Antonio Pérez"
            />
            {errors.nombre_completo && (
              <p className="mt-1 text-sm text-red-600">{errors.nombre_completo}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico *
            </label>
            <input
              type="email"
              value={formData.correo_electronico || ''}
              onChange={(e) => handleFieldChange('correo_electronico', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="juan@ejemplo.com"
            />
            {errors.correo_electronico && (
              <p className="mt-1 text-sm text-red-600">{errors.correo_electronico}</p>
            )}
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono WhatsApp *
            </label>
            <input
              type="tel"
              value={formData.telefono_whatsapp || ''}
              onChange={(e) => handleFieldChange('telefono_whatsapp', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="+50212345678"
            />
            {errors.telefono_whatsapp && (
              <p className="mt-1 text-sm text-red-600">{errors.telefono_whatsapp}</p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña *
            </label>
            <input
              type="password"
              value={formData.contrasena || ''}
              onChange={(e) => handleFieldChange('contrasena', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Mínimo 8 caracteres"
            />
            {errors.contrasena && (
              <p className="mt-1 text-sm text-red-600">{errors.contrasena}</p>
            )}
             <p className="mt-1 text-xs text-gray-500">
              Debe tener al menos 8 caracteres, una mayúscula y un número
            </p>
          </div>
        </div>
      )}
    </StepWizard>
  );
}
```

---

## 6. TARJETA DE PERFIL COMPLETO

### `ProfileCompletionCard.tsx`
```tsx
import Link from 'next/link';

interface Recommendation {
  title: string;
  description: string;
  action: string;
  points: number;
  stepNumber: number;
}

interface ProfileCompletionCardProps {
  completion: number;
  recommendations: Recommendation[];
}

export default function ProfileCompletionCard({
  completion,
  recommendations
}: ProfileCompletionCardProps) {
  if (completion >= 100) {
    return (
      <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-6">
        <div className="flex items-center space-x-3">
          <div className="text-4xl">🎉</div>
          <div>
            <h3 className="text-lg font-bold text-green-900">
              ¡Perfil Completo!
            </h3>
            <p className="text-sm text-green-700">
              Tu perfil está 100% completo y en revisión
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          Tu perfil está {completion}% completo
        </h3>
        <span className="text-2xl">📋</span>
      </div>

      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div
          className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full transition-all duration-500"
          style={{ width: `${completion}%` }}
        />
      </div>

      {/* Beneficios */}
      <div className="bg-primary-50 rounded-lg p-4 mb-6">
        <p className="text-sm font-medium text-primary-900 mb-2">
          Completa tu perfil para:
        </p>
        <ul className="space-y-1 text-sm text-primary-800">
          <li>✓ Aparecer en búsquedas de emprendedores</li>
          <li>✓ Recibir oportunidades de apoyo</li>
          <li>✓ Acceder a programas y convocatorias</li>
        </ul>
      </div>

      {/* Recomendaciones */}
      {recommendations.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">
            Pasos sugeridos:
          </p>
          {recommendations.slice(0, 3).map((rec, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl">💡</span>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900">
                  {rec.title}
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  {rec.description}
                </p>
              </div>
              <span className="text-xs font-bold text-primary-600">
                +{rec.points}%
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Botón CTA */}
      <Link href="/registro/continuar">
        <button className="w-full mt-4 px-4 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">
          Continuar mi perfil →
        </button>
      </Link>
    </div>
  );
}
```

---

## 7. RESPONSIVE MOBILE-FIRST

### Tailwind Config Personalizado

```js
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      // Touch-friendly sizes
      height: {
        'touch': '44px',
        'touch-lg': '52px'
      },
      minHeight: {
        'touch': '44px'
      },
      // Mobile breakpoints
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px'
      }
    }
  }
};
```

### CSS Mobile Optimizations

```css
/* globals.css */

/* Evitar zoom en iOS */
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"],
select,
textarea {
  font-size: 16px;
  -webkit-appearance: none;
}

/* Touch-friendly buttons */
button, .btn {
  min-height: 44px;
  min-width: 44px;
}

/* Smooth scroll en navegación */
html {
  scroll-behavior: smooth;
}

/* Safe area para iPhones con notch */
body {
  padding-bottom: env(safe-area-inset-bottom);
}
```

---

## 8. TESTING CONSIDERATIONS

### Unit Tests con Jest
```tsx
// __tests__/ConditionalField.test.tsx
import { render, screen } from '@testing-library/react';
import ConditionalField from '@/components/registro/fields/ConditionalField';

describe('ConditionalField', () => {
  it('muestra el contenido cuando show=true', () => {
    render(
      <ConditionalField show={true}>
        <div>Contenido visible</div>
      </ConditionalField>
    );
    
    expect(screen.getByText('Contenido visible')).toBeInTheDocument();
  });

  it('oculta el contenido cuando show=false', () => {
    render(
      <ConditionalField show={false}>
        <div>Contenido oculto</div>
      </ConditionalField>
    );
    
    expect(screen.queryByText('Contenido oculto')).not.toBeInTheDocument();
  });
});
```

---

## RESUMEN DE COMPONENTES

| Componente | Responsabilidad | Reusable |
|------------|----------------|----------|
| `StepWizard` | Contenedor principal, navegación, auto-save | ✅ |
| `ProgressBar` | Barra visual de progreso | ✅ |
| `StepNavigation` | Botones Atrás/Siguiente/Saltar | ✅ |
| `ConditionalField` | Mostrar/ocultar campos con animación | ✅ |
| `ProfileTypeCard` | Tarjeta de selección de perfil | ✅ |
| `ProfileCompletionCard` | Dashboard widget de completitud | ✅ |
| `CheckboxGroup` | Grupo de checkboxes | ✅ |
| `RadioGroup` | Grupo de radios | ✅ |
| `Step1-6` | Formularios por paso | ❌ (específicos) |

---

**Próximo**: Implementar backend controllers y probar flujo completo.
