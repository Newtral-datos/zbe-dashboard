import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import CityModal from './components/CityModal';
import OverviewView from './views/OverviewView';
import CitiesView from './views/CitiesView';
import StatsView from './views/StatsView';
import CalculatorView from './views/CalculatorView';
import EmbedOverview from './pages/EmbedOverview';
import EmbedCities from './pages/EmbedCities';
import EmbedStats from './pages/EmbedStats';
import EmbedCalculator from './pages/EmbedCalculator';
import { zbeData } from './data/zbeData';

function AppContent() {
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
        <Navigation />

        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/general" replace />} />
            <Route path="/general" element={<OverviewView zbeData={zbeData} />} />
            <Route 
              path="/ciudades" 
              element={
                <CitiesView 
                  zbeData={zbeData}
                  filter={filter}
                  onFilterChange={setFilter}
                  onCityClick={setSelectedCity}
                />
              } 
            />
            <Route path="/estadisticas" element={<StatsView zbeData={zbeData} />} />
            <Route path="/calculadora" element={<CalculatorView zbeData={zbeData} />} />
          </Routes>
        </main>

        <CityModal 
          city={selectedCity} 
          onClose={() => setSelectedCity(null)} 
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas completas con navegación */}
        <Route path="/*" element={<AppContent />} />
        
        {/* Rutas para embeber (sin header ni navegación) */}
        <Route path="/embed/general" element={<EmbedOverview />} />
        <Route path="/embed/ciudades" element={<EmbedCities />} />
        <Route path="/embed/estadisticas" element={<EmbedStats />} />
        <Route path="/embed/calculadora" element={<EmbedCalculator />} />
      </Routes>
    </Router>
  );
}

export default App;
