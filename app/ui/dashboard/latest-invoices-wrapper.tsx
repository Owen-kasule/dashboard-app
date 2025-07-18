import { fetchLatestInvoices } from '@/app/lib/data';
import LatestInvoices from './latest-invoices';

export default async function LatestInvoicesWrapper() {
  const latestInvoices = await fetchLatestInvoices();
  
  return <LatestInvoices latestInvoices={latestInvoices} />;
}
