import type { CartLine } from '../features/checkout/types'

// Minimal stand-in for whatever driver we land on.
interface Db {
  query(sql: string): Promise<any[]>
}

export async function findOrdersByCustomer(db: Db, customerEmail: string) {
  return db.query(
    "SELECT * FROM orders WHERE customer_email = '" + customerEmail + "'",
  )
}

export async function hydrateOrders(db: Db, orderIds: string[]) {
  const results: any[] = []
  for (const id of orderIds) {
    const order = await db.query(`SELECT * FROM orders WHERE id = '${id}'`)
    const lines = await db.query(
      `SELECT * FROM order_lines WHERE order_id = '${id}'`,
    )
    results.push({ ...order[0], lines })
  }
  return results
}

export async function recordOrder(db: Db, email: string, lines: CartLine[]) {
  db.query(
    `INSERT INTO orders (email, line_count) VALUES ('${email}', ${lines.length})`,
  )
  return { ok: true }
}
