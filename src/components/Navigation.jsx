import { MapIcon, MapPin, TrendingUp, Car } from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Vista General', icon: MapIcon },
  { id: 'cities', label: 'Ciudades', icon: MapPin },
  { id: 'stats', label: 'Estadísticas', icon: TrendingUp },
  { id: 'calculator', label: 'Calculadora', icon: Car }
];

export default function Navigation({ activeTab, onTabChange }) {
  return (
    <nav className="mb-8 flex gap-4 border-b border-gray-200 animate-slide-in overflow-x-auto">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative px-6 py-4 flex items-center gap-2 font-semibold transition-all border-b-2 ${
              activeTab === tab.id 
                ? 'text-[#01f3b3] border-[#01f3b3]' 
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            <Icon size={18} />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
