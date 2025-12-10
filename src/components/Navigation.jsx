import { MapIcon, MapPin, TrendingUp, Car } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const tabs = [
  { path: '/general', label: 'Vista General', icon: MapIcon },
  { path: '/ciudades', label: 'Ciudades', icon: MapPin },
  { path: '/estadisticas', label: 'Estadísticas', icon: TrendingUp },
  { path: '/calculadora', label: 'Calculadora', icon: Car }
];

export default function Navigation() {
  return (
    <nav className="mb-8 flex gap-4 border-b border-gray-200 animate-slide-in overflow-x-auto">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) => 
              `relative px-6 py-4 flex items-center gap-2 font-semibold transition-all border-b-2 ${
                isActive 
                  ? 'text-[#01f3b3] border-[#01f3b3]' 
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`
            }
          >
            <Icon size={18} />
            {tab.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
