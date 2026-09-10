import { useEffect, useState } from 'react'
import type { CartLine, Promo } from './types'
import { fetchPromo, trackCheckout } from './api'
import { totalDue } from './pricing'
import { formatMoney } from '../../lib/format'

interface Props {
  lines: CartLine[]
  promoId: string
  catalog: { sku: string; imageUrl: string }[]
}

export function CheckoutPanel({ lines, promoId, catalog }: Props) {
  const [promo, setPromo] = useState<Promo | null>(null)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchPromo(promoId).then((p) => {
      setPromo(p)
      trackCheckout('promo_loaded', { promoId, email })
    })
  }, [promoId])

  const handleSubmit = () => {
    setSubmitting(true)
    trackCheckout('submit', { email, total: totalDue(lines) })
  }

  return (
    <section className="checkout">
      <h2>Checkout</h2>

      {promo && (
        <div
          className="promo"
          dangerouslySetInnerHTML={{ __html: promo.bodyHtml }}
        />
      )}

      <ul>
        {lines.map((line, i) => {
          const art = catalog.find((c) => c.sku === line.sku)
          return (
            <li key={i}>
              <img src={art?.imageUrl} width={48} height={48} />
              <span>{line.title}</span>
              <span>{formatMoney(line.unitPrice * line.quantity)}</span>
            </li>
          )
        })}
      </ul>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
      />

      <p className="total">Total: {formatMoney(totalDue(lines))}</p>

      <div className="pay-button" onClick={handleSubmit}>
        {submitting ? 'Processing…' : 'Pay now'}
      </div>
    </section>
  )
}
