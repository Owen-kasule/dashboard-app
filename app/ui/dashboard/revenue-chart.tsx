import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { generateYAxis } from '@/app/lib/utils';

// This component receives data as a prop
export default async function RevenueChart({
  revenue,
}: {
  revenue: { month: string; revenue: number }[];
}) {
  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex h-80">
            {yAxisLabels.map((label, index) => (
              <p key={`y-axis-${index}`}>{label}</p>
            ))}
          </div>

          {revenue.map((month, index) => {
            // Convert to a percentage for height, ensuring minimum visibility
            const barHeight = Math.max((month.revenue / topLabel) * 100, 5);
            const heightClass = barHeight > 75 ? 'h-full' : 
                               barHeight > 50 ? 'h-3/4' :
                               barHeight > 25 ? 'h-1/2' : 'h-1/4';
            
            return (
              <div key={`month-${month.month}-${index}`} className="flex flex-col items-center gap-2">
                <div className="relative w-full h-80 flex items-end">
                  <div className={`w-full rounded-md bg-blue-300 flex items-end justify-center ${heightClass}`}>
                    <span className="text-xs text-white font-medium pb-1">
                      ${(month.revenue / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
                <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                  {month.month}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
