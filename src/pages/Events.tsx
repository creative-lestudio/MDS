import { useState } from 'react'
import { events } from '../data'
import { useApp } from '../store'
export default function Events() {
  const { tickets, buyTicket } = useApp(); const [q, setQ] = useState<Record<string, number>>({})
  return <>
    <h2>Eventos y experiencias</h2>
    {events.map(e => { const n = q[e.id] || 1
      return <div key={e.id} className="card"><div className="row"><b>{e.emoji} {e.title}</b><span className={'tag ' + (e.price ? '' : 'free')}>{e.price ? `$${e.price}` : 'Gratis'}</span></div>
        <small>{e.date} · {e.place} · {e.seats} cupos</small><small>{e.desc}</small>
        <div className="row"><span className="qty"><button onClick={() => setQ({ ...q, [e.id]: Math.max(1, n - 1) })}>−</button>{n}<button onClick={() => setQ({ ...q, [e.id]: Math.min(10, n + 1) })}>+</button></span>
          <button className="btn sm" onClick={() => buyTicket(e.id, n, e.price)}>Obtener entrada</button></div></div> })}
    <h3>Mis entradas</h3>
    {tickets.length === 0 && <p className="muted">Todavía no tienes entradas.</p>}
    {tickets.map(t => { const e = events.find(x => x.id === t.eventId)!
      return <div key={t.id} className="card ticket"><div><b>{e.title}</b><small>{e.date} · {t.qty} entrada(s)</small></div><code>{t.code}</code></div> })}
  </>
}
