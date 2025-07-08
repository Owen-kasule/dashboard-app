import { lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Total Customers</h3>
            <p className="text-3xl font-bold text-blue-600">248</p>
            <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Active Customers</h3>
            <p className="text-3xl font-bold text-green-600">189</p>
            <p className="text-sm text-gray-500 mt-1">+8% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">New This Month</h3>
            <p className="text-3xl font-bold text-purple-600">24</p>
            <p className="text-sm text-gray-500 mt-1">+5% from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
}
