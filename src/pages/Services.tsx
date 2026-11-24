import { useState } from 'react'
import { equipment, serviceTypes } from '../data'
import { useApp } from '../store'
import Icon from '../Icon'
export default function Services() {
  const { bookings, book } = useApp()
  const [f, setF] = useState({ equipmentId: equipment[0].id, type: serviceTypes[0], date: '', notes: '' }); const [ok, setOk] = useState(false)
  return <>
    <h1 className="large">Servicio técnico</h1>
    <p className="lead">Solicita una visita de nuestros ingenieros certificados Mindray.</p>
    <form className="panel form" onSubmit={e => { e.preventDefault(); book(f); setOk(true); setF({ ...f, date: '', notes: '' }) }}>
      <label htmlFor="eq">Equipo<select id="eq" value={f.equipmentId} onChange={e => setF({ ...f, equipmentId: e.target.value })}>{equipment.map(q => <option key={q.id} value={q.id}>{q.model} · {q.serial}</option>)}</select></label>
      <label htmlFor="tp">Tipo de servicio<select id="tp" value={f.type} onChange={e => setF({ ...f, type: e.target.value })}>{serviceTypes.map(t => <option key={t}>{t}</option>)}</select></label>
      <label htmlFor="dt">Fecha preferida<input id="dt" type="date" required min={new Date().toISOString().slice(0, 10)} value={f.date} onChange={e => setF({ ...f, date: e.target.value })} /></label>
      <label htmlFor="nt">Detalle (opcional)<textarea id="nt" rows={3} value={f.notes} onChange={e => setF({ ...f, notes: e.target.value })} placeholder="Describe la falla o necesidad" /></label>
      <button className="btn block">Solicitar servicio</button>{ok && <div className="note ok"><Icon n="check" s={18} /> Solicitud enviada. Te confirmaremos la cita.</div>}
    </form>
    <h2 className="sec">Mis solicitudes</h2>
    {bookings.length === 0 ? <div className="empty">Aún no tienes solicitudes.</div> :
      <div className="group">{bookings.map(b => <div key={b.id} className="li"><div className="grow"><b>{b.type}</b><small>{equipment.find(q => q.id === b.equipmentId)?.model} · {b.date}</small>{b.notes && <small>{b.notes}</small>}</div><span className="st ok"><i />{b.status}</span></div>)}</div>}
  </>
}
