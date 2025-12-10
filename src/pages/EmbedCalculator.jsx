import CalculatorView from '../views/CalculatorView';
import { zbeData } from '../data/zbeData';

export default function EmbedCalculator() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 p-6">
      <CalculatorView zbeData={zbeData} />
    </div>
  );
}
