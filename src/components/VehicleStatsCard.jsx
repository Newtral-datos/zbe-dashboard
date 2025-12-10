import { getPropulsionTypes } from '../data/zbeData';

export default function VehicleStatsCard({ vehicleData }) {
  if (!vehicleData) {
    return (
      <div className="bg-gray-50 rounded-xl p-4 text-center">
        <p className="text-gray-600 text-sm">Datos no disponibles</p>
      </div>
    );
  }

  const distinctiveStats = [
    {
      label: 'Total Vehículos',
      value: vehicleData.totalVehicles.toLocaleString('es-ES'),
      color: '#01f3b3'
    },
    {
      label: 'Sin Distintivo',
      value: `${vehicleData.sinDistintivo.toLocaleString('es-ES')} (${vehicleData.porcentajeSinDist.toFixed(1)}%)`,
      color: '#ff4757'
    },
    {
      label: 'Distintivo B',
      value: `${vehicleData.distintivoB.toLocaleString('es-ES')} (${vehicleData.porcentajeB.toFixed(1)}%)`,
      color: '#ffa502'
    },
    {
      label: 'Distintivo C',
      value: `${vehicleData.distintivoC.toLocaleString('es-ES')} (${vehicleData.porcentajeC.toFixed(1)}%)`,
      color: '#ffd32a'
    },
    {
      label: 'ECO',
      value: `${vehicleData.distintivoEco.toLocaleString('es-ES')} (${vehicleData.porcentajeEco.toFixed(1)}%)`,
      color: '#00d2ff'
    },
    {
      label: 'CERO',
      value: `${vehicleData.distintivoCero.toLocaleString('es-ES')} (${vehicleData.porcentajeCero.toFixed(1)}%)`,
      color: '#5f27cd'
    }
  ];

  // Filtrar propulsiones que tienen valor > 0
  const propulsionTypes = getPropulsionTypes();
  const activePropulsions = propulsionTypes.filter(p => 
    vehicleData[p.key] && vehicleData[p.key] > 0
  ).sort((a, b) => vehicleData[b.key] - vehicleData[a.key]);

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      {/* Distintivos ambientales */}
      <h3 className="text-[#01f3b3] text-sm uppercase tracking-wider mb-4 font-bold">
        Parque de Vehículos por Distintivo
      </h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {distinctiveStats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-gray-600 text-xs mb-1">{stat.label}</div>
            <div 
              className="font-bold text-sm" 
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>
      
      {/* Tipos de propulsión */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-[#01f3b3] text-sm uppercase tracking-wider mb-4 font-bold">
          Distribución por Tipo de Propulsión
        </h4>
        
        {/* Principales (Top 3) */}
        <div className="space-y-3 mb-4">
          {activePropulsions.slice(0, 3).map((propulsion, idx) => {
            const percentage = vehicleData[propulsion.key];
            return (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-gray-700">
                    {propulsion.label}
                  </span>
                  <span className="text-sm font-bold" style={{ color: propulsion.color }}>
                    {percentage.toFixed(2)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: propulsion.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Propulsiones alternativas (si hay más de 3) */}
        {activePropulsions.length > 3 && (
          <div>
            <h5 className="text-xs text-gray-600 mb-2 font-semibold">
              Propulsiones Alternativas
            </h5>
            <div className="grid grid-cols-2 gap-2">
              {activePropulsions.slice(3).map((propulsion, idx) => {
                const percentage = vehicleData[propulsion.key];
                if (percentage > 0) {
                  return (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg border border-gray-200 bg-white"
                    >
                      <span className="text-xs text-gray-700">
                        {propulsion.label}
                      </span>
                      <span 
                        className="text-xs font-bold"
                        style={{ color: propulsion.color }}
                      >
                        {percentage.toFixed(2)}%
                      </span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>

      {/* Otros datos de interés */}
      {(vehicleData.porcentajePrimeraMano || vehicleData.porcentajeRenting) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h5 className="text-xs text-gray-600 mb-3 font-semibold">
            Información Adicional
          </h5>
          <div className="grid grid-cols-2 gap-3">
            {vehicleData.porcentajePrimeraMano && (
              <div className="text-center p-2 bg-white rounded-lg border border-gray-200">
                <div className="text-lg font-bold text-[#01f3b3]">
                  {vehicleData.porcentajePrimeraMano.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-600">Primera mano</div>
              </div>
            )}
            {vehicleData.porcentajeRenting && (
              <div className="text-center p-2 bg-white rounded-lg border border-gray-200">
                <div className="text-lg font-bold text-[#6495ed]">
                  {vehicleData.porcentajeRenting.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-600">Renting</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
