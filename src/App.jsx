import { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import CityModal from './components/CityModal';
import OverviewView from './views/OverviewView';
import CitiesView from './views/CitiesView';
import StatsView from './views/StatsView';
import CalculatorView from './views/CalculatorView';
import { zbeData } from './data/zbeData';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCity, setSelectedCity] = useState(null);
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div 
        className="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full opacity-100 blur-[60px] animate-pulse-custom"
        style={{
          background: 'radial-gradient(circle, rgba(1,243,179,0.15) 0%, transparent 70%)'
        }} 
      />
      <div 
        className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full opacity-100 blur-[50px] animate-pulse-custom"
        style={{
          background: 'radial-gradient(circle, rgba(100,149,237,0.1) 0%, transparent 70%)',
          animationDelay: '2s'
        }} 
      />

      <div className="relative z-10 p-6 md:p-8">
        <Header />
        
        <Navigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        <main>
          {activeTab === 'overview' && (
            <OverviewView zbeData={zbeData} />
          )}

          {activeTab === 'cities' && (
            <CitiesView 
              zbeData={zbeData}
              filter={filter}
              onFilterChange={setFilter}
              onCityClick={setSelectedCity}
            />
          )}

          {activeTab === 'stats' && (
            <StatsView zbeData={zbeData} />
          )}

          {activeTab === 'calculator' && (
            <CalculatorView zbeData={zbeData} />
          )}
        </main>

        <CityModal 
          city={selectedCity} 
          onClose={() => setSelectedCity(null)} 
        />
      </div>
    </div>
  );
}

export default App;
