import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { users, customers, invoices, revenue } from '../lib/placeholder-data';

async function seedDatabase() {
  // Use the non-pooling connection for more stable connection
  const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!, {
    ssl: 'require',
    prepare: false,
    max: 1,
    idle_timeout: 20,
    max_lifetime: 60 * 30,
  });

  try {
    console.log('Starting database seeding...');

    // Test connection first
    await sql`SELECT 1`;
    console.log('Database connection established');

    // Create and seed users table
    console.log('Creating users table...');
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log('Inserting users...');
    for (const user of users) {
      await sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${user.password})
        ON CONFLICT (id) DO NOTHING;
      `;
    }

    // Create and seed customers table
    console.log('Creating customers table...');
    await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log('Inserting customers...');
    for (const customer of customers) {
      await sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `;
    }

    // Create and seed invoices table
    console.log('Creating invoices table...');
    await sql`
      CREATE TABLE IF NOT EXISTS invoices (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        customer_id UUID NOT NULL,
        amount INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        date DATE NOT NULL
      );
    `;

    console.log('Inserting invoices...');
    for (const invoice of invoices) {
      await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `;
    }

    // Create and seed revenue table
    console.log('Creating revenue table...');
    await sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log('Inserting revenue data...');
    for (const rev of revenue) {
      await sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `;
    }

    console.log('Database seeded successfully');
    console.log(`Seeded ${users.length} users`);
    console.log(`Seeded ${customers.length} customers`);
    console.log(`Seeded ${invoices.length} invoices`);
    console.log(`Seeded ${revenue.length} revenue entries`);

    return true;
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    // Always close the connection
    try {
      await sql.end();
    } catch (closeError) {
      console.error('Error closing connection:', closeError);
    }
  }
}

export default async function Page() {
  try {
    await seedDatabase();
    
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg">
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            ✅ Database seeded successfully!
          </h1>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Your PostgreSQL database has been populated with sample data including:
          </p>
          <ul className="text-left text-gray-600 mb-6 space-y-1">
            <li>• Users table with sample user accounts</li>
            <li>• Customers table with customer information</li>
            <li>• Invoices table with sample invoices</li>
            <li>• Revenue table with monthly revenue data</li>
          </ul>
          <p className="text-gray-400 text-sm italic mb-6">
            You can now delete this file and navigate back to your dashboard.
          </p>
          <div className="mt-6">
            <a 
              href="/" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md no-underline inline-block font-medium transition-colors"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            ❌ Seeding Failed
          </h1>
          <p className="text-gray-700 mb-4">
            There was an error seeding the database:
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto text-left">
            {error instanceof Error ? error.message : 'Unknown error'}
          </pre>
        </div>
      </div>
    );
  }
}
