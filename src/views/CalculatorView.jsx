import { useState } from 'react';
import { Info, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function CalculatorView({ zbeData }) {
  const [selectedLabel, setSelectedLabel] = useState('');
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    if (!selectedLabel) {
      alert('Por favor selecciona una etiqueta ambiental');
      return;
    }

    const canAccess = [];
    const restricted = [];
    const partial = [];

    zbeData.forEach(city => {
      const restrictions = city.restrictedVehicles.toLowerCase();
      
      if (selectedLabel === '0' || selectedLabel === 'eco') {
        // Cero y ECO pueden circular en todas partes
        canAccess.push(city);
      } else if (selectedLabel === 'c') {
        // C restringido si se menciona C o si es más restrictivo
        if (restrictions.includes('etiqueta c') || restrictions.includes('distintivo c')) {
          restricted.push(city);
        } else {
          canAccess.push(city);
        }
      } else if (selectedLabel === 'b') {
        // B restringido si se menciona B o C
        if (restrictions.includes('etiqueta b') || restrictions.includes('distintivo b') ||
            restrictions.includes('etiqueta c') || restrictions.includes('distintivo c')) {
          restricted.push(city);
        } else {
          canAccess.push(city);
        }
      } else if (selectedLabel === 'none') {
        // Sin etiqueta restringido en casi todas
        if (restrictions.includes('sin etiqueta') || restrictions.includes('sin distintivo') ||
            restrictions.includes('etiqueta b') || restrictions.includes('etiqueta c')) {
          restricted.push(city);
        } else {
          canAccess.push(city);
        }
      }
    });

    setResults({ canAccess, restricted, partial });
  };

  const getLabelName = (label) => {
    const labels = {
      '0': 'CERO (Vehículos eléctricos e hidrógeno)',
      'eco': 'ECO (Híbridos y gas)',
      'c': 'C (Gasolina post-2006, diésel post-2015)',
      'b': 'B (Gasolina 2000-2006, diésel 2006-2015)',
      'none': 'Sin etiqueta'
    };
    return labels[label] || label;
  };

  return (
    <div className="animate-slide-in">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-10 shadow-xl mb-6">
          <h2 className="text-3xl mb-4 text-[#01f3b3] font-bold text-center">
            Calculadora de Acceso a ZBE
          </h2>
          <p className="text-gray-600 text-center mb-8 text-lg">
            Descubre en qué ciudades puedes circular con tu vehículo
          </p>

          <div className="bg-gray-50 rounded-xl p-8 mb-8">
            <label className="block mb-3 text-gray-800 font-semibold">
              Selecciona tu etiqueta ambiental
            </label>
            <select 
              value={selectedLabel}
              onChange={(e) => setSelectedLabel(e.target.value)}
              className="w-full p-4 bg-white border-2 border-[#01f3b3]/30 rounded-xl text-gray-800 text-base cursor-pointer outline-none hover:border-[#01f3b3]/50 transition-colors focus:border-[#01f3b3] focus:ring-2 focus:ring-[#01f3b3]/20"
            >
              <option value="">Selecciona tu etiqueta...</option>
              <option value="0">0 - Cero emisiones (eléctricos, hidrógeno)</option>
              <option value="eco">ECO - Híbridos y gas</option>
              <option value="c">C - Gasolina post-2006, diésel post-2015</option>
              <option value="b">B - Gasolina 2000-2006, diésel 2006-2015</option>
              <option value="none">Sin etiqueta</option>
            </select>
          </div>

          {/* Iframe de matrículas */}
          <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Consulta tu etiqueta ambiental por matrícula
            </h3>
            <div className="w-full overflow-hidden rounded-lg border border-gray-300">
              <iframe
                src="https://playground.pabloaccino.es/matriculas/?v=2"
                width="100%"
                height="600"
                frameBorder="0"
                title="Consulta etiqueta ambiental por matrícula"
                className="w-full"
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#01f3b3]/10 to-[#00d2ff]/10 rounded-xl p-6 border border-[#01f3b3]/30 mb-8">
            <div className="flex items-start gap-3 mb-3">
              <Info size={20} className="text-[#01f3b3] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[#01f3b3] font-semibold text-base block mb-2">
                  Información importante
                </span>
                <p className="text-gray-700 m-0 text-sm leading-relaxed">
                  Esta calculadora te mostrará en qué ZBE puedes circular según tu distintivo ambiental. 
                  Ten en cuenta que las <strong>excepciones pueden aplicar</strong> según tu situación 
                  (residente, PMR, vehículos de servicios, etc.). Consulta los detalles de cada ciudad 
                  para más información.
                </p>
              </div>
            </div>
          </div>

          <button 
            onClick={handleCalculate}
            disabled={!selectedLabel}
            className="w-full p-4 bg-gradient-to-r from-[#01f3b3] to-[#00a8cc] border-none rounded-xl text-white text-lg font-bold cursor-pointer transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            Calcular Acceso
          </button>
        </div>

        {results && (
          <div className="space-y-6 animate-slide-in">
            {/* Resumen */}
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Resultados para: {getLabelName(selectedLabel)}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
                  <CheckCircle size={32} className="text-green-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {results.canAccess.length}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Puedes circular</div>
                </div>
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
                  <XCircle size={32} className="text-red-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    {results.restricted.length}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Con restricciones</div>
                </div>
              </div>
            </div>

            {/* Ciudades donde puede circular */}
            {results.canAccess.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle size={24} className="text-green-600" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Puedes circular sin restricciones ({results.canAccess.length})
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {results.canAccess.map(city => (
                    <div 
                      key={city.id}
                      className="bg-green-50 border border-green-200 rounded-lg p-3 hover:bg-green-100 transition-colors"
                    >
                      <div className="font-semibold text-gray-800 text-sm">{city.city}</div>
                      <div className="text-xs text-gray-600">{city.province}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ciudades restringidas */}
            {results.restricted.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle size={24} className="text-red-600" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Ciudades con restricciones ({results.restricted.length})
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {results.restricted.map(city => (
                    <div 
                      key={city.id}
                      className="bg-red-50 border border-red-200 rounded-lg p-4 hover:bg-red-100 transition-colors"
                    >
                      <div className="font-semibold text-gray-800 mb-1">{city.city}</div>
                      <div className="text-xs text-gray-600 mb-2">{city.province}</div>
                      <div className="text-xs text-red-700 font-medium">
                        Restricción: {city.restrictedVehicles}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {city.days} | {city.hours}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={18} className="text-yellow-700 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      <strong>Importante:</strong> Consulta las excepciones de cada ciudad. 
                      Si eres residente, tienes movilidad reducida o necesitas acceder por trabajo, 
                      podrías estar exento de las restricciones.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
