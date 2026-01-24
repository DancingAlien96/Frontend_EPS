'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  RadialLinearScale,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Doughnut, PolarArea, Radar } from 'react-chartjs-2';
import api from '@/lib/axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  RadialLinearScale,
  PointElement,
  LineElement
);

type NormalizedEmprendedor = {
  municipio: string;
  estado: 'Inscrito' | 'Seleccionado';
  edad: number | null;
};

const SAMPLE_EMPRENDEDORES: NormalizedEmprendedor[] = [
  { municipio: 'Chiquimula', estado: 'Inscrito', edad: 34 },
  { municipio: 'Esquipulas', estado: 'Inscrito', edad: 29 },
  { municipio: 'Jocotán', estado: 'Seleccionado', edad: 31 },
  { municipio: 'Ipala', estado: 'Inscrito', edad: 22 },
  { municipio: 'Camotán', estado: 'Seleccionado', edad: 28 },
  { municipio: 'Olopa', estado: 'Inscrito', edad: 37 },
  { municipio: 'San José La Arada', estado: 'Seleccionado', edad: 41 },
  { municipio: 'Concepción Las Minas', estado: 'Inscrito', edad: 26 },
  { municipio: 'San Jacinto', estado: 'Inscrito', edad: 33 },
  { municipio: 'Quezaltepeque', estado: 'Seleccionado', edad: 30 },
  { municipio: 'San Juan Ermita', estado: 'Seleccionado', edad: 24 },
  { municipio: 'San Juan Ermita', estado: 'Inscrito', edad: 27 },
  { municipio: 'Quezaltepeque', estado: 'Inscrito', edad: 39 },
  { municipio: 'Chiquimula', estado: 'Seleccionado', edad: 35 },
];

function calcularEdad(fecha?: string | null) {
  if (!fecha) return null;
  const d = new Date(fecha);
  if (Number.isNaN(d.getTime())) return null;
  const diff = Date.now() - d.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)));
}

function normalizarEmprendedores(data: any[]): NormalizedEmprendedor[] {
  return data.map((item) => {
    const municipio = item?.municipio?.nombre_municipio || item?.nombre_municipio || item?.municipio_nombre || 'Sin municipio';
    const estadoRaw = (item?.estado || item?.estado_perfil || item?.estatus || '').toString().toLowerCase();
    const estado: 'Inscrito' | 'Seleccionado' = estadoRaw === 'seleccionado' ? 'Seleccionado' : 'Inscrito';
    const edad = calcularEdad(item?.fecha_nacimiento || item?.fechaNacimiento);

    return { municipio, estado, edad } as NormalizedEmprendedor;
  });
}

function agruparPorMunicipio(data: NormalizedEmprendedor[]) {
  return data.reduce<Record<string, number>>((acc, item) => {
    acc[item.municipio] = (acc[item.municipio] || 0) + 1;
    return acc;
  }, {});
}

function agruparEstadoPorMunicipio(data: NormalizedEmprendedor[]) {
  const resultado: Record<string, { Inscrito: number; Seleccionado: number }> = {};
  data.forEach((item) => {
    if (!resultado[item.municipio]) {
      resultado[item.municipio] = { Inscrito: 0, Seleccionado: 0 };
    }
    resultado[item.municipio][item.estado] += 1;
  });
  return resultado;
}

function agruparPorEdad(data: NormalizedEmprendedor[]) {
  const buckets: Record<string, number> = { '<25': 0, '25-34': 0, '35-44': 0, '45-54': 0, '55+': 0 };
  data.forEach((item) => {
    if (item.edad === null) return;
    if (item.edad < 25) buckets['<25'] += 1;
    else if (item.edad < 35) buckets['25-34'] += 1;
    else if (item.edad < 45) buckets['35-44'] += 1;
    else if (item.edad < 55) buckets['45-54'] += 1;
    else buckets['55+'] += 1;
  });
  return buckets;
}

function obtenerMunicipioMasActivo(conteos: Record<string, number>) {
  return Object.entries(conteos).reduce(
    (max, [muni, count]) => (count > max.count ? { muni, count } : max),
    { muni: 'N/A', count: 0 }
  ).muni;
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base sm:text-lg font-semibold text-dark-gray">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border-l-4 border-secondary-blue">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{label}</p>
      <p className="text-3xl sm:text-4xl font-bold text-dark-gray leading-none">{value}</p>
    </div>
  );
}

function NoData({ message }: { message: string }) {
  return (
    <div className="h-full min-h-[160px] flex items-center justify-center text-sm text-gray-500">{message}</div>
  );
}

