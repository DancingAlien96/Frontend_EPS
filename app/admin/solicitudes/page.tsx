'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { Search, Eye, CheckCircle2, XCircle, Users, Briefcase, Building2, TrendingUp, Clock, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Solicitud {
  id: number;
  email: string;
  nombre_completo: string;
  telefono_whatsapp: string;
  member_type: string;
  numero_identificacion?: string;
  fecha_nacimiento?: string;
  municipio?: string;
  departamento?: string;
  created_at: string;
  completion_percentage: number;
  completed_at?: string;
  perfil?: {
    nombre_emprendimiento?: string;
    sector?: string;
    etapa_negocio?: string;
    fecha_inicio?: string;
    logo_url?: string;
    registro_SAT?: boolean;
    tiene_patente?: boolean;
    nit?: string;
    nombre_entidad?: string;
    tipo_entidad?: string;
    ambito_geografico?: any;
    puede_publicar_programas?: boolean;
    puede_publicar_eventos?: boolean;
    intereses?: any;
  };
}

export default function SolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('');
  const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      const response = await api.get('/admin/solicitudes-pendientes');
      setSolicitudes(response.data.solicitudes || []);
    } catch (error) {
      console.error('Error al cargar solicitudes:', error);
      setSolicitudes([]);
    } finally {
      setLoading(false);
    }
  };

  const aprobarSolicitud = async (id: number) => {
    if (!confirm('¿Estás seguro de aprobar esta solicitud?')) return;
    
    setActionLoading(true);
    try {
      await api.post(`/admin/aprobar-usuario/${id}`);
      alert('Solicitud aprobada exitosamente');
      fetchSolicitudes();
      setShowDetailModal(false);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Error al aprobar solicitud');
    } finally {
      setActionLoading(false);
    }
  };

  const rechazarSolicitud = async (id: number) => {
    const motivo = prompt('Ingresa el motivo del rechazo (opcional):');
    if (motivo === null) return;
    
    setActionLoading(true);
    try {
      await api.post(`/admin/rechazar-usuario/${id}`, { motivo });
      alert('Solicitud rechazada');
      fetchSolicitudes();
      setShowDetailModal(false);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Error al rechazar solicitud');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredSolicitudes = solicitudes.filter(sol => {
    const matchesSearch = sol.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
               sol.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
               sol.perfil?.nombre_emprendimiento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               sol.perfil?.nombre_entidad?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = !filterTipo || sol.member_type === filterTipo;
    return matchesSearch && matchesTipo;
  });

  const getTipoInfo = (tipo: string) => {
    const tipos = {
      emprendimiento: { label: 'Emprendimiento', icon: Briefcase, variant: 'default' as const },
      empresa: { label: 'Empresa', icon: Building2, variant: 'info' as const },
      organizacion: { label: 'Organización', icon: Users, variant: 'success' as const },
      institucion: { label: 'Institución', icon: Building2, variant: 'secondary' as const },
      consumidor: { label: 'Consumidor', icon: Users, variant: 'outline' as const }
    };
    return tipos[tipo as keyof typeof tipos] || tipos.consumidor;
  };

  const stats = [
    {
      title: 'Total Pendientes',
      value: solicitudes.length,
      icon: Clock,
      description: 'Solicitudes sin revisar',
      trend: '+12% vs mes pasado'
    },
    {
      title: 'Emprendimientos',
      value: solicitudes.filter(s => s.member_type === 'emprendimiento' || s.member_type === 'empresa').length,
      icon: Briefcase,
      description: 'Negocios registrados',
      trend: 'Alta demanda'
    },
    {
      title: 'Organizaciones',
      value: solicitudes.filter(s => s.member_type === 'organizacion' || s.member_type === 'institucion').length,
      icon: Building2,
      description: 'Entidades registradas',
      trend: '+5 esta semana'
    },
    {
      title: 'Completitud Promedio',
      value: `${Math.round(solicitudes.reduce((acc, s) => acc + s.completion_percentage, 0) / (solicitudes.length || 1))}%`,
      icon: TrendingUp,
      description: 'Nivel de avance',
      trend: 'Muy bueno'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="text-gray-600">Cargando solicitudes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>Administración</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">Solicitudes Pendientes</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Solicitudes de Registro</h1>
        <p className="text-gray-600">Revisa y aprueba las solicitudes de nuevos miembros del ecosistema</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">
                {stat.description}
              </p>
              <p className="text-xs text-green-600 mt-2 font-medium">
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros de Búsqueda</CardTitle>
          <CardDescription>Encuentra solicitudes específicas rápidamente</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o negocio..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
            >
              <option value="">Todos los tipos</option>
              <option value="emprendimiento">Emprendimiento</option>
              <option value="empresa">Empresa</option>
              <option value="organizacion">Organización</option>
              <option value="institucion">Institución</option>
              <option value="consumidor">Consumidor</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Solicitudes List */}
      {filteredSolicitudes.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center space-y-3">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">No hay solicitudes pendientes</h3>
              <p className="text-gray-500">Las nuevas solicitudes aparecerán aquí</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredSolicitudes.map((solicitud) => {
            const tipoInfo = getTipoInfo(solicitud.member_type);
            const TipoIcon = tipoInfo.icon;
            
            return (
              <Card key={solicitud.id} className="hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        {solicitud.nombre_completo.charAt(0).toUpperCase()}
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{solicitud.nombre_completo}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {solicitud.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {solicitud.telefono_whatsapp}
                              </span>
                              {solicitud.municipio && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {solicitud.municipio}
                                </span>
                              )}
                            </div>
                          </div>
                          <Badge variant={tipoInfo.variant} className="flex items-center gap-1">
                            <TipoIcon className="w-3 h-3" />
                            {tipoInfo.label}
                          </Badge>
                        </div>

                        {(solicitud.perfil?.nombre_emprendimiento || solicitud.perfil?.nombre_entidad) && (
                          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                            <p className="text-xs text-gray-500 font-medium">
                              {solicitud.member_type === 'emprendimiento' || solicitud.member_type === 'empresa' ? 'Emprendimiento' : 'Entidad'}
                            </p>
                            <p className="font-medium text-gray-900">
                              {solicitud.perfil?.nombre_emprendimiento || solicitud.perfil?.nombre_entidad}
                            </p>
                            {solicitud.perfil?.sector && (
                              <p className="text-sm text-gray-600">Sector: {solicitud.perfil.sector}</p>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 text-gray-500">
                              <Calendar className="w-4 h-4" />
                              {new Date(solicitud.created_at).toLocaleDateString('es-GT', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                                  style={{ width: `${solicitud.completion_percentage}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-700">
                                {solicitud.completion_percentage}%
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedSolicitud(solicitud);
                                setShowDetailModal(true);
                              }}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Ver Detalles
                            </Button>
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => aprobarSolicitud(solicitud.id)}
                              disabled={actionLoading}
                            >
                              <CheckCircle2 className="w-4 h-4 mr-1" />
                              Aprobar
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => rechazarSolicitud(solicitud.id)}
                              disabled={actionLoading}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedSolicitud && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">Detalle de Solicitud</CardTitle>
                  <CardDescription className="mt-1">
                    Información completa del solicitante
                  </CardDescription>
                </div>
                <Badge variant={getTipoInfo(selectedSolicitud.member_type).variant}>
                  {getTipoInfo(selectedSolicitud.member_type).label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Información Personal
                  </h3>
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                    <div>
                      <p className="text-sm text-gray-500">Nombre Completo</p>
                      <p className="font-medium text-gray-900">{selectedSolicitud.nombre_completo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{selectedSolicitud.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Teléfono</p>
                      <p className="font-medium text-gray-900">{selectedSolicitud.telefono_whatsapp}</p>
                    </div>
                    {selectedSolicitud.municipio && (
                      <div>
                        <p className="text-sm text-gray-500">Ubicación</p>
                        <p className="font-medium text-gray-900">{selectedSolicitud.municipio}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {(selectedSolicitud.member_type === 'emprendimiento' || selectedSolicitud.member_type === 'empresa') && selectedSolicitud.perfil && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Información del Emprendimiento
                    </h3>
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                      <div>
                        <p className="text-sm text-gray-500">Nombre</p>
                        <p className="font-medium text-gray-900">{selectedSolicitud.perfil.nombre_emprendimiento}</p>
                      </div>
                      {selectedSolicitud.perfil.sector && (
                        <div>
                          <p className="text-sm text-gray-500">Sector</p>
                          <p className="font-medium text-gray-900">{selectedSolicitud.perfil.sector}</p>
                        </div>
                      )}
                      {selectedSolicitud.perfil.etapa_negocio && (
                        <div>
                          <p className="text-sm text-gray-500">Etapa</p>
                          <Badge variant="secondary">{selectedSolicitud.perfil.etapa_negocio}</Badge>
                        </div>
                      )}
                      {selectedSolicitud.perfil.registro_SAT !== undefined && (
                        <div>
                          <p className="text-sm text-gray-500">Registro SAT</p>
                          <Badge variant={selectedSolicitud.perfil.registro_SAT ? "success" : "outline"}>
                            {selectedSolicitud.perfil.registro_SAT ? 'Sí' : 'No'}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {(selectedSolicitud.member_type === 'organizacion' || selectedSolicitud.member_type === 'institucion') && selectedSolicitud.perfil && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Información de la Organización
                    </h3>
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                      <div>
                        <p className="text-sm text-gray-500">Nombre</p>
                        <p className="font-medium text-gray-900">{selectedSolicitud.perfil.nombre_entidad}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tipo</p>
                        <Badge variant="secondary">{selectedSolicitud.perfil.tipo_entidad}</Badge>
                      </div>
                      {selectedSolicitud.perfil.puede_publicar_programas && (
                        <div className="col-span-2">
                          <Badge variant="success">✓ Puede publicar programas</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Progreso del Registro
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Completitud</span>
                      <span className="font-bold text-gray-900">{selectedSolicitud.completion_percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all"
                        style={{ width: `${selectedSolicitud.completion_percentage}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <p className="text-sm text-gray-500">Completado el</p>
                        <p className="font-medium text-gray-900">
                          {selectedSolicitud.completed_at 
                            ? new Date(selectedSolicitud.completed_at).toLocaleString('es-GT') 
                            : 'Pendiente'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Registrado el</p>
                        <p className="font-medium text-gray-900">
                          {new Date(selectedSolicitud.created_at).toLocaleString('es-GT')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="border-t p-6 flex gap-3 justify-end bg-gray-50">
              <Button
                variant="outline"
                onClick={() => setShowDetailModal(false)}
                disabled={actionLoading}
              >
                Cerrar
              </Button>
              <Button
                variant="destructive"
                onClick={() => rechazarSolicitud(selectedSolicitud.id)}
                disabled={actionLoading}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Rechazar
              </Button>
              <Button
                variant="success"
                onClick={() => aprobarSolicitud(selectedSolicitud.id)}
                disabled={actionLoading}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Aprobar Solicitud
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
