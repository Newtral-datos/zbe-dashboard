import { getRestrictionColor, getRestrictionLabel } from '../data/zbeData';

export default function StatsView({ zbeData }) {
  const sortedByAffected = [...zbeData].sort((a, b) => b.affectedVehicles - a.affectedVehicles);

  return (
    <div className="animate-slide-in">
      <h2 className="text-3xl mb-8 text-[#01f3b3] font-bold">
        Estadísticas del Parque de Vehículos
      </h2>

      <div className="space-y-8">
        {/* Top cities by affected vehicles */}
        <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl mb-6 text-gray-900 font-semibold">
            Ciudades con Más Vehículos Afectados
          </h3>
          <div className="space-y-4">
            {sortedByAffected.slice(0, 5).map((city, idx) => {
              const color = getRestrictionColor(city.restrictions);
              return (
                <div 
                  key={city.id} 
                  className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200"
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold font-mono"
                    style={{
                      backgroundColor: `${color}20`,
                      color: color
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">
                      {city.city}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {city.affectedVehicles.toLocaleString('es-ES')} vehículos
                    </div>
                  </div>
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{
                        width: `${(city.affectedVehicles / sortedByAffected[0].affectedVehicles) * 100}%`,
                        background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`
                      }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Restriction distribution */}
        <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl mb-6 text-gray-900 font-semibold">
            Distribución de Restricciones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['alta', 'media', 'baja'].map(level => {
              const count = zbeData.filter(c => c.restrictions === level).length;
              const affected = zbeData
                .filter(c => c.restrictions === level)
                .reduce((sum, c) => sum + c.affectedVehicles, 0);
              const color = getRestrictionColor(level);
              const label = getRestrictionLabel(level);
              
              return (
                <div 
                  key={level} 
                  className="rounded-xl p-6 text-center border-2"
                  style={{
                    backgroundColor: `${color}15`,
                    borderColor: `${color}40`
                  }}
                >
                  <div 
                    className="text-4xl font-bold mb-2 font-mono" 
                    style={{ color }}
                  >
                    {count}
                  </div>
                  <div className="text-gray-900 font-semibold mb-1 capitalize">
                    {label}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {affected.toLocaleString('es-ES')} vehículos
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
