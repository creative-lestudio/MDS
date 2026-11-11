import { useEffect, useRef, useState } from 'react'
import { ask } from '../advisor'
type M = { r: 'u' | 'a'; t: string }
const sugg = ['¿Cómo ajusto la ganancia?', '¿Qué transductor uso para abdomen?', '¿Cómo limpio el transductor?', '¿Cómo mejoro el Doppler color?']
export default function Advisor() {
  const [m, setM] = useState<M[]>([{ r: 'a', t: 'Hola 👋 Soy el asesor IA de MDS. Pregúntame sobre las funciones de tu ecógrafo Mindray.' }]); const [v, setV] = useState(''); const [busy, setBusy] = useState(false)
  const end = useRef<HTMLDivElement>(null); useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }) }, [m])
  const send = async (t: string) => { if (!t.trim() || busy) return; setM(x => [...x, { r: 'u', t }]); setV(''); setBusy(true); const a = await ask(t); setM(x => [...x, { r: 'a', t: a }]); setBusy(false) }
  const fmt = (s: string) => s.split(/\*\*(.+?)\*\*/g).map((p, i) => i % 2 ? <b key={i}>{p}</b> : p)
  return <div className="chat"><h2>Asesor IA</h2>
    <div className="msgs">{m.map((x, i) => <div key={i} className={'bubble ' + x.r}>{fmt(x.t)}</div>)}{busy && <div className="bubble a">…</div>}<div ref={end} /></div>
    <div className="chips">{sugg.map(s => <button key={s} onClick={() => send(s)}>{s}</button>)}</div>
    <form className="send" onSubmit={e => { e.preventDefault(); send(v) }}><input value={v} onChange={e => setV(e.target.value)} placeholder="Escribe tu pregunta…" /><button className="btn">Enviar</button></form>
    <small className="muted">Orientación técnica sobre el uso del equipo; no sustituye criterio clínico ni el manual oficial.</small></div>
}
