import { fetchRevenue } from '@/app/lib/data';
import RevenueChart from './revenue-chart';

export default async function RevenueChartWrapper() {
  const revenue = await fetchRevenue();
  
  return <RevenueChart revenue={revenue} />;
}
