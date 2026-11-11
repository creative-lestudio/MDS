import { useState } from 'react'
import { products } from '../data'
import { useApp } from '../store'
import Icon, { catIcon } from '../Icon'
import resona from '../assets/resona.webp'
import productos from '../assets/productos.webp'
const cats = ['Todos', 'Equipos', 'Transductores', 'Consumibles', 'Accesorios']
export default function Shop() {
  const { cart, addToCart, setQty, checkout } = useApp()
  const [cat, setCat] = useState('Todos'); const [done, setDone] = useState(false)
  const items = Object.entries(cart).map(([id, q]) => ({ p: products.find(x => x.id === id)!, q }))
  const total = items.reduce((a, i) => a + i.p.price * i.q, 0)
  return <>
    <p className="eyebrow">Catálogo</p><h1 className="large">Tienda</h1>
    <div className="banner" style={{ backgroundImage: `url(${productos})` }}><div><b>Todo para tu ecógrafo</b><small>Transductores, consumibles y accesorios originales</small></div></div>
    <div className="seg">{cats.map(c => <button key={c} className={c === cat ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}</div>
    <div className="grid">{products.filter(p => cat === 'Todos' || p.cat === cat).map(p => <div key={p.id} className="glass prod">
      <div className={'vis ' + p.cat}>{p.cat === 'Equipos' ? <img src={resona} alt="" /> : <Icon n={catIcon(p.cat)} s={44} />}</div>
      <b>{p.name}</b><small>{p.desc}</small>
      <div className="row"><strong>{p.price ? `$${p.price.toLocaleString('en-US')}` : 'Cotizar'}</strong>
        <button className="round" aria-label="Agregar" onClick={() => { setDone(false); addToCart(p.id) }}><Icon n="plus" s={18} /></button></div></div>)}</div>
    {items.length > 0 && <div className="glass card cartc"><h3>Tu carrito</h3>
      {items.map(({ p, q }) => <div key={p.id} className="row"><span>{p.name}</span>
        <span className="qty"><button onClick={() => setQty(p.id, q - 1)}><Icon n="minus" s={14} /></button>{q}<button onClick={() => setQty(p.id, q + 1)}><Icon n="plus" s={14} /></button></span></div>)}
      <div className="row total"><span>Total</span><b>${total.toLocaleString('en-US')}</b></div>
      <button className="btn" onClick={() => { checkout(total); setDone(true) }}>Confirmar pedido · +{Math.round(total / 10)} pts</button></div>}
    {done && <div className="glass card okc"><Icon n="check" /> <span>Pedido registrado. Un asesor te contactará para coordinar pago y entrega.</span></div>}
  </>
}
