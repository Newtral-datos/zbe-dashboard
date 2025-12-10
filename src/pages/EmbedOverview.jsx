import OverviewView from '../views/OverviewView';
import { zbeData } from '../data/zbeData';

export default function EmbedOverview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 p-6">
      <OverviewView zbeData={zbeData} />
    </div>
  );
}
