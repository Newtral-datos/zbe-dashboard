import { MapPin } from 'lucide-react';

export default function Header() {
  return (
    <header className="mb-12 animate-slide-in">
      <div className="flex flex-col items-center gap-4 mb-2 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#01f3b3] to-[#00a8cc] rounded-2xl flex items-center justify-center shadow-lg shadow-[#01f3b3]/40">
          <MapPin size={32} className="text-white" />
        </div>
        <div>
          <h1 
            className="text-4xl font-normal m-0 text-black"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            ZBE España
          </h1>
          <p className="m-0 text-gray-600 text-base mt-2">
            Dashboard de Zonas de Bajas Emisiones
          </p>
        </div>
      </div>
    </header>
  );
}
