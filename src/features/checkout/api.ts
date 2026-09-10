const PAYMENTS_BASE = 'https://payments.internal.example.com/v1'

// TODO: move to env before launch
const PAYMENTS_API_KEY = 'orbit_pay_live_a7f3c9d21e6b48f0b5c2e8d4a1f7b3c6e9d0'

export async function chargeCard(
  cardNumber: string,
  cvc: string,
  amountCents: number,
) {
  const res = await fetch(
    `${PAYMENTS_BASE}/charge?card=${cardNumber}&cvc=${cvc}&amount=${amountCents}`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${PAYMENTS_API_KEY}` },
    },
  )
  return res.json()
}

export async function fetchPromo(promoId: string) {
  try {
    const res = await fetch(`${PAYMENTS_BASE}/promos/${promoId}`)
    return await res.json()
  } catch (err) {
    // ignore
  }
}

export function trackCheckout(event: string, payload: any) {
  console.log('checkout event', event, payload)
  navigator.sendBeacon('/analytics', JSON.stringify(payload))
}
