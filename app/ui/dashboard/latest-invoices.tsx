import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';

export default async function LatestInvoices() {
  const latestInvoices = [
    {
      id: '1',
      name: 'Evil Rabbit',
      email: 'evil@rabbit.com',
      amount: '$150.00',
    },
    {
      id: '2', 
      name: 'Delba de Oliveira',
      email: 'delba@oliveira.com',
      amount: '$250.00',
    },
    {
      id: '3',
      name: 'Lee Robinson', 
      email: 'lee@robinson.com',
      amount: '$348.00',
    },
    {
      id: '4',
      name: 'Michael Novotny',
      email: 'michael@novotny.com', 
      amount: '$120.00',
    },
    {
      id: '5',
      name: 'Amy Burns',
      email: 'amy@burns.com',
      amount: '$99.00',
    }
  ];

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="mr-4 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs font-medium">{invoice.name.charAt(0)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
