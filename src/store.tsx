import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
export type Booking = { id: string; equipmentId: string; type: string; date: string; notes: string; status: 'Solicitado' | 'Confirmado' }
export type Ticket = { id: string; eventId: string; qty: number; code: string }
type State = { cart: Record<string, number>; bookings: Booking[]; enrolled: string[]; tickets: Ticket[]; points: number; name: string }
const init: State = { cart: {}, bookings: [], enrolled: [], tickets: [], points: 320, name: 'Cliente MDS' }
type Ctx = State & {
  addToCart(id: string): void; setQty(id: string, q: number): void; checkout(total: number): void
  book(b: Omit<Booking, 'id' | 'status'>): void; enroll(id: string, price: number): void; buyTicket(eventId: string, qty: number, price: number): void
}
const C = createContext<Ctx>(null as never)
export const useApp = () => useContext(C)
export function Provider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<State>(() => { try { return { ...init, ...JSON.parse(localStorage.getItem('mds') || '{}') } } catch { return init } })
  useEffect(() => { try { localStorage.setItem('mds', JSON.stringify(s)) } catch {} }, [s])
  const uid = () => Math.random().toString(36).slice(2, 8).toUpperCase()
  const pts = (amt: number) => Math.round(amt / 10)
  const v: Ctx = {
    ...s,
    addToCart: id => setS(p => ({ ...p, cart: { ...p.cart, [id]: (p.cart[id] || 0) + 1 } })),
    setQty: (id, q) => setS(p => { const c = { ...p.cart }; if (q <= 0) delete c[id]; else c[id] = q; return { ...p, cart: c } }),
    checkout: total => setS(p => ({ ...p, cart: {}, points: p.points + pts(total) })),
    book: b => setS(p => ({ ...p, bookings: [{ ...b, id: uid(), status: 'Solicitado' }, ...p.bookings] })),
    enroll: (id, price) => setS(p => p.enrolled.includes(id) ? p : { ...p, enrolled: [...p.enrolled, id], points: p.points + pts(price) + 20 }),
    buyTicket: (eventId, qty, price) => setS(p => ({ ...p, tickets: [{ id: uid(), eventId, qty, code: 'MDS-' + uid() }, ...p.tickets], points: p.points + pts(price * qty) + 10 })),
  }
  return <C.Provider value={v}>{children}</C.Provider>
}
