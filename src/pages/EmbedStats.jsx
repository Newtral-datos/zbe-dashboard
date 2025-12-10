import StatsView from '../views/StatsView';
import { zbeData } from '../data/zbeData';

export default function EmbedStats() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 p-6">
      <StatsView zbeData={zbeData} />
    </div>
  );
}
