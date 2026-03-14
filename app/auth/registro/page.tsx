"use client";

import RegistrationWizard from '@/components/registro/RegistrationWizard';

export default function RegistroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <RegistrationWizard 
        isOpen={true} 
        onClose={() => window.history.back()} 
        skipIntro={true}
      />
    </div>
  );
}
