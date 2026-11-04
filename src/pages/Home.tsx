import { Link } from 'react-router-dom'
import { equipment, offers, events } from '../data'
import { useApp } from '../store'
export const dueDate = (last: string, m: number) => { const d = new Date(last); d.setMonth(d.getMonth() + m); return d }
export const daysTo = (d: Date) => Math.ceil((d.getTime() - Date.now()) / 864e5)
export default function Home() {
  const { name, bookings } = useApp()
  const next = events.filter(e => new Date(e.date) > new Date()).sort((a, b) => a.date.localeCompare(b.date))[0]
  return <>
    <section className="hero"><h1>Hola, {name} 👋</h1><p>Tu ecosistema Mindray: equipos, servicio, formación y comunidad.</p></section>
    <h2>Recordatorios de servicio</h2>
    {equipment.map(e => { const d = daysTo(dueDate(e.lastService, e.intervalMonths)); const late = d < 30
      return <div key={e.id} className={'card row ' + (late ? 'warn' : '')}><div><b>{e.model}</b><small>S/N {e.serial}</small>
        <small>{d < 0 ? `Preventivo vencido hace ${-d} días` : `Próximo preventivo en ${d} días`}</small></div>
        <Link className="btn sm" to="/servicios">Agendar</Link></div> })}
    {bookings[0] && <div className="card"><small>Último servicio solicitado</small><b>{bookings[0].type}</b><small>{bookings[0].date} · {bookings[0].status}</small></div>}
    <h2>Descuentos para ti</h2>
    {offers.map(o => <div key={o.id} className="card offer"><b>{o.title}</b><small>{o.desc}</small><code>{o.code}</code></div>)}
    {next && <><h2>Próximo evento</h2><Link to="/eventos" className="card"><b>{next.emoji} {next.title}</b><small>{next.date} · {next.place}</small></Link></>}
    <Link to="/asesor" className="card ai"><b>🤖 Pregúntale al Asesor IA</b><small>Aprende a sacarle el máximo a tu ecógrafo.</small></Link>
  </>
}
