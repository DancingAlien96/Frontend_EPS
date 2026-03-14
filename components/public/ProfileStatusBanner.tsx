'use client';

import { useEffect, useState } from 'react';
import { FiClock, FiCheckCircle, FiXCircle, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import api from '@/lib/axios';

interface ProfileStatusBannerProps {
  userId?: number;
}

interface UserStatus {
  id: number;
  email: string;
  nombre_completo: string;
  member_type: string;
  registration_completed: boolean;
  approval_status: 'pending' | 'approved' | 'rejected';
  rejection_reason?: string;
  completion_percentage: number;
  reviewed_at?: string;
  created_at: string;
}

export default function ProfileStatusBanner({ userId }: ProfileStatusBannerProps) {
  const [status, setStatus] = useState<UserStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        const response = await api.get('/registrationStatus/status');
        setStatus(response.data);
      } catch (err: any) {
        console.error('Error al obtener estado del perfil:', err);
        setError(err.response?.data?.error || 'Error al cargar estado');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [userId]);

  if (loading) {
    return (
      <div className="bg-gray-50 border-l-4 border-gray-300 p-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error || !status) {
    return null; // No mostrar nada si hay error
  }

  // Perfil incompleto
  if (!status.registration_completed) {
    return (
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg shadow-sm">
        <div className="flex items-start gap-3">
          <FiAlertCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <p className="text-blue-800 font-semibold mb-1">
              📝 Completa tu perfil para aparecer en el directorio
            </p>
            <p className="text-sm text-blue-700 mb-2">
              Tu perfil está incompleto. Completa todos los pasos para que un administrador pueda verificarlo.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-blue-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${status.completion_percentage}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-blue-700">
                {status.completion_percentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Perfil completo - PENDIENTE de revisión
  if (status.approval_status === 'pending') {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
        <div className="flex items-start gap-3">
          <FiClock className="text-yellow-600 flex-shrink-0 mt-0.5 animate-pulse" size={20} />
          <div className="flex-1">
            <p className="text-yellow-800 font-semibold mb-1">
              ⏳ Tu perfil está en revisión
            </p>
            <p className="text-sm text-yellow-700 mb-2">
              Tu perfil está completo y será revisado por un administrador pronto. 
              Recibirás una notificación cuando sea verificado.
            </p>
            <div className="flex items-center gap-4 text-xs text-yellow-600">
              <span>
                📅 Enviado: {new Date(status.created_at).toLocaleDateString('es-GT')}
              </span>
              <span>
                ⏱️ Hace {Math.floor((Date.now() - new Date(status.created_at).getTime()) / (1000 * 60 * 60 * 24))} días
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Perfil APROBADO
  if (status.approval_status === 'approved') {
    return (
      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg shadow-sm">
        <div className="flex items-start gap-3">
          <FiCheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <p className="text-green-800 font-semibold mb-1">
              ✅ Perfil Verificado
            </p>
            <p className="text-sm text-green-700 mb-2">
              Tu perfil ha sido verificado y está visible en el directorio público de emprendedores.
            </p>
            {status.reviewed_at && (
              <p className="text-xs text-green-600">
                🎉 Aprobado el: {new Date(status.reviewed_at).toLocaleDateString('es-GT', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Perfil RECHAZADO
  if (status.approval_status === 'rejected') {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg shadow-sm">
        <div className="flex items-start gap-3">
          <FiXCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <p className="text-red-800 font-semibold mb-1">
              🚫 Perfil No Aprobado
            </p>
            {status.rejection_reason ? (
              <div className="bg-red-100 border border-red-200 rounded-lg p-3 mb-3">
                <p className="text-sm text-red-800 font-medium mb-1">
                  Motivo del rechazo:
                </p>
                <p className="text-sm text-red-700">
                  {status.rejection_reason}
                </p>
              </div>
            ) : (
              <p className="text-sm text-red-700 mb-3">
                Tu perfil no cumple con los requisitos necesarios. 
                Contacta al administrador para más información.
              </p>
            )}
            
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => window.location.href = '/perfil/editar'}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <FiRefreshCw size={16} />
                Editar y Volver a Enviar
              </button>
              <a 
                href="mailto:admin@sistema.com"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded-lg transition-colors border border-red-300"
              >
                📧 Contactar Administrador
              </a>
            </div>

            {status.reviewed_at && (
              <p className="text-xs text-red-600 mt-3">
                Revisado el: {new Date(status.reviewed_at).toLocaleDateString('es-GT')}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
