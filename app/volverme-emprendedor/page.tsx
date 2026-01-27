import VolverseEmprendedorForm from '@/components/emprendedor/VolverseEmprendedorForm';

export default function VolvermeEmprendedorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003d7a] to-[#0066cc] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#003d7a]">Volverme Emprendedor</h1>
          <p className="text-sm text-gray-600">Completa la solicitud para que nuestro equipo revise tu caso.</p>
        </div>
        <VolverseEmprendedorForm />
      </div>
    </div>
  );
}
