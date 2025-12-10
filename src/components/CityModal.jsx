import { getRestrictionColor, getRestrictionLabel } from '../data/zbeData';
import VehicleStatsCard from './VehicleStatsCard';

const InfoRow = ({ label, value, color }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-200">
    <span className="text-gray-600 text-sm">{label}</span>
    <span className="font-semibold text-sm" style={{ color: color || '#1f2937' }}>
      {value}
    </span>
  </div>
);

export default function CityModal({ city, onClose }) {
  if (!city) return null;

  const color = getRestrictionColor(city.restrictions);
  const label = getRestrictionLabel(city.restrictions);
  
  const formatDate = (dateStr) => {
    if (!dateStr) return 'No especificada';
    try {
      return new Date(dateStr).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl p-10 max-w-2xl w-full max-h-[90vh] overflow-auto border-2 shadow-2xl animate-slide-in"
        style={{ borderColor: color }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              {city.city}
            </h2>
            <p className="text-gray-600 text-lg">
              {city.province}
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-gray-100 border-none rounded-lg text-gray-700 w-10 h-10 cursor-pointer text-2xl flex items-center justify-center hover:bg-gray-200 transition-all"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-[#01f3b3] text-sm uppercase tracking-wider mb-4 font-bold">
              Información General
            </h3>
            <div>
              <InfoRow label="Estado" value={city.status} color={color} />
              <InfoRow label="Nivel" value={label} color={color} />
              <InfoRow label="Fecha Aprobación" value={formatDate(city.approvalDate)} />
              {city.affectedVehicles && (
                <InfoRow 
                  label="Vehículos Afectados" 
                  value={city.affectedVehicles.toLocaleString('es-ES')} 
                  color="#ff4757"
                />
              )}
            </div>
          </div>

          {city.vehicleData && (
            <VehicleStatsCard vehicleData={city.vehicleData} />
          )}

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-[#01f3b3] text-sm uppercase tracking-wider mb-4 font-bold">
              Restricciones
            </h3>
            <div>
              <div className="mb-4">
                <div className="text-gray-600 text-sm mb-2">
                  Vehículos restringidos:
                </div>
                <div className="bg-[#ff4757]/10 border border-[#ff4757]/30 rounded-lg p-3">
                  <span className="text-[#ff4757] font-semibold text-sm">
                    {city.restrictedVehicles}
                  </span>
                </div>
              </div>
              <InfoRow label="Días" value={city.days} />
              <InfoRow label="Horarios" value={city.hours} />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-[#01f3b3] text-sm uppercase tracking-wider mb-4 font-bold">
              Datos Geográficos
            </h3>
            <div>
              {city.perimeter && <InfoRow label="Perímetro" value={`${city.perimeter} km`} />}
              {city.surface && <InfoRow label="Superficie" value={`${city.surface} km²`} />}
              {city.lat && city.lng && <InfoRow label="Coordenadas" value={`${city.lat}, ${city.lng}`} />}
            </div>
          </div>

          <div 
            className="rounded-xl p-6 border"
            style={{
              backgroundColor: `${color}15`,
              borderColor: `${color}40`
            }}
          >
            <h3 
              className="text-sm uppercase tracking-wider mb-3 font-bold"
              style={{ color }}
            >
              Excepciones
            </h3>
            <p className="text-gray-700 m-0 leading-relaxed text-sm">
              {city.exceptions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
