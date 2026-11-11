import { useState } from 'react'
import { courses } from '../data'
import { useApp } from '../store'
import Icon from '../Icon'
export default function Academy() {
  const { enrolled, enroll } = useApp(); const [open, setOpen] = useState<string | null>(null); const [f, setF] = useState<'Todos' | 'Gratis' | 'Pago'>('Todos')
  return <>
    <p className="eyebrow">Educación continua</p><h1 className="large">Academia</h1>
    <div className="seg">{(['Todos', 'Gratis', 'Pago'] as const).map(x => <button key={x} className={x === f ? 'on' : ''} onClick={() => setF(x)}>{x}</button>)}</div>
    {courses.filter(c => f === 'Todos' || (f === 'Gratis') === (c.price === 0)).map(c => { const mine = enrolled.includes(c.id)
      return <div key={c.id} className="glass course">
        <div className={'cover ' + c.level}><Icon n="cap" s={30} /><span className={'price ' + (c.price ? '' : 'free')}>{c.price ? `$${c.price}` : 'Gratis'}</span></div>
        <div className="body"><b>{c.title}</b><small>{c.level} · {c.hours} h · {c.instructor}</small><small>{c.desc}</small>
          {open === c.id && <ol className="lessons">{c.lessons.map(l => <li key={l}><Icon n={mine ? 'play' : 'lock'} s={14} /> {l}</li>)}</ol>}
          <div className="row"><button className="link" onClick={() => setOpen(open === c.id ? null : c.id)}>{open === c.id ? 'Ocultar contenido' : 'Ver contenido'}</button>
            {mine ? <span className="okt"><Icon n="check" s={14} /> Inscrito</span> : <button className="btn sm" onClick={() => enroll(c.id, c.price)}>{c.price ? 'Comprar' : 'Inscribirme'}</button>}</div></div></div> })}
  </>
}
