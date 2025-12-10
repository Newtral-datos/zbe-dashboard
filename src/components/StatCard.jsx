export default function StatCard({ label, value, icon: Icon, color, delay = '0s' }) {
  return (
    <div 
      className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 transition-transform hover:scale-105 animate-fade-in shadow-lg"
      style={{ animationDelay: delay }}
    >
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: `${color}15`, color }}
      >
        <Icon size={24} />
      </div>
      <div 
        className="text-3xl font-bold mb-1 font-mono"
        style={{ color }}
      >
        {value}
      </div>
      <div className="text-gray-600 text-sm font-medium">
        {label}
      </div>
    </div>
  );
}
