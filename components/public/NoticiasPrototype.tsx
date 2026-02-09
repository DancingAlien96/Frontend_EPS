// Server component: reproduce prototipo noticias section markup
'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Noticia destacada principal
const noticiaDestacada = {
  id_noticia: 'maria-pacheco-emprendedora',
  titulo: 'Innovación en el Café: Jóvenes emprendedores transforman la industria local',
  resumen: 'Una nueva generación de caficultores en Chiquimula está revolucionando la industria agropecuaria y artesanal del café artesanal. Con tecnología sostenible y visión emprendedora, están posicionando a la región en mercados internacionales.',
  contenido: 'Inspirados por la historia de María Pacheco, emprendedora social guatemalteca fundadora de Wakami, jóvenes de Chiquimula están creando modelos de negocio incluyentes que benefician a más de 200 familias rurales. Su enfoque en comercio justo y sostenibilidad les ha permitido exportar a 15 países.',
  imagen_principal: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=80',
  fecha_publicacion: '2026-02-05',
  categoria: 'Historias'
};

const demo = [
  {
    id_noticia: 'demo-1',
    titulo: 'Productores de cítricos impulsan crecimiento con nueva ruta de miel',
    resumen: 'Cooperativa de apicultores en Chiquimula duplica producción implementando técnicas innovadoras y accediendo a nuevos mercados regionales.',
    imagen_principal: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80',
    fecha_publicacion: '2026-02-03'
  },
  {
    id_noticia: 'demo-2',
    titulo: 'Gran feria del emprendedor: Un éxito rotundo en ventas',
    resumen: 'Más de 80 emprendedores locales generaron ventas superiores a Q500,000 en el evento anual que atrajo a visitantes de toda la región.',
    imagen_principal: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    fecha_publicacion: '2026-02-01'
  },
  {
    id_noticia: 'demo-3',
    titulo: 'Textiles de brocados conquistan pasarelas en Europa',
    resumen: 'Artesanas textiles de Chiquimula llevan sus creaciones a ferias internacionales en España y Francia, consolidando presencia en mercados europeos.',
    imagen_principal: 'https://images.unsplash.com/photo-1558769132-cb1aea3c7b2d?w=800&q=80',
    fecha_publicacion: '2026-01-28'
  },
  {
    id_noticia: 'demo-4',
    titulo: 'Centro de innovación inaugura laboratorio para startups',
    resumen: 'Nuevo espacio equipado con tecnología de punta permitirá a emprendedores desarrollar prototipos y validar ideas de negocio.',
    imagen_principal: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    fecha_publicacion: '2026-01-25'
  },
  {
    id_noticia: 'demo-5',
    titulo: 'De un puesto ambulante a un imperio textil',
    resumen: 'Historia de superación de emprendedor que inició vendiendo ropa usada y ahora lidera una cadena de tiendas con más de 20 empleados.',
    imagen_principal: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    fecha_publicacion: '2026-01-20'
  }
];

export default function NoticiasPrototype() {
  const [noticiasSecundarias, setNoticiasSecundarias] = useState(demo);

  useEffect(() => {
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

    fetchNoticias().then(noticias => {
      setNoticiasSecundarias(noticias.length > 0 ? noticias.slice(0, 5) : demo);
    });
  }, []);

  return (
    <section className="news-section" aria-label="Sección de Noticias">
      {/* Noticia Principal - Hero */}
      <div className="relative h-[600px] w-full overflow-hidden rounded-b-4xl">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('${noticiaDestacada.imagen_principal}')`,
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-16">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-yellow-500 text-black text-xs font-bold uppercase tracking-wide rounded-2xl mb-4">
              {noticiaDestacada.categoria}
            </span>
            <p className="text-white/90 text-sm mb-3 flex items-center gap-2">
              <span>📅</span>
              {new Date(noticiaDestacada.fecha_publicacion).toLocaleDateString('es-GT', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
              {noticiaDestacada.titulo}
            </h1>
            <p className="text-white/95 text-lg mb-6 leading-relaxed">
              {noticiaDestacada.resumen}
            </p>
            <Link 
              href={`/noticias/${noticiaDestacada.id_noticia}`}
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-all shadow-elegant-lg hover:shadow-elegant-xl"
            >
              Leer historia completa →
            </Link>
          </div>
        </div>
      </div>

      {/* Navegación de categorías */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-8 py-4 overflow-x-auto">
            {['Inicio', 'Historias', 'Eventos', 'Programas', 'Tendencia', 'Archivos'].map((cat) => (
              <button
                key={cat}
                className={`text-sm font-medium whitespace-nowrap pb-2 border-b-2 transition-colors ${
                  cat === 'Inicio' 
                    ? 'text-[#003d7a] border-[#003d7a]' 
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Noticias Secundarias */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {noticiasSecundarias.map((noticia: any) => (
            <motion.article 
              key={noticia.id_noticia}
              className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group"
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={noticia.imagen_principal} 
                  alt={noticia.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-500 mb-2">
                  {noticia.fecha_publicacion ? new Date(noticia.fecha_publicacion).toLocaleDateString('es-GT', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  }) : ''}
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#003d7a] transition-colors">
                  {noticia.titulo}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {noticia.resumen}
                </p>
                <Link 
                  href={`/noticias/${noticia.id_noticia}`}
                  className="text-[#003d7a] font-semibold text-sm hover:underline inline-flex items-center gap-1"
                >
                  Leer más →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Botón Ver Más */}
        <div className="text-center mt-12">
          <Link
            href="/noticias/archivo"
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-900 px-8 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition-all shadow-elegant hover:shadow-elegant-lg"
          >
            Ver todas las noticias
          </Link>
        </div>
      </div>

      {/* Sidebar lateral - Más Noticias */}
      <aside className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-serif font-bold mb-8">De un puesto ambulante a un imperio textil</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Descubre cómo María González convirtió su pequeño puesto de ropa usada en una exitosa cadena de tiendas. 
            Su historia inspira a emprendedores de toda la región a perseguir sus sueños con determinación.
          </p>
          <Link
            href="/noticias/historia-maria-gonzalez"
            className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-2xl font-semibold hover:bg-yellow-400 transition-all shadow-elegant-lg hover:shadow-elegant-xl"
          >
            Leer historia completa
          </Link>
        </div>
      </aside>
    </section>
  );
}
