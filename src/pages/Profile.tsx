import { tiers } from '../data'
import { useApp } from '../store'
import Icon from '../Icon'
const perks: Record<string, string[]> = { Bronce: ['Recordatorios de servicio', 'Cursos gratuitos'], Plata: ['10% en consumibles', 'Prioridad en agenda técnica'], Oro: ['15% en toda la tienda', 'Entradas preferentes a eventos', 'Asesor técnico dedicado'] }
export default function Profile() {
  const { name, points, enrolled, tickets, bookings } = useApp()
  const tier = [...tiers].reverse().find(t => points >= t.min)!; const next = tiers.find(t => t.min > points)
  return <>
    <h1 className="large">Perfil</h1>
    <div className="panel prof"><div className="head"><b className="avatar big">{name[0]}</b><div className="grow"><b>{name}</b><small>Nivel {tier.name}</small></div>
      <div className="pts-big"><b>{points}</b><small>puntos</small></div></div>
      {next && <><div className="bar"><i style={{ width: `${((points - tier.min) / (next.min - tier.min)) * 100}%` }} /></div><small>{next.min - points} puntos para el nivel {next.name}</small></>}</div>
    <div className="group stats">{[['Cursos', enrolled.length], ['Entradas', tickets.length], ['Servicios', bookings.length]].map(([l, n]) =>
      <div key={l as string}><b>{n}</b><small>{l}</small></div>)}</div>
    <h2 className="sec">Beneficios de tu nivel</h2>
    <div className="group">{perks[tier.name].map(p => <div key={p} className="li"><Icon n="check" s={18} /><div className="grow">{p}</div></div>)}</div>
    <p className="lead">Ganas puntos al comprar, inscribirte a cursos y asistir a eventos. Podrás canjearlos por descuentos.</p>
  </>
}
