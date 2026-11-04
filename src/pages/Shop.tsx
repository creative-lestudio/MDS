import { useState } from 'react'
import { products } from '../data'
import { useApp } from '../store'
const cats = ['Todos', 'Equipos', 'Transductores', 'Consumibles', 'Accesorios']
export default function Shop() {
  const { cart, addToCart, setQty, checkout } = useApp()
  const [cat, setCat] = useState('Todos'); const [done, setDone] = useState(false)
  const items = Object.entries(cart).map(([id, q]) => ({ p: products.find(x => x.id === id)!, q }))
  const total = items.reduce((a, i) => a + i.p.price * i.q, 0)
  return <>
    <h2>Tienda</h2>
    <div className="chips">{cats.map(c => <button key={c} className={c === cat ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}</div>
    <div className="grid">{products.filter(p => cat === 'Todos' || p.cat === cat).map(p => <div key={p.id} className="card prod">
      <div className="emoji">{p.emoji}</div><b>{p.name}</b><small>{p.desc}</small>
      <div className="row"><strong>{p.price ? `$${p.price}` : 'Cotizar'}</strong>
        <button className="btn sm" onClick={() => { setDone(false); addToCart(p.id) }}>{p.price ? 'Agregar' : 'Solicitar'}</button></div></div>)}</div>
    {items.length > 0 && <div className="card"><h3>Carrito</h3>
      {items.map(({ p, q }) => <div key={p.id} className="row"><span>{p.name}</span>
        <span className="qty"><button onClick={() => setQty(p.id, q - 1)}>−</button>{q}<button onClick={() => setQty(p.id, q + 1)}>+</button></span></div>)}
      <div className="row"><b>Total</b><b>${total}</b></div>
      <button className="btn" onClick={() => { checkout(total); setDone(true) }}>Confirmar pedido (+{Math.round(total / 10)} pts)</button></div>}
    {done && <div className="card ok">✅ Pedido registrado. Un asesor te contactará para coordinar pago y entrega.</div>}
  </>
}
