import { MapPin, Car, MapIcon, AlertCircle } from 'lucide-react';
import StatCard from '../components/StatCard';
import { getGeneralStats } from '../data/zbeData';

export default function OverviewView({ zbeData }) {
  const generalStats = getGeneralStats();

  const stats = [
    { 
      label: 'Ciudades con ZBE', 
      value: generalStats.totalCities, 
      icon: MapPin,
      color: '#01f3b3',
      delay: '0s'
    },
    { 
      label: 'Vehículos Afectados', 
      value: generalStats.totalAffected.toLocaleString('es-ES'), 
      icon: Car,
      color: '#ff4757',
      delay: '0.1s'
    },
    { 
      label: 'Total Vehículos', 
      value: (generalStats.totalVehicles / 1000000).toFixed(2) + 'M', 
      icon: Car,
      color: '#ffa502',
      delay: '0.2s'
    },
    { 
      label: 'Superficie Total ZBE', 
      value: `${generalStats.totalSurface} km²`, 
      icon: MapIcon,
      color: '#6495ed',
      delay: '0.3s'
    }
  ];

  return (
    <div>
      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Map Preview */}
      <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl p-8 animate-slide-in shadow-lg">
        <h2 className="text-2xl mb-6 text-[#01f3b3] font-bold">
          Mapa de ZBE en España
        </h2>
        <div className="bg-gray-50 rounded-xl p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
          <MapIcon size={64} className="text-[#01f3b3] mb-4 opacity-50" />
          <p className="text-gray-600 text-lg max-w-lg mb-8">
            Aquí debería ir un mapita que aún no he podido hacer
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            {zbeData.slice(0, 5).map((city) => (
              <div 
                key={city.id} 
                className="rounded-lg px-4 py-2 text-sm font-semibold border-2"
                style={{
                  backgroundColor: `#01f3b320`,
                  borderColor: '#01f3b3'
                }}
              >
                📍 {city.city}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
