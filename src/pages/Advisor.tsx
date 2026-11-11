import { useEffect, useRef, useState } from 'react'
import { ask } from '../advisor'
import Icon from '../Icon'
type M = { r: 'u' | 'a'; t: string }
const sugg = ['¿Cómo ajusto la ganancia?', '¿Qué transductor uso para abdomen?', '¿Cómo limpio el transductor?', '¿Cómo mejoro el Doppler color?']
export default function Advisor() {
  const [m, setM] = useState<M[]>([{ r: 'a', t: 'Hola, soy el asesor IA de MDS. Pregúntame sobre las funciones de tu ecógrafo Mindray.' }]); const [v, setV] = useState(''); const [busy, setBusy] = useState(false)
  const end = useRef<HTMLDivElement>(null); useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [m, busy])
  const send = async (t: string) => { if (!t.trim() || busy) return; setM(x => [...x, { r: 'u', t }]); setV(''); setBusy(true); const a = await ask(t); setM(x => [...x, { r: 'a', t: a }]); setBusy(false) }
  const fmt = (s: string) => s.split(/\*\*(.+?)\*\*/g).map((p, i) => i % 2 ? <b key={i}>{p}</b> : p)
  return <div className="chat">
    <div className="chathead"><span className="ico cyan"><Icon n="sparkle" fill /></span><div><b>Asesor MDS</b><small><i className="dot" /> En línea</small></div></div>
    <div className="msgs">{m.map((x, i) => <div key={i} className={'bubble ' + x.r}>{fmt(x.t)}</div>)}{busy && <div className="bubble a typing"><i /><i /><i /></div>}<div ref={end} /></div>
    <div className="seg sugg">{sugg.map(s => <button key={s} onClick={() => send(s)}>{s}</button>)}</div>
    <form className="send glass" onSubmit={e => { e.preventDefault(); send(v) }}><input value={v} onChange={e => setV(e.target.value)} placeholder="Escribe tu pregunta…" /><button className="round on" aria-label="Enviar"><Icon n="send" s={18} /></button></form>
    <small className="muted fine">Orientación técnica sobre el uso del equipo; no sustituye criterio clínico ni el manual oficial.</small></div>
}
