import { useState } from 'react'
import { Link } from 'react-router-dom'
import { equipment, offers, events } from '../data'
import { useApp } from '../store'
import Icon from '../Icon'
import resona from '../assets/resona.webp'
export const dueDate = (last: string, m: number) => { const d = new Date(last); d.setMonth(d.getMonth() + m); return d }
export const daysTo = (d: Date) => Math.ceil((d.getTime() - Date.now()) / 864e5)
const Ring = ({ pct, late, label }: { pct: number; late: boolean; label: string }) => {
  const r = 19, c = 2 * Math.PI * r
  return <div className="ring"><svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r={r} className="trk" />
    <circle cx="24" cy="24" r={r} className={'val ' + (late ? 'late' : '')} strokeDasharray={c} strokeDashoffset={c * (1 - Math.max(.04, Math.min(1, pct)))} transform="rotate(-90 24 24)" /></svg><b>{label}</b></div>
}
export default function Home() {
  const { name, bookings } = useApp(); const [copied, setCopied] = useState('')
  const h = new Date().getHours(), hi = h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches'
  const today = new Date().toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' }).replace(/ De /g, ' de ')
  const next = events.filter(e => new Date(e.date) > new Date()).sort((a, b) => a.date.localeCompare(b.date))[0]
  const copy = (code: string) => { try { navigator.clipboard?.writeText(code) } catch {} setCopied(code); setTimeout(() => setCopied(''), 1500) }
  const dt = next && new Date(next.date + 'T12:00:00')
  return <>
    <p className="date-line">{today}</p><h1 className="large">{hi}, {name.split(' ')[0]}</h1>
    <section className="feature"><div><span className="label">Servicio técnico</span><h2>Cuidamos de tu ecógrafo</h2>
      <p>Preventivos, reparaciones y soporte de ingenieros certificados Mindray.</p>
      <Link to="/servicios" className="btn">Agendar servicio</Link></div>
      <div className="pic"><img src={resona} alt="Mindray Resona I9" /></div></section>
    <div className="quick">{[['/tienda', 'bag', 'Tienda'], ['/academia', 'cap', 'Cursos'], ['/eventos', 'ticket', 'Eventos'], ['/asesor', 'sparkle', 'Asesor']].map(([to, i, l]) =>
      <Link key={to} to={to} className="tile"><Icon n={i} s={22} />{l}</Link>)}</div>
    <h2 className="sec">Mis equipos</h2>
    <div className="group">{equipment.map(e => {
      const total = e.intervalMonths * 30.4, d = daysTo(dueDate(e.lastService, e.intervalMonths)), late = d < 30
      return <Link to="/servicios" key={e.id} className="li">
        <Ring pct={1 - d / total} late={late} label={d < 0 ? '!' : String(d)} />
        <div className="grow"><b>{e.model}</b><small>S/N {e.serial}</small>
          <span className={'st ' + (late ? 'late' : 'ok')}><i />{d < 0 ? `Preventivo vencido hace ${-d} días` : `Preventivo en ${d} días`}</span></div><Icon n="chevron" s={16} /></Link> })}</div>
    {bookings[0] && <><h2 className="sec">Última solicitud</h2><div className="group"><div className="li"><div className="grow"><b>{bookings[0].type}</b><small>{bookings[0].date}</small></div><span className="st ok"><i />{bookings[0].status}</span></div></div></>}
    <h2 className="sec">Beneficios</h2>
    <div className="group">{offers.map(o => <div key={o.id} className="li"><span className="ico"><Icon n="tag" s={20} /></span>
      <div className="grow"><b>{o.title}</b><small>{o.desc}</small></div>
      <button className="code" onClick={() => copy(o.code)}>{copied === o.code ? 'Copiado' : o.code}</button></div>)}</div>
    {next && dt && <><h2 className="sec">Próximo evento</h2><div className="group"><Link to="/eventos" className="li"><div className="dt"><b>{dt.getDate()}</b><small>{dt.toLocaleString('es', { month: 'short' })}</small></div>
      <div className="grow"><b>{next.title}</b><small>{next.place}</small></div><Icon n="chevron" s={16} /></Link></div></>}
  </>
}
