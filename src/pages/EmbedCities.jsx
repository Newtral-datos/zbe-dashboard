import { useState } from 'react';
import CitiesView from '../views/CitiesView';
import CityModal from '../components/CityModal';
import { zbeData } from '../data/zbeData';

export default function EmbedCities() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 p-6">
      <CitiesView 
        zbeData={zbeData}
        filter={filter}
        onFilterChange={setFilter}
        onCityClick={setSelectedCity}
      />
      <CityModal 
        city={selectedCity} 
        onClose={() => setSelectedCity(null)} 
      />
    </div>
  );
}
