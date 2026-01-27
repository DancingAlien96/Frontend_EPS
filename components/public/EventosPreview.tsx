'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import Link from 'next/link';

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return `📅 ${new Date(dateStr).toLocaleDateString('es-GT', { day: 'numeric', month: 'long', year: 'numeric' })}`;
}

function formatTime(timeStr?: string) {
  if (!timeStr) return '';
  return `🕐 ${timeStr}`;
}

export default function EventosPreview() {
  const [eventos, setEventos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/eventos?estado=proximo');
        setEventos(res.data.slice(0, 3));
      } catch (err) {
        console.error('Error cargando eventos', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Demo fallback when API returns no eventos
  const demo = [
    {
      id_evento: 'demo-1',
      nombre_evento: 'Feria del Emprendedor 2026',
      descripcion: 'Evento anual donde emprendedores presentan sus productos y servicios.',
      fecha_evento: '2026-02-15',
      hora_inicio: '09:00',
      lugar: 'Parque Central de Chiquimula',
      imagen_evento: 'https://via.placeholder.com/1200x675/28a745/ffffff?text=Feria+Emprendedor',
      estado: 'proximo'
    },
    {
      id_evento: 'demo-2',
      nombre_evento: 'Taller de Marketing Digital',
      descripcion: 'Aprende estrategias efectivas de marketing digital.',
      fecha_evento: '2026-02-20',
      hora_inicio: '14:00',
      lugar: 'Centro de Capacitación Empresarial',
      imagen_evento: 'https://via.placeholder.com/1200x675/007bff/ffffff?text=Taller+Marketing',
      estado: 'proximo'
    },
    {
      id_evento: 'demo-3',
      nombre_evento: 'Networking Empresarial',
      descripcion: 'Conecta con otros emprendedores e inversionistas.',
      fecha_evento: '2026-02-25',
      hora_inicio: '16:00',
      lugar: 'Hotel Real Intercontinental',
      imagen_evento: 'https://via.placeholder.com/1200x675/ff6b6b/ffffff?text=Networking',
      estado: 'proximo'
    }
  ];

  const renderEventos = eventos.length > 0 ? eventos : demo;

  if (loading) return <div className="text-center py-6">Cargando eventos...</div>;
  if (eventos.length === 0) return null;

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="news-hero">
          <h2>Próximos Eventos</h2>
          <div style={{ marginTop: '8px' }}>
            <Link href="/eventos" className="text-official-blue font-semibold">Ver todos →</Link>
          </div>
        </div>

        <div className="news-grid">
          {renderEventos.map(e => (
            <article key={e.id_evento} className="news-card">
              <img src={e.imagen_evento || 'https://via.placeholder.com/400x250/eeeeee/aaaaaa?text=Evento'} alt={e.nombre_evento} />

              <div className="news-content">
                <div className="news-date">{formatDate(e.fecha_evento)} {formatTime(e.hora_inicio)}</div>

                <h3>{e.nombre_evento}</h3>
                <p>{e.descripcion.slice(0, 120)}...</p>
                <div style={{ marginTop: 8, fontSize: '0.9rem', color: '#666' }}>
                  📍 {e.lugar}
                </div>

                <Link href={`/eventos/${e.id_evento}`} className="leer-mas">Ver detalles →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}