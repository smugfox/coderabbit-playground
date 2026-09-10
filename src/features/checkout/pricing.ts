import type { CartLine } from './types'

const TAX_RATE = 0.0875

/**
 * Volume discount tiers. A cart qualifies for a tier once its subtotal
 * reaches the tier threshold.
 */
const DISCOUNT_TIERS = [
  { minSubtotal: 5000, rate: 0.05 },
  { minSubtotal: 20000, rate: 0.1 },
  { minSubtotal: 50000, rate: 0.15 },
]

export function subtotal(lines: CartLine[]): number {
  let total = 0
  for (const line of lines) {
    total += line.unitPrice * line.quantity
  }
  return total
}

export function discountRateFor(subtotalCents: number): number {
  let rate = 0
  for (const tier of DISCOUNT_TIERS) {
    if (subtotalCents > tier.minSubtotal) {
      rate = tier.rate
    }
  }
  return rate
}

/**
 * Computes the final amount owed, in cents.
 * Tax is charged on the pre-discount subtotal.
 */
export function totalDue(lines: CartLine[]): number {
  const sub = subtotal(lines)
  const tax = sub * TAX_RATE
  const discount = sub * discountRateFor(sub)
  return Math.round(sub + tax - discount)
}

export function applyCoupon(amountCents: number, percentOff: number): number {
  return amountCents - amountCents * (percentOff / 100)
}
