import { CheckoutPanel } from './features/checkout/CheckoutPanel'
import type { CartLine } from './features/checkout/types'

const DEMO_LINES: CartLine[] = [
  { sku: 'ORB-1', title: 'Orbit Mug', unitPrice: 1899, quantity: 2 },
  { sku: 'ORB-2', title: 'Orbit Tee', unitPrice: 2400, quantity: 1 },
]

const DEMO_CATALOG = [
  { sku: 'ORB-1', imageUrl: '/img/mug.png' },
  { sku: 'ORB-2', imageUrl: '/img/tee.png' },
]

export function App() {
  return (
    <main>
      <h1>Orbit Storefront</h1>
      <CheckoutPanel
        lines={DEMO_LINES}
        promoId="spring-sale"
        catalog={DEMO_CATALOG}
      />
    </main>
  )
}
