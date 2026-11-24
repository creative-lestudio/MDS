import { useState } from 'react'
import { products } from '../data'
import { useApp } from '../store'
import Icon, { catIcon } from '../Icon'
import resona from '../assets/resona.webp'
const cats = ['Todos', 'Equipos', 'Transductores', 'Consumibles', 'Accesorios']
export default function Shop() {
  const { cart, addToCart, setQty, checkout } = useApp()
  const [cat, setCat] = useState('Todos'); const [done, setDone] = useState(false)
  const items = Object.entries(cart).map(([id, q]) => ({ p: products.find(x => x.id === id)!, q }))
  const total = items.reduce((a, i) => a + i.p.price * i.q, 0)
  return <>
    <h1 className="large">Tienda</h1>
    <div className="seg">{cats.map(c => <button key={c} className={c === cat ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}</div>
    <div className="grid">{products.filter(p => cat === 'Todos' || p.cat === cat).map(p => <div key={p.id} className="prod">
      <div className="vis">{p.cat === 'Equipos' ? <img src={resona} alt="" /> : <Icon n={catIcon(p.cat)} s={38} />}</div>
      <small className="cat">{p.cat}</small><b>{p.name}</b><span className="desc">{p.desc}</span>
      <div className="row"><strong>{p.price ? `$${p.price.toLocaleString('en-US')}` : 'Cotizar'}</strong>
        <button className="round" aria-label="Agregar" onClick={() => { setDone(false); addToCart(p.id) }}><Icon n="plus" s={18} /></button></div></div>)}</div>
    {items.length > 0 && <><h2 className="sec">Tu pedido</h2><div className="group">
      {items.map(({ p, q }) => <div key={p.id} className="li"><div className="grow"><b>{p.name}</b><small>${p.price.toLocaleString('en-US')}</small></div>
        <span className="qty"><button onClick={() => setQty(p.id, q - 1)}><Icon n="minus" s={14} /></button>{q}<button onClick={() => setQty(p.id, q + 1)}><Icon n="plus" s={14} /></button></span></div>)}
      <div className="li total"><div className="grow">Total</div><b>${total.toLocaleString('en-US')}</b></div></div>
      <button className="btn block" onClick={() => { checkout(total); setDone(true) }}>Confirmar pedido · +{Math.round(total / 10)} pts</button></>}
    {done && <div className="note ok"><Icon n="check" s={18} /> Pedido registrado. Un asesor te contactará para coordinar pago y entrega.</div>}
  </>
}
