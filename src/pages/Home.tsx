import { useState } from 'react'
import { Link } from 'react-router-dom'
import { equipment, offers, events } from '../data'
import { useApp } from '../store'
import Icon from '../Icon'
import resona from '../assets/resona.webp'
export const dueDate = (last: string, m: number) => { const d = new Date(last); d.setMonth(d.getMonth() + m); return d }
export const daysTo = (d: Date) => Math.ceil((d.getTime() - Date.now()) / 864e5)
const Ring = ({ pct, late, label }: { pct: number; late: boolean; label: string }) => {
  const r = 30, c = 2 * Math.PI * r
  return <div className="ring"><svg width="76" height="76" viewBox="0 0 76 76"><circle cx="38" cy="38" r={r} className="trk" />
    <circle cx="38" cy="38" r={r} className={'val ' + (late ? 'late' : '')} strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(1, pct))} transform="rotate(-90 38 38)" /></svg><b>{label}</b></div>
}
export default function Home() {
  const { name, bookings } = useApp(); const [copied, setCopied] = useState('')
  const next = events.filter(e => new Date(e.date) > new Date()).sort((a, b) => a.date.localeCompare(b.date))[0]
  const copy = (code: string) => { try { navigator.clipboard?.writeText(code) } catch {} setCopied(code); setTimeout(() => setCopied(''), 1500) }
  const dt = next && new Date(next.date + 'T12:00:00')
  return <>
    <p className="eyebrow">Bienvenido</p><h1 className="large">Hola, {name.split(' ')[0]}</h1>
    <section className="hero">
      <div><span className="badge">Ecosistema Mindray</span><h2>Servicio, formación y comunidad para tu ecógrafo</h2>
        <Link to="/servicios" className="btn light">Agendar servicio <Icon n="chevron" s={16} /></Link></div>
      <img src={resona} alt="Mindray Resona I9" />
    </section>
    <div className="quick">{[['/tienda', 'bag', 'Tienda'], ['/servicios', 'wrench', 'Agendar'], ['/academia', 'cap', 'Cursos'], ['/eventos', 'ticket', 'Eventos']].map(([to, i, l]) =>
      <Link key={to} to={to} className="glass tile"><span className="ico"><Icon n={i} /></span>{l}</Link>)}</div>
    <h2 className="sec">Mis equipos</h2>
    <div className="hscroll">{equipment.map(e => {
      const total = e.intervalMonths * 30.4, d = daysTo(dueDate(e.lastService, e.intervalMonths)), late = d < 30
      return <Link to="/servicios" key={e.id} className={'glass eq ' + (late ? 'warn' : '')}>
        <Ring pct={1 - d / total} late={late} label={d < 0 ? '!' : String(d)} />
        <div><b>{e.model}</b><small>S/N {e.serial}</small>
          <span className={'status ' + (late ? 'late' : 'ok')}>{d < 0 ? `Vencido hace ${-d} d` : `Preventivo en ${d} días`}</span></div></Link> })}</div>
    {bookings[0] && <div className="glass card"><small>Último servicio solicitado</small><b>{bookings[0].type}</b><small>{bookings[0].date} · {bookings[0].status}</small></div>}
    <h2 className="sec">Beneficios para ti</h2>
    {offers.map(o => <div key={o.id} className="glass card offer"><span className="ico cyan"><Icon n="tag" /></span>
      <div><b>{o.title}</b><small>{o.desc}</small></div>
      <button className="code" onClick={() => copy(o.code)}>{copied === o.code ? <><Icon n="check" s={14} /> Copiado</> : <>{o.code} <Icon n="copy" s={14} /></>}</button></div>)}
    {next && dt && <><h2 className="sec">Próximo evento</h2>
      <Link to="/eventos" className="glass card evrow"><div className="date"><b>{dt.getDate()}</b><small>{dt.toLocaleString('es', { month: 'short' })}</small></div>
        <div><b>{next.title}</b><small><Icon n="pin" s={13} /> {next.place}</small></div><Icon n="chevron" s={18} /></Link></>}
    <Link to="/asesor" className="glass card ai"><span className="ico cyan"><Icon n="sparkle" fill /></span><div><b>Pregúntale al Asesor IA</b><small>Aprende a sacarle el máximo a tu ecógrafo.</small></div><Icon n="chevron" s={18} /></Link>
  </>
}
