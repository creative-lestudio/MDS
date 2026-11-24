import { useState } from 'react'
import { events } from '../data'
import { useApp } from '../store'
import Icon from '../Icon'
const Qr = ({ code }: { code: string }) => { let h = 0; for (const ch of code) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  const cells = Array.from({ length: 49 }, () => { h = (h * 1103515245 + 12345) >>> 0; return (h >> 16) & 1 })
  return <div className="qr">{cells.map((c, i) => <i key={i} className={c ? 'on' : ''} />)}</div> }
export default function Events() {
  const { tickets, buyTicket } = useApp(); const [q, setQ] = useState<Record<string, number>>({})
  return <>
    <h1 className="large">Eventos</h1>
    <p className="lead">Experiencias presenciales de Mindray e Inversiones MDS.</p>
    {events.map(e => { const n = q[e.id] || 1, d = new Date(e.date + 'T12:00:00')
      return <div key={e.id} className="panel ev"><div className="head"><div className="dt"><b>{d.getDate()}</b><small>{d.toLocaleString('es', { month: 'short' })}</small></div>
        <div className="grow"><b>{e.title}</b><small><Icon n="pin" s={12} /> {e.place} · {e.seats} cupos</small></div>
        <span className={'price ' + (e.price ? '' : 'free')}>{e.price ? `$${e.price}` : 'Gratis'}</span></div>
        <p>{e.desc}</p>
        <div className="row"><span className="qty"><button aria-label="Menos" onClick={() => setQ({ ...q, [e.id]: Math.max(1, n - 1) })}><Icon n="minus" s={14} /></button>{n}<button aria-label="Más" onClick={() => setQ({ ...q, [e.id]: Math.min(10, n + 1) })}><Icon n="plus" s={14} /></button></span>
          <button className="btn sm" onClick={() => buyTicket(e.id, n, e.price)}>Obtener entrada</button></div></div> })}
    <h2 className="sec">Mis entradas</h2>
    {tickets.length === 0 ? <div className="empty">Todavía no tienes entradas.</div> :
      tickets.map(t => { const e = events.find(x => x.id === t.eventId)!
        return <div key={t.id} className="ticket"><div className="grow"><b>{e.title}</b><small>{e.date} · {t.qty} entrada(s)</small><code>{t.code}</code></div><Qr code={t.code} /></div> })}
  </>
}
