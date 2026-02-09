// Server component: reproduce prototipo eventos section markup
import Link from 'next/link';

const demo = [
  {
    id_evento: 'demo-1',
    nombre_evento: 'Feria del Emprendedor 2026',
    descripcion: 'Evento anual donde emprendedores presentan sus productos y servicios. Una oportunidad única para networking y ventas.',
    fecha_evento: '2026-02-15',
    hora_inicio: '09:00',
    hora_fin: '17:00',
    lugar: 'Parque Central de Chiquimula',
    tipo_evento: 'feria',
    imagen_evento: 'https://via.placeholder.com/1200x675/28a745/ffffff?text=Feria+Emprendedor',
    estado: 'proximo'
  },
  {
    id_evento: 'demo-2',
    nombre_evento: 'Taller de Marketing Digital',
    descripcion: 'Aprende estrategias efectivas de marketing digital para promocionar tu emprendimiento en redes sociales.',
    fecha_evento: '2026-02-20',
    hora_inicio: '14:00',
    hora_fin: '18:00',
    lugar: 'Centro de Capacitación Empresarial',
    tipo_evento: 'taller',
    imagen_evento: 'https://via.placeholder.com/1200x675/007bff/ffffff?text=Taller+Marketing',
    estado: 'proximo'
  },
  {
    id_evento: 'demo-3',
    nombre_evento: 'Networking Empresarial',
    descripcion: 'Conecta con otros emprendedores, inversionistas y proveedores en un ambiente profesional.',
    fecha_evento: '2026-02-25',
    hora_inicio: '16:00',
    hora_fin: '20:00',
    lugar: 'Hotel Real Intercontinental',
    tipo_evento: 'networking',
    imagen_evento: 'https://via.placeholder.com/1200x675/ff6b6b/ffffff?text=Networking',
    estado: 'proximo'
  }
];

async function fetchEventos() {
  try {
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
    const res = await fetch(`${base}/eventos?estado=proximo`, { cache: 'no-store' });
    if (!res.ok) return demo;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return demo;
    return data;
  } catch (e) {
    return demo;
  }
}

export default async function EventosPrototype() {
  const eventos = await fetchEventos();
  const items = eventos.slice(0, 6); // Show more events

  return (
    <section className="news-section" aria-label="Sección de Eventos">
      <div style={{ padding: '60px 30px', maxWidth: 1200, margin: '0 auto' }}>
        <h1 className="font-serif" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: 15, color: '#333' }}>Próximos Eventos</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: 50, fontSize: '1.1rem' }}>Descubre los eventos próximos y inscríbete</p>

        <div className="news-grid">
          {items.map((e: any) => (
            <div key={e.id_evento} className="news-card rounded-3xl shadow-card hover:shadow-card-hover transition-shadow">
              <img src={e.imagen_evento || 'https://via.placeholder.com/400x250/eeeeee/aaaaaa?text=Evento'} alt={e.nombre_evento} />
              <div className="news-content">
                <div className="news-date">
                  📅 {e.fecha_evento ? new Date(e.fecha_evento).toLocaleDateString('es-GT', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                  {e.hora_inicio && ` • 🕐 ${e.hora_inicio}`}
                </div>
                <h3 className="font-serif">{e.nombre_evento}</h3>
                <p>{e.descripcion.slice(0, 120)}...</p>
                <div style={{ marginTop: 10, fontSize: '0.9rem', color: '#666' }}>
                  📍 {e.lugar}
                </div>
                <Link href={`/eventos/${e.id_evento}`} className="leer-mas rounded-2xl">Ver detalles →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}