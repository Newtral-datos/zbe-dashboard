import { Filter } from 'lucide-react';
import CityCard from '../components/CityCard';

const filterOptions = [
  { id: 'all', label: 'Todas' },
  { id: 'alta', label: 'Restricción Alta', color: '#ff4757' },
  { id: 'media', label: 'Restricción Media', color: '#ffa502' },
  { id: 'baja', label: 'Restricción Baja', color: '#01f3b3' }
];

export default function CitiesView({ zbeData, filter, onFilterChange, onCityClick }) {
  const filteredData = filter === 'all' 
    ? zbeData 
    : zbeData.filter(city => city.restrictions === filter);

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 flex gap-4 items-center animate-slide-in overflow-x-auto">
        <Filter size={20} className="text-gray-600 flex-shrink-0" />
        <div className="flex gap-3">
          {filterOptions.map(f => (
            <button
              key={f.id}
              onClick={() => onFilterChange(f.id)}
              className="px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all whitespace-nowrap hover:-translate-y-1"
              style={{
                background: filter === f.id 
                  ? (f.color ? `${f.color}30` : 'rgba(1,243,179,0.2)')
                  : 'white',
                borderColor: filter === f.id 
                  ? (f.color || '#01f3b3')
                  : '#e5e7eb',
                color: filter === f.id ? (f.color || '#01f3b3') : '#6b7280'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((city, idx) => (
          <CityCard 
            key={city.id} 
            city={city} 
            onClick={() => onCityClick(city)}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}
