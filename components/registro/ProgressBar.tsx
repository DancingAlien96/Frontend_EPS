'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: boolean[];
}

export default function ProgressBar({ currentStep, totalSteps, completedSteps }: ProgressBarProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
          const isCompleted = completedSteps[step - 1];
          const isCurrent = step === currentStep;
          const isAccessible = step <= currentStep;

          return (
            <div key={step} className="flex items-center flex-1">
              {/* Círculo del paso */}
              <div className="flex flex-col items-center">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                    backgroundColor: isCompleted 
                      ? '#10b981' 
                      : isCurrent 
                      ? '#3b82f6' 
                      : isAccessible
                      ? '#e5e7eb'
                      : '#f3f4f6'
                  }}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    font-bold text-white transition-all
                    ${isCompleted ? 'bg-green-500' : ''}
                    ${isCurrent ? 'bg-blue-500 ring-4 ring-blue-200' : ''}
                    ${!isCompleted && !isCurrent && isAccessible ? 'bg-gray-300 text-gray-600' : ''}
                    ${!isAccessible ? 'bg-gray-100 text-gray-400' : ''}
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span className="text-sm">{step}</span>
                  )}
                </motion.div>
                
                {/* Etiqueta del paso (opcional, solo en pantallas grandes) */}
                <span className="hidden md:block text-xs mt-2 text-gray-600 font-medium">
                  Paso {step}
                </span>
              </div>

              {/* Línea conectora */}
              {step < totalSteps && (
                <div className="flex-1 h-1 mx-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={false}
                    animate={{
                      width: isCompleted ? '100%' : '0%'
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-green-500"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Indicador de progreso textual */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Paso {currentStep} de {totalSteps}
          {' - '}
          <span className="font-semibold text-blue-600">
            {Math.round((completedSteps.filter(Boolean).length / totalSteps) * 100)}% completado
          </span>
        </p>
      </div>
    </div>
  );
}
