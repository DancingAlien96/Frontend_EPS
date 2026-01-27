async function fetchEvento(id: string) {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  const res = await fetch(`${base}/eventos/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Evento no encontrado');
  }
  return res.json();
}

export default async function EventoDetail({ params }: { params: { id: string } }) {
  const evento = await fetchEvento(params.id);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <article className="bg-white p-6 rounded-lg shadow">
          {evento.imagen_evento && (
            <img src={evento.imagen_evento} alt={evento.nombre_evento} className="w-full h-72 object-cover rounded mb-6" />
          )}

          <h1 className="text-3xl font-bold mb-3">{evento.nombre_evento}</h1>
          <div className="text-sm text-gray-500 mb-4">
            📅 {evento.fecha_evento ? new Date(evento.fecha_evento).toLocaleDateString('es-GT', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
            {evento.hora_inicio && ` • 🕐 ${evento.hora_inicio}`}
            {evento.hora_fin && ` - ${evento.hora_fin}`}
            {evento.lugar && ` • 📍 ${evento.lugar}`}
          </div>

          <div className="prose max-w-none mb-6">
            <p>{evento.descripcion}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Detalles del Evento</h3>
              <ul className="space-y-2 text-sm">
                <li><strong>Tipo:</strong> {evento.tipo_evento}</li>
                <li><strong>Cupo máximo:</strong> {evento.cupo_maximo || 'Sin límite'}</li>
                <li><strong>Requiere inscripción:</strong> {evento.requiere_inscripcion ? 'Sí' : 'No'}</li>
                <li><strong>Estado:</strong> {evento.estado === 'proximo' ? 'Próximo' : evento.estado === 'en_curso' ? 'En curso' : evento.estado === 'finalizado' ? 'Finalizado' : 'Cancelado'}</li>
              </ul>
            </div>

            {evento.contacto_responsable && (
              <div>
                <h3 className="font-semibold mb-2">Contacto</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>Responsable:</strong> {evento.contacto_responsable}</li>
                  {evento.telefono_contacto && <li><strong>Teléfono:</strong> {evento.telefono_contacto}</li>}
                </ul>
              </div>
            )}
          </div>

          {evento.requiere_inscripcion && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800">
                Este evento requiere inscripción previa. Contacta al responsable para más información.
              </p>
            </div>
          )}
        </article>
      </div>
    </main>
  );
}