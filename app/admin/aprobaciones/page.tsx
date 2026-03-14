'use client';

import { useState, useEffect } from 'react';
import { FiUser, FiCheckCircle, FiXCircle, FiClock, FiEye, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';
import api from '@/lib/axios';

interface PendingUser {
  id: number;
  email: string;
  nombre_completo: string;
  telefono_whatsapp: string;
  member_type: string;
  approval_status: string;
  created_at: string;
  dias_esperando: number;
  registration_progress: {
    completion_percentage: number;
  };
  profile?: {
    nombre_emprendimiento?: string;
    nombre_entidad?: string;
    descripcion_corta?: string;
    descripcion_mision?: string;
    logo_url?: string;
  };
}

export default function AprobacionesPage() {
  const [users, setUsers] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchPendingUsers();
  }, [filter, page]);

  const fetchPendingUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/registrationStatus/pending?status=${filter}&page=${page}&limit=10`);
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedUser) return;

    try {
      setActionLoading(true);
      await api.post(`/registrationStatus/approve/${selectedUser.id}`);
      alert('✅ Perfil aprobado exitosamente');
      setShowModal(false);
      fetchPendingUsers();
    } catch (error: any) {
      alert('❌ Error: ' + (error.response?.data?.error || 'No se pudo aprobar'));
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedUser || !rejectionReason.trim()) {
      alert('Debes proporcionar un motivo de rechazo');
      return;
    }

    try {
      setActionLoading(true);
      await api.post(`/registrationStatus/reject/${selectedUser.id}`, {
        rejection_reason: rejectionReason.trim()
      });
      alert('🚫 Perfil rechazado');
      setShowModal(false);
      setRejectionReason('');
      fetchPendingUsers();
    } catch (error: any) {
      alert('❌ Error: ' + (error.response?.data?.error || 'No se pudo rechazar'));
    } finally {
      setActionLoading(false);
    }
  };

  const openModal = (user: PendingUser, action: 'approve' | 'reject') => {
    setSelectedUser(user);
    setActionType(action);
    setShowModal(true);
  };

  const getDisplayName = (user: PendingUser) => {
    if (user.profile?.nombre_emprendimiento) return user.profile.nombre_emprendimiento;
    if (user.profile?.nombre_entidad) return user.profile.nombre_entidad;
    return user.nombre_completo;
  };

  const getMemberTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      emprendimiento: '👤 Emprendimiento',
      empresa: '🏢 Empresa',
      organizacion: '🏛️ Organización',
      institucion: '🏛️ Institución',
      consumidor: '🛒 Consumidor'
    };
    return labels[type] || type;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Verificación de Perfiles
        </h1>
        <p className="text-gray-600">
          Revisa y aprueba los perfiles de nuevos usuarios
        </p>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setFilter('pending'); setPage(1); }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'pending'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <FiClock className="inline mr-2" />
          Pendientes
        </button>
        <button
          onClick={() => { setFilter('approved'); setPage(1); }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'approved'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <FiCheckCircle className="inline mr-2" />
          Aprobados
        </button>
        <button
          onClick={() => { setFilter('rejected'); setPage(1); }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'rejected'
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <FiXCircle className="inline mr-2" />
          Rechazados
        </button>
      </div>

      {/* Lista de usuarios */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Cargando perfiles...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FiUser className="mx-auto text-gray-400" size={48} />
          <p className="text-gray-500 mt-4">No hay perfiles {filter === 'pending' ? 'pendientes' : filter === 'approved' ? 'aprobados' : 'rechazados'}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                {/* Info del usuario */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {getDisplayName(user).charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {getDisplayName(user)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {getMemberTypeLabel(user.member_type)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiMail size={16} />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiPhone size={16} />
                      <span>{user.telefono_whatsapp}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiCalendar size={16} />
                      <span>Registrado hace {user.dias_esperando} días</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiCheckCircle size={16} />
                      <span>Completitud: {user.registration_progress.completion_percentage}%</span>
                    </div>
                  </div>

                  {user.profile?.descripcion_corta && (
                    <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                      {user.profile.descripcion_corta}
                    </p>
                  )}
                  {user.profile?.descripcion_mision && (
                    <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                      {user.profile.descripcion_mision}
                    </p>
                  )}
                </div>

                {/* Acciones */}
                {filter === 'pending' && (
                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => openModal(user, 'approve')}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <FiCheckCircle size={18} />
                      Aprobar
                    </button>
                    <button
                      onClick={() => openModal(user, 'reject')}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <FiXCircle size={18} />
                      Rechazar
                    </button>
                    <a
                      href={`/admin/usuarios/${user.id}`}
                      className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2 text-center"
                    >
                      <FiEye size={18} />
                      Ver Detalle
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-4 py-2">
            Página {page} de {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Modal de confirmación */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">
              {actionType === 'approve' ? '✅ Aprobar Perfil' : '🚫 Rechazar Perfil'}
            </h3>
            
            <p className="text-gray-700 mb-4">
              Usuario: <strong>{getDisplayName(selectedUser)}</strong>
            </p>

            {actionType === 'reject' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motivo del rechazo: *
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={4}
                  placeholder="Ej: Información incompleta, documentos no válidos, etc."
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setShowModal(false); setRejectionReason(''); }}
                disabled={actionLoading}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={actionType === 'approve' ? handleApprove : handleReject}
                disabled={actionLoading || (actionType === 'reject' && !rejectionReason.trim())}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                  actionType === 'approve'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {actionLoading ? 'Procesando...' : actionType === 'approve' ? 'Aprobar' : 'Rechazar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
