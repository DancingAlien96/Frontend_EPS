async function fetchNoticia(id: string) {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  const res = await fetch(`${base}/noticias/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Noticia no encontrada');
  }
  return res.json();
}

export default async function NoticiaDetail({ params }: { params: { id: string } }) {
  const noticia = await fetchNoticia(params.id);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <article className="bg-white p-6 rounded-lg shadow">
          {noticia.imagen_principal && (
            <img src={noticia.imagen_principal} alt={noticia.titulo} className="w-full h-72 object-cover rounded mb-6" />
          )}

          <h1 className="text-3xl font-bold mb-3">{noticia.titulo}</h1>
          <div className="text-sm text-gray-500 mb-4">{noticia.fecha_publicacion ? `📅 ${new Date(noticia.fecha_publicacion).toLocaleDateString('es-GT', { day: 'numeric', month: 'long', year: 'numeric' })}` : ''} • Por {typeof noticia.autor === 'string' ? noticia.autor : noticia.autor?.nombre_completo || 'MINECO'}</div>

          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: noticia.contenido }} />
        </article>
      </div>
    </main>
  );
}
