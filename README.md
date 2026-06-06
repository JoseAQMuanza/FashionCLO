# FashionClo

FashionClo is a modern ecommerce storefront built with Next.js 14 and Tailwind CSS. The project focuses on a premium shopping experience with a curated product catalog, global category filtering through URL query params, and a checkout flow with real form validation.

## Live Features

- Premium landing page with commercial copy and collection highlights
- Global product filtering with `?category=` query params
- Product catalog with search and sorting
- Persistent cart state in the browser
- Checkout flow with `react-hook-form` + `zod` validation
- Dynamic payment method switching
- Dedicated success page after checkout
- Responsive layout with Tailwind CSS utility classes

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod

## Project Structure

- `src/app/page.tsx` - homepage
- `src/app/produtos/page.tsx` - full product catalog
- `src/app/colecoes/page.tsx` - collections overview
- `src/app/feminino/page.tsx` - women collection
- `src/app/masculino/page.tsx` - men collection
- `src/app/inverno/page.tsx` - winter collection
- `src/app/checkout/page.tsx` - checkout flow
- `src/app/checkout/success/page.tsx` - success confirmation
- `src/app/components/` - reusable UI components
- `src/app/context/cart-context.tsx` - cart state provider
- `src/app/data/products.ts` - product and collection data
- `src/lib/format.ts` - shared formatting helpers

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Type Check

```bash
npm run type-check
```

### Lint

```bash
npm run lint
```

### Production Build

```bash
npm run build
```

## Checkout Flow

The checkout page validates:

- Full name
- Email
- Phone number
- Address
- Card number
- Expiry date
- CVV

If the user selects Xpress / Transferência, the card fields are hidden and the page shows the next-step instructions dynamically.

## Cart Behavior

The cart is handled through a React context provider and persisted in `localStorage`, so the user keeps their items between page reloads.

## Category Routing

Category filters are controlled globally through the URL:

- `/`
- `/?category=feminino`
- `/?category=masculino`
- `/?category=inverno`

This makes the filtering consistent across the entire site.

## Notes

- Remote product and collection images are loaded from Unsplash.
- The project is configured to build without relying on remote Google Fonts.
- Tailwind is used directly across the UI, with no custom layout classes in `globals.css`.

## License

Private project. All rights reserved.
