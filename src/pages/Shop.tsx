import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useApp } from '../store'
import Icon from '../Icon'
import raw from '../products.json'
type P = { id: string; name: string; cat: string; kind: string; apps: string[]; summary: string; feats: string[][]; page: string }
const products = raw as P[]
const imgs = import.meta.glob('../assets/products/*.webp', { eager: true, import: 'default' }) as Record<string, string>
const img = (id: string) => imgs[`../assets/products/${id}.webp`]
const cats = ['Todos', 'Portátiles', 'Estacionarios']
export default function Shop() {
  const { cart, addToCart, setQty, checkout } = useApp()
  const [cat, setCat] = useState('Todos'); const [done, setDone] = useState(false); const [open, setOpen] = useState<P | null>(null)
  const items = Object.keys(cart).map(id => products.find(x => x.id === id)).filter(Boolean) as P[]
  const add = (p: P) => { setDone(false); if (!cart[p.id]) addToCart(p.id) }
  useEffect(() => { if (!open) return; const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [open])
  const list = products.filter(p => cat === 'Todos' || p.cat === cat)
  return <>
    <h1 className="large">Tienda</h1>
    <p className="lead">Ecógrafos Mindray. Elige tus equipos y solicita una cotización personalizada.</p>
    <div className="seg">{cats.map(c => <button key={c} className={c === cat ? 'on' : ''} onClick={() => setCat(c)}>{c} · {c === 'Todos' ? products.length : products.filter(p => p.cat === c).length}</button>)}</div>
    <div className="grid">{list.map(p => <button key={p.id} className="prod" onClick={() => setOpen(p)} aria-label={`Ver ${p.name}`}>
      <div className="vis"><img src={img(p.id)} alt={p.name} loading="lazy" /></div>
      <small className="cat">{p.kind}</small><b>{p.name}</b>
      <span className="apps">{p.apps.slice(0, 2).join(' · ')}{p.apps.length > 2 ? ` +${p.apps.length - 2}` : ''}</span>
      <div className="row"><span className="more">Ver ficha</span>
        <span className={'round' + (cart[p.id] ? ' on' : '')} role="button" aria-label={cart[p.id] ? 'En tu cotización' : 'Agregar a cotización'} onClick={e => { e.stopPropagation(); add(p) }}><Icon n={cart[p.id] ? 'check' : 'plus'} s={18} /></span></div></button>)}</div>
    {items.length > 0 && <><h2 className="sec">Mi cotización</h2><div className="group">
      {items.map(p => <div key={p.id} className="qitem"><span className="thumb"><img src={img(p.id)} alt="" /></span><div className="grow"><b>{p.name}</b><small>{p.kind}</small></div>
        <button className="round" aria-label={`Quitar ${p.name}`} onClick={() => setQty(p.id, 0)}><Icon n="minus" s={16} /></button></div>)}</div>
      <button className="btn block" onClick={() => { checkout(0); setDone(true) }}>Solicitar cotización ({items.length})</button></>}
    {done && <div className="note ok"><Icon n="check" s={18} /> Solicitud registrada. Un asesor de Inversiones MDS te contactará con tu cotización.</div>}
    {open && createPortal(<div className="scrim" onClick={() => setOpen(null)}><div className="sheet" role="dialog" aria-label={open.name} onClick={e => e.stopPropagation()}>
      <div className="grab" /><button className="round x" aria-label="Cerrar" onClick={() => setOpen(null)}><Icon n="x" s={16} /></button>
      <div className="big"><img src={img(open.id)} alt={open.name} /></div>
      <span className="label">{open.kind}</span><h2>{open.name}</h2>
      {open.apps.length > 0 && <div className="chips">{open.apps.map(a => <span key={a}>{a}</span>)}</div>}
      <p>{open.summary}</p>
      {open.feats.map(([t, d]) => <div key={t} className="feat"><b>{t}</b><span>{d}</span></div>)}
      <button className="btn block" onClick={() => { add(open); setOpen(null) }}>{cart[open.id] ? 'Ya está en tu cotización' : 'Agregar a mi cotización'}</button>
      <a className="ext" href={open.page} target="_blank" rel="noopener noreferrer">Ver ficha completa en inversionesmds.com</a></div></div>, document.body)}
  </>
}
