import { useState } from 'react'
import { equipment, serviceTypes } from '../data'
import { useApp } from '../store'
export default function Services() {
  const { bookings, book } = useApp()
  const [f, setF] = useState({ equipmentId: equipment[0].id, type: serviceTypes[0], date: '', notes: '' }); const [ok, setOk] = useState(false)
  return <>
    <h2>Servicio técnico</h2>
    <form className="card form" onSubmit={e => { e.preventDefault(); book(f); setOk(true); setF({ ...f, date: '', notes: '' }) }}>
      <label>Equipo<select value={f.equipmentId} onChange={e => setF({ ...f, equipmentId: e.target.value })}>{equipment.map(q => <option key={q.id} value={q.id}>{q.model} · {q.serial}</option>)}</select></label>
      <label>Tipo de servicio<select value={f.type} onChange={e => setF({ ...f, type: e.target.value })}>{serviceTypes.map(t => <option key={t}>{t}</option>)}</select></label>
      <label>Fecha preferida<input type="date" required min={new Date().toISOString().slice(0, 10)} value={f.date} onChange={e => setF({ ...f, date: e.target.value })} /></label>
      <label>Detalle (opcional)<textarea rows={3} value={f.notes} onChange={e => setF({ ...f, notes: e.target.value })} placeholder="Describe la falla o necesidad" /></label>
      <button className="btn">Solicitar servicio</button>{ok && <small className="okt">✅ Solicitud enviada. Te confirmaremos la cita.</small>}
    </form>
    <h3>Mis solicitudes</h3>
    {bookings.length === 0 && <p className="muted">Aún no tienes solicitudes.</p>}
    {bookings.map(b => <div key={b.id} className="card"><div className="row"><b>{b.type}</b><span className="tag">{b.status}</span></div>
      <small>{equipment.find(q => q.id === b.equipmentId)?.model} · {b.date}</small>{b.notes && <small>{b.notes}</small>}</div>)}
  </>
}
