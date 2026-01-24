'use client';

export default function TopBar() {
  return (
    <div className="bg-official-blue text-white py-2 px-4 sm:px-8 text-xs sm:text-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
      <div className="flex flex-wrap items-center gap-2 sm:gap-6">
        <span>Ministerio de Economía</span>
        <span className="hidden sm:inline">|</span>
        <span>Gobierno de Guatemala</span>
      </div>
      <div className="flex gap-3 sm:gap-4">
        <a href="https://www.facebook.com/MinecoGuatemala" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
          Facebook
        </a>
        <a href="https://twitter.com/MinecoGuatemala" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
          Twitter
        </a>
      </div>
    </div>
  );
}
