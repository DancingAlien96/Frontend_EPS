'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import Link from 'next/link';

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return `📅 ${new Date(dateStr).toLocaleDateString('es-GT', { day: 'numeric', month: 'long', year: 'numeric' })}`;
}

export default function NoticiasPreview() {
  const [noticias, setNoticias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/noticias');
        setNoticias(res.data.slice(0, 3));
      } catch (err) {
        console.error('Error cargando noticias', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Demo fallback when API returns no noticias
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

  const renderNoticias = noticias.length > 0 ? noticias : demo;

  if (loading) return <div className="text-center py-6">Cargando noticias...</div>;
  if (noticias.length === 0) return null;

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="news-hero">
          <h2>Últimas Noticias</h2>
          <div style={{ marginTop: '8px' }}>
            <Link href="/noticias" className="text-official-blue font-semibold">Ver todas →</Link>
          </div>
        </div>

        <div className="news-grid">
          {renderNoticias.map(n => (
            <article key={n.id_noticia} className="news-card">
              <img src={n.imagen_principal || 'https://via.placeholder.com/400x250/eeeeee/aaaaaa?text=Noticia'} alt={n.titulo} />

              <div className="news-content">
                <div className="news-date">{formatDate(n.fecha_publicacion)}</div>

                <h3>{n.titulo}</h3>
                <p>{n.resumen || (n.contenido || '').slice(0, 120)}</p>

                <Link href={`/noticias/${n.id_noticia}`} className="leer-mas">Leer más →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
