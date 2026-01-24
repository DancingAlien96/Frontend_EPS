import Link from 'next/link';

async function fetchNoticias() {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  const res = await fetch(`${base}/noticias`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Error al cargar noticias');
  return res.json();
}

export default async function NoticiasList({ limit = 3, showAllLink = true }: { limit?: number, showAllLink?: boolean }) {
  const noticias = await fetchNoticias();
  const items = noticias.slice(0, limit);

  // Fallback: si no hay suficientes noticias, usar ejemplos estáticos del prototipo
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

  const renderItems = items.length > 0 ? items : demo.slice(0, limit);

  return (
    <section className="news-section-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="news-hero">
          <h2>Noticias</h2>
          <p className="text-gray-600">Mantente informado sobre las últimas novedades</p>
          {showAllLink && (
            <div style={{ marginTop: '10px' }}>
              <Link href="/noticias" className="text-official-blue font-semibold">Ver todas →</Link>
            </div>
          )}
        </div>

        <div className="news-grid">
          {renderItems.map((n: any) => (
            <article key={n.id_noticia} className="news-card">
              <img src={n.imagen_principal || 'https://via.placeholder.com/400x250/eeeeee/aaaaaa?text=Noticia'} alt={n.titulo} />

              <div className="news-content">
                <div className="news-date">{n.fecha_publicacion ? `📅 ${new Date(n.fecha_publicacion).toLocaleDateString('es-GT', { day: 'numeric', month: 'long', year: 'numeric' })}` : ''}</div>

                <h3>{n.titulo}</h3>
                <p>{n.resumen || (n.contenido || '').slice(0, 120)}</p>

                <a href={`/noticias/${n.id_noticia}`} className="leer-mas">Leer más →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
