import { lusitana } from '@/app/ui/fonts';

const invoices = [
  {
    id: '1',
    customer_name: 'Evil Rabbit',
    customer_email: 'evil@rabbit.com',
    amount: 15000,
    date: '2022-12-06',
    status: 'pending',
  },
  {
    id: '2',
    customer_name: 'Delba de Oliveira',
    customer_email: 'delba@oliveira.com',
    amount: 20348,
    date: '2022-11-14',
    status: 'pending',
  },
  {
    id: '3',
    customer_name: 'Lee Robinson',
    customer_email: 'lee@robinson.com',
    amount: 3040,
    date: '2022-10-29',
    status: 'paid',
  },
  {
    id: '4',
    customer_name: 'Michael Novotny',
    customer_email: 'michael@novotny.com',
    amount: 44800,
    date: '2023-09-10',
    status: 'paid',
  },
  {
    id: '5',
    customer_name: 'Amy Burns',
    customer_email: 'amy@burns.com',
    amount: 34577,
    date: '2023-08-05',
    status: 'pending',
  },
];

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <span className="text-xs font-medium">{invoice.customer_name.charAt(0)}</span>
                      </div>
                      <p>{invoice.customer_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.customer_email}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      ${(invoice.amount / 100).toFixed(2)}
                    </p>
                    <p>{invoice.date}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                        invoice.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-medium">{invoice.customer_name.charAt(0)}</span>
                      </div>
                      <p>{invoice.customer_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.customer_email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    ${(invoice.amount / 100).toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.date}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                        invoice.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <button className="rounded-md border p-2 hover:bg-gray-100">
                        Edit
                      </button>
                      <button className="rounded-md border p-2 hover:bg-gray-100">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