export default function Dashboard() {
  const [rawData, setRawData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMunicipio, setSelectedMunicipio] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/emprendedores', { params: { limite: 1000 } });
        if (Array.isArray(res.data)) {
          setRawData(res.data);
        }
      } catch (error) {
        console.error('Error al cargar emprendedores:', error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const normalized = useMemo(() => {
    if (rawData.length === 0) return SAMPLE_EMPRENDEDORES;
    const parsed = normalizarEmprendedores(rawData).filter((item) => item.municipio);
    return parsed.length ? parsed : SAMPLE_EMPRENDEDORES;
  }, [rawData]);

  const municipiosDisponibles = useMemo(() => {
    const set = new Set<string>();
    normalized.forEach((item) => set.add(item.municipio));
    return Array.from(set).sort();
  }, [normalized]);

  const filtrados = useMemo(() => {
    if (!selectedMunicipio) return normalized;
    return normalized.filter((item) => item.municipio === selectedMunicipio);
  }, [normalized, selectedMunicipio]);

  const conteosMunicipio = useMemo(() => agruparPorMunicipio(filtrados), [filtrados]);
  const estadoPorMunicipio = useMemo(() => agruparEstadoPorMunicipio(filtrados), [filtrados]);
  const edadBuckets = useMemo(() => agruparPorEdad(filtrados), [filtrados]);

  const total = filtrados.length;
  const inscritos = filtrados.filter((i) => i.estado === 'Inscrito').length;
  const seleccionados = filtrados.filter((i) => i.estado === 'Seleccionado').length;
  const municipioMasActivo = useMemo(() => obtenerMunicipioMasActivo(agruparPorMunicipio(normalized)), [normalized]);

  const barData = {
    labels: Object.keys(conteosMunicipio),
    datasets: [
      {
        label: 'Número de Emprendedores',
        data: Object.values(conteosMunicipio),
        backgroundColor: '#5ba4ff',
        borderRadius: 6,
      }
    ]
  };

  const doughnutData = {
    labels: ['Inscritos', 'Seleccionados'],
    datasets: [
      {
        data: [inscritos, seleccionados],
        backgroundColor: ['#ffd700', '#5ca36d'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };

  const radarLabels = Object.keys(estadoPorMunicipio);
  const radarData = {
    labels: radarLabels,
    datasets: [
      {
        label: 'Inscritos',
        data: radarLabels.map((m) => estadoPorMunicipio[m]?.Inscrito || 0),
        backgroundColor: 'rgba(0, 61, 122, 0.15)',
        borderColor: '#003d7a',
        borderWidth: 2,
        pointBackgroundColor: '#003d7a',
      },
      {
        label: 'Seleccionados',
        data: radarLabels.map((m) => estadoPorMunicipio[m]?.Seleccionado || 0),
        backgroundColor: 'rgba(0, 123, 255, 0.12)',
        borderColor: '#007bff',
        borderWidth: 2,
        pointBackgroundColor: '#007bff',
      }
    ]
  };

  const polarData = {
    labels: Object.keys(edadBuckets),
    datasets: [
      {
        data: Object.values(edadBuckets),
        backgroundColor: ['#e7f1ff', '#c9dfff', '#9cc4ff', '#6ea8ff', '#418cff'],
        borderWidth: 1,
        borderColor: '#ffffff'
      }
    ]
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-72">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-official-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-dark-gray mb-2">Dashboard Analítico</h1>
        <p className="text-gray-500 text-sm sm:text-base">Visión general de emprendedores por municipio y estado.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white border border-gray-100 shadow-sm rounded-xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <label className="text-sm font-semibold text-gray-700">Filtrar por municipio:</label>
          <div className="flex flex-wrap gap-3 items-center">
            <select
              value={selectedMunicipio}
              onChange={(e) => setSelectedMunicipio(e.target.value)}
              className="min-w-[220px] px-3 py-2 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-official-blue/40"
            >
              <option value="">Todos los municipios</option>
              {municipiosDisponibles.map((muni) => (
                <option key={muni} value={muni}>{muni}</option>
              ))}
            </select>
            <span className="inline-flex items-center bg-secondary-blue text-white text-sm font-semibold px-3 py-2 rounded-full shadow-sm">
              {total} registros
            </span>
            <button
              onClick={() => setSelectedMunicipio('')}
              className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        <StatCard label="Total Emprendedores" value={normalized.length} />
        <StatCard label="Inscritos" value={inscritos} />
        <StatCard label="Seleccionados" value={seleccionados} />
        <StatCard label="Municipio más activo" value={municipioMasActivo} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <ChartCard title="Emprendedores por Municipio">
          <div className="h-[280px] sm:h-[320px]">
            {barData.labels.length === 0 ? (
              <NoData message="Sin datos de municipios" />
            ) : (
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    title: { display: false },
                  },
                  scales: {
                    x: { ticks: { font: { size: 12 } } },
                    y: { beginAtZero: true, ticks: { stepSize: 1 } },
                  },
                }}
              />
            )}
          </div>
        </ChartCard>

        <ChartCard title="Distribución: Inscritos vs. Seleccionados">
          <div className="h-[260px] sm:h-[300px] flex items-center justify-center">
            {total === 0 ? (
              <NoData message="Sin datos de inscripción" />
            ) : (
              <Doughnut
                data={doughnutData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'bottom' as const },
                  },
                  cutout: '55%',
                }}
              />
            )}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <ChartCard title="Perfil por Municipio (Radar)">
          <div className="h-[320px] sm:h-[360px]">
            {radarLabels.length === 0 ? (
              <NoData message="Sin datos para el radar" />
            ) : (
              <Radar
                data={radarData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'bottom' as const },
                  },
                  scales: {
                    r: {
                      beginAtZero: true,
                      ticks: { stepSize: 1, display: false },
                      grid: { color: '#e5e7eb' },
                      angleLines: { color: '#e5e7eb' },
                    }
                  }
                }}
              />
            )}
          </div>
        </ChartCard>

        <ChartCard title="Distribución por Edad (Polar)">
          <div className="h-[320px] sm:h-[360px] flex items-center justify-center">
            {Object.values(edadBuckets).every((v) => v === 0) ? (
              <NoData message="Sin datos de edades" />
            ) : (
              <PolarArea
                data={polarData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'bottom' as const },
                  },
                }}
              />
            )}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
