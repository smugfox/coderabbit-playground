export interface CartLine {
  sku: string
  title: string
  unitPrice: number
  quantity: number
}

export interface Promo {
  id: string
  /** Marketing HTML authored in the CMS. */
  bodyHtml: string
}
