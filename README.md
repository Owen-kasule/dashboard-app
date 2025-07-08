# Next.js Dashboard App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- ✅ **Responsive sidebar navigation** with Home, Invoices, and Customers tabs
- ✅ **Active tab highlighting** using Next.js `usePathname()`
- ✅ **Font optimization** using Next.js `next/font/google`
- ✅ **Layout components** for consistent design across pages
- ✅ **File-based routing** with dynamic URL updates
- ✅ **Hover and focus states** for better UX
- ✅ **Mobile-responsive design** using Tailwind CSS
- ✅ **Dashboard cards** with placeholder data
- ✅ **Invoice table** with sample data
- ✅ **Search functionality** (UI ready)
- ✅ **Pagination component**
- ✅ **Loading skeletons** for better UX

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
dashboard-app/
├── app/
│   ├── dashboard/
│   │   ├── customers/
│   │   │   └── page.tsx
│   │   ├── invoices/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── ui/
│   │   ├── dashboard/
│   │   │   ├── cards.tsx
│   │   │   ├── latest-invoices.tsx
│   │   │   ├── nav-links.tsx
│   │   │   ├── revenue-chart.tsx
│   │   │   └── sidenav.tsx
│   │   ├── invoices/
│   │   │   ├── buttons.tsx
│   │   │   ├── pagination.tsx
│   │   │   └── table.tsx
│   │   ├── acme-logo.tsx
│   │   ├── fonts.ts
│   │   ├── global.css
│   │   ├── search.tsx
│   │   └── skeletons.tsx
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   ├── hero-desktop.png
│   └── hero-mobile.png
└── ...
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
