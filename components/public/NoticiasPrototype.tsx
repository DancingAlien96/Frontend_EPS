// Server component: reproduce prototipo noticias section markup
import Link from 'next/link';

const demo = [
  {
    id_noticia: 'demo-1',
    titulo: '100 Nuevos Emprendedores se Gradúan del Programa',
    resumen: 'El Ministerio de Economía celebra la graduación de 100 emprendedores que completaron exitosamente el programa de capacitación empresarial en Chiquimula.',
    imagen_principal: 'https://via.placeholder.com/1200x675/28a745/ffffff?text=Graduación',
    fecha_publicacion: '2025-11-25'
  },
  {
    id_noticia: 'demo-2',
    titulo: 'Nueva Convocatoria de Fondos Semilla 2026',
    resumen: 'Ya están abiertas las postulaciones para acceder al Fondo Semilla 2026 con montos de hasta Q25,000 para emprendedores de todos los municipios.',
    imagen_principal: 'https://via.placeholder.com/1200x675/007bff/ffffff?text=Fondos',
    fecha_publicacion: '2025-11-20'
  },
  {
    id_noticia: 'demo-3',
    titulo: 'Historia de Éxito: De Vender en Casa a Tienda Propia',
    resumen: 'Conoce la inspiradora historia de María López, quien con apoyo del programa logró abrir su propia panadería en Esquipulas y ahora emplea a 5 personas.',
    imagen_principal: 'https://via.placeholder.com/1200x675/ff6b6b/ffffff?text=Éxito',
    fecha_publicacion: '2025-11-15'
  }
];

async function fetchNoticias() {
  try {
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
    const res = await fetch(`${base}/noticias`, { cache: 'no-store' });
    if (!res.ok) return demo;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return demo;
    return data;
  } catch (e) {
    return demo;
  }
}

export default async function NoticiasPrototype() {
  const noticias = await fetchNoticias();
  const items = noticias.slice(0, 3);

  return (
    <section className="news-section" aria-label="Sección de Noticias">
      <div style={{ padding: '60px 30px', maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: 15, color: '#333' }}>Noticias</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: 50, fontSize: '1.1rem' }}>Mantente informado sobre las últimas novedades</p>

        <div className="news-grid">
          {items.map((n: any) => (
            <div key={n.id_noticia} className="news-card">
              <img src={n.imagen_principal} alt={n.titulo} />
              <div className="news-content">
                <div className="news-date">{n.fecha_publicacion ? `📅 ${new Date(n.fecha_publicacion).toLocaleDateString('es-GT', { day: 'numeric', month: 'long', year: 'numeric' })}` : ''}</div>
                <h3>{n.titulo}</h3>
                <p>{n.resumen}</p>
                <Link href={`/noticias/${n.id_noticia}`} className="leer-mas">Leer más →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
