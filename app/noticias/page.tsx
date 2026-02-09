import NoticiasPrototype from '@/components/public/NoticiasPrototype';

export default async function NoticiasPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div>
        {/* Render prototipo-faithful news section */}
        {/* @ts-ignore Server Component */}
        <NoticiasPrototype />
      </div>
    </main>
  );
}
