import { Car, Calendar, Clock, ChevronRight } from 'lucide-react';
import { getRestrictionColor, getRestrictionLabel } from '../data/zbeData';

export default function CityCard({ city, onClick, index }) {
  const color = getRestrictionColor(city.restrictions);
  const label = getRestrictionLabel(city.restrictions);

  return (
    <div
      onClick={onClick}
      className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 cursor-pointer relative overflow-hidden transition-transform hover:-translate-y-2 animate-slide-in border border-gray-200 shadow-lg"
      style={{
        animationDelay: `${index * 0.1}s`
      }}
    >
      {/* Restriction indicator */}
      <div 
        className="absolute top-0 right-0 w-24 h-24 rounded-bl-full"
        style={{
          background: `radial-gradient(circle at top right, ${color}30 0%, transparent 70%)`
        }} 
      />

      <div className="flex justify-between items-start mb-4 relative">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {city.city}
          </h3>
          <p className="text-gray-600 text-sm">
            {city.province}
          </p>
        </div>
        <span 
          className="px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide"
          style={{
            backgroundColor: `${color}20`,
            color: color
          }}
        >
          {city.status}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        {city.affectedVehicles && (
          <div className="flex items-center gap-2">
            <Car size={16} className="text-[#ff4757]" />
            <span className="text-gray-600 text-sm">
              <span className="text-[#ff4757] font-semibold">{city.affectedVehicles.toLocaleString('es-ES')}</span> vehículos afectados
            </span>
          </div>
        )}
        {city.vehicleData && (
          <div className="flex items-center gap-2">
            <Car size={16} className="text-[#01f3b3]" />
            <span className="text-gray-600 text-sm">
              {city.vehicleData.totalVehicles.toLocaleString('es-ES')} vehículos totales
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-[#01f3b3]" />
          <span className="text-gray-600 text-sm">
            {city.days}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-[#01f3b3]" />
          <span className="text-gray-600 text-sm">
            {city.hours}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <span className="text-sm font-semibold" style={{ color }}>
          {label}
        </span>
        <ChevronRight size={20} className="text-[#01f3b3]" />
      </div>
    </div>
  );
}
