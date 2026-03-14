'use client';

import { ArrowLeft, ArrowRight, SkipForward } from 'lucide-react';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
  canSkip?: boolean;
  isNextDisabled?: boolean;
  nextLabel?: string;
  loading?: boolean;
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onSkip,
  canSkip = false,
  isNextDisabled = false,
  nextLabel,
  loading = false
}: StepNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  const buttonLabel = nextLabel || (isLastStep ? 'Finalizar Registro' : 'Siguiente');

  return (
    <div className="flex items-center justify-between gap-4 pt-6 border-t border-gray-200">
      {/* Botón Atrás */}
      <button
        type="button"
        onClick={onBack}
        disabled={isFirstStep || loading}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
          transition-all disabled:opacity-50 disabled:cursor-not-allowed
          ${isFirstStep 
            ? 'bg-gray-100 text-gray-400' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }
        `}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Atrás</span>
      </button>

      {/* Botones centrales */}
      <div className="flex items-center gap-3">
        {/* Botón Saltar (solo si está permitido) */}
        {canSkip && onSkip && (
          <button
            type="button"
            onClick={onSkip}
            disabled={loading}
            className="
              flex items-center gap-2 px-4 py-3 rounded-lg
              bg-yellow-50 text-yellow-700 border border-yellow-300
              hover:bg-yellow-100 transition-all
              disabled:opacity-50 disabled:cursor-not-allowed
              text-sm font-medium
            "
          >
            <SkipForward className="w-4 h-4" />
            <span className="hidden md:inline">Saltar este paso</span>
            <span className="md:hidden">Saltar</span>
          </button>
        )}

        {/* Botón Siguiente/Finalizar */}
        <button
          type="submit"
          onClick={onNext}
          disabled={isNextDisabled || loading}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
            transition-all disabled:opacity-50 disabled:cursor-not-allowed
            ${isLastStep
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
            }
          `}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Guardando...</span>
            </>
          ) : (
            <>
              <span>{buttonLabel}</span>
              {!isLastStep && <ArrowRight className="w-5 h-5" />}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
