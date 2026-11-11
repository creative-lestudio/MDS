import { tiers } from '../data'
import { useApp } from '../store'
import Icon from '../Icon'
const perks: Record<string, string[]> = { Bronce: ['Recordatorios de servicio', 'Cursos gratuitos'], Plata: ['10% en consumibles', 'Prioridad en agenda técnica'], Oro: ['15% en toda la tienda', 'Entradas preferentes a eventos', 'Asesor técnico dedicado'] }
export default function Profile() {
  const { name, points, enrolled, tickets, bookings } = useApp()
  const tier = [...tiers].reverse().find(t => points >= t.min)!; const next = tiers.find(t => t.min > points)
  return <>
    <p className="eyebrow">Tu cuenta</p><h1 className="large">Perfil</h1>
    <div className="hero profile"><div className="avatar big">{name[0]}</div><div><h2>{name}</h2><span className="badge">Nivel {tier.name}</span></div>
      <div className="pts-big"><b>{points}</b><small>puntos</small></div>
      {next && <div className="wide"><div className="bar"><i style={{ width: `${((points - tier.min) / (next.min - tier.min)) * 100}%` }} /></div><small>{next.min - points} pts para {next.name}</small></div>}</div>
    <div className="stats">{[['Cursos', enrolled.length, 'cap'], ['Entradas', tickets.length, 'ticket'], ['Servicios', bookings.length, 'wrench']].map(([l, n, i]) =>
      <div key={l as string} className="glass tile"><Icon n={i as string} /><b>{n}</b><small>{l}</small></div>)}</div>
    <h2 className="sec">Beneficios de tu nivel</h2>
    <div className="glass card">{perks[tier.name].map(p => <div key={p} className="perk"><Icon n="check" s={16} /> {p}</div>)}</div>
    <p className="muted">Ganas puntos al comprar, inscribirte a cursos y asistir a eventos. Canjéalos por descuentos próximamente.</p>
  </>
}
