import { tiers } from '../data'
import { useApp } from '../store'
export default function Profile() {
  const { name, points, enrolled, tickets, bookings } = useApp()
  const tier = [...tiers].reverse().find(t => points >= t.min)!; const next = tiers.find(t => t.min > points)
  return <>
    <h2>Mi perfil</h2>
    <div className="card hero"><h3>{name}</h3><p>Nivel <b>{tier.name}</b> · ⭐ {points} puntos</p>
      {next && <><div className="bar"><i style={{ width: `${((points - tier.min) / (next.min - tier.min)) * 100}%` }} /></div><small>{next.min - points} pts para {next.name}</small></>}</div>
    <div className="stats"><div className="card"><b>{enrolled.length}</b><small>Cursos</small></div><div className="card"><b>{tickets.length}</b><small>Entradas</small></div><div className="card"><b>{bookings.length}</b><small>Servicios</small></div></div>
    <p className="muted">Ganas puntos al comprar, inscribirte a cursos y asistir a eventos. Canjéalos por descuentos (próximamente).</p>
  </>
}
