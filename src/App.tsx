import { formatMoney } from './lib/format'

export function App() {
  return (
    <main>
      <h1>Orbit Storefront</h1>
      <p>Starting price: {formatMoney(1299)}</p>
    </main>
  )
}
