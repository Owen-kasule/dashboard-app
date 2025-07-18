import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { users, customers, invoices, revenue } from '../../lib/placeholder-data';

async function seedDatabase() {
  // Check if we have the required environment variables
  if (!process.env.POSTGRES_URL_NON_POOLING) {
    throw new Error('POSTGRES_URL_NON_POOLING environment variable is required');
  }

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
        ON CONFLICT (id) DO UPDATE SET password = ${user.password};
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

export async function GET() {
  // Prevent seeding in production builds
  if (process.env.NODE_ENV === 'production' && !process.env.POSTGRES_URL_NON_POOLING) {
    return NextResponse.json(
      { error: 'Seeding not available in production without database configuration' },
      { status: 403 }
    );
  }

  try {
    await seedDatabase();

    return NextResponse.json({ 
      message: 'Database seeded successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
