import { useState } from 'react'
import { equipment, serviceTypes } from '../data'
import { useApp } from '../store'
import Icon from '../Icon'
export default function Services() {
  const { bookings, book } = useApp()
  const [f, setF] = useState({ equipmentId: equipment[0].id, type: serviceTypes[0], date: '', notes: '' }); const [ok, setOk] = useState(false)
  return <>
    <p className="eyebrow">Soporte técnico</p><h1 className="large">Servicio</h1>
    <div className="banner" style={{ backgroundImage: 'url(/img/servicios.webp)' }}><div><b>Ingenieros certificados Mindray</b><small>Preventivos, reparaciones y calibración</small></div></div>
    <form className="glass card form" onSubmit={e => { e.preventDefault(); book(f); setOk(true); setF({ ...f, date: '', notes: '' }) }}>
      <label><span><Icon n="cube" s={15} /> Equipo</span><select value={f.equipmentId} onChange={e => setF({ ...f, equipmentId: e.target.value })}>{equipment.map(q => <option key={q.id} value={q.id}>{q.model} · {q.serial}</option>)}</select></label>
      <label><span><Icon n="wrench" s={15} /> Tipo de servicio</span><select value={f.type} onChange={e => setF({ ...f, type: e.target.value })}>{serviceTypes.map(t => <option key={t}>{t}</option>)}</select></label>
      <label><span><Icon n="calendar" s={15} /> Fecha preferida</span><input type="date" required min={new Date().toISOString().slice(0, 10)} value={f.date} onChange={e => setF({ ...f, date: e.target.value })} /></label>
      <label><span><Icon n="doc" s={15} /> Detalle (opcional)</span><textarea rows={3} value={f.notes} onChange={e => setF({ ...f, notes: e.target.value })} placeholder="Describe la falla o necesidad" /></label>
      <button className="btn">Solicitar servicio</button>{ok && <small className="okt"><Icon n="check" s={14} /> Solicitud enviada. Te confirmaremos la cita.</small>}
    </form>
    <h2 className="sec">Mis solicitudes</h2>
    {bookings.length === 0 && <p className="muted">Aún no tienes solicitudes.</p>}
    {bookings.map(b => <div key={b.id} className="glass card"><div className="row"><b>{b.type}</b><span className="status ok">{b.status}</span></div>
      <small>{equipment.find(q => q.id === b.equipmentId)?.model} · {b.date}</small>{b.notes && <small>{b.notes}</small>}</div>)}
  </>
}
