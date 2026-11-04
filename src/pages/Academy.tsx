import { useState } from 'react'
import { courses } from '../data'
import { useApp } from '../store'
export default function Academy() {
  const { enrolled, enroll } = useApp(); const [open, setOpen] = useState<string | null>(null); const [f, setF] = useState<'Todos' | 'Gratis' | 'Pago'>('Todos')
  return <>
    <h2>Academia</h2>
    <div className="chips">{(['Todos', 'Gratis', 'Pago'] as const).map(x => <button key={x} className={x === f ? 'on' : ''} onClick={() => setF(x)}>{x}</button>)}</div>
    {courses.filter(c => f === 'Todos' || (f === 'Gratis') === (c.price === 0)).map(c => { const mine = enrolled.includes(c.id)
      return <div key={c.id} className="card"><div className="row"><b>{c.title}</b><span className={'tag ' + (c.price ? '' : 'free')}>{c.price ? `$${c.price}` : 'Gratis'}</span></div>
        <small>{c.level} · {c.hours} h · {c.instructor}</small><small>{c.desc}</small>
        {open === c.id && <ol>{c.lessons.map(l => <li key={l}>{mine ? '▶️ ' : '🔒 '}{l}</li>)}</ol>}
        <div className="row"><button className="link" onClick={() => setOpen(open === c.id ? null : c.id)}>{open === c.id ? 'Ocultar' : 'Ver contenido'}</button>
          {mine ? <span className="okt">Inscrito ✓</span> : <button className="btn sm" onClick={() => enroll(c.id, c.price)}>{c.price ? 'Comprar' : 'Inscribirme'}</button>}</div></div> })}
  </>
}
