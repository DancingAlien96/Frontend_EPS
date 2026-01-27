import EventosPrototype from '@/components/public/EventosPrototype';

export default async function EventosPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div>
        {/* Render prototipo-faithful events section */}
        {/* @ts-ignore Server Component */}
        <EventosPrototype />
      </div>
    </main>
  );
}