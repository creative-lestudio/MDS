// Datos de ejemplo. En producción se reemplazan por tablas de Supabase (ver supabase/schema.sql).
export type Product = { id: string; name: string; cat: 'Transductores' | 'Consumibles' | 'Accesorios' | 'Equipos'; price: number; desc: string; emoji: string }
export const products: Product[] = [
  { id: 'p1', name: 'Transductor lineal L12-4', cat: 'Transductores', price: 1850, desc: 'Alta resolución para partes blandas y vascular.', emoji: '📡' },
  { id: 'p2', name: 'Transductor convexo C5-1', cat: 'Transductores', price: 1690, desc: 'Abdomen y obstetricia.', emoji: '📡' },
  { id: 'p3', name: 'Gel ecográfico 5L', cat: 'Consumibles', price: 28, desc: 'Hipoalergénico, alta conductividad.', emoji: '🧴' },
  { id: 'p4', name: 'Papel térmico (pack x10)', cat: 'Consumibles', price: 45, desc: 'Compatible con impresoras Mindray.', emoji: '🧾' },
  { id: 'p5', name: 'Funda protectora para transductor', cat: 'Accesorios', price: 35, desc: 'Pack de 50 unidades estériles.', emoji: '🛡️' },
  { id: 'p6', name: 'Carro móvil con soporte', cat: 'Accesorios', price: 420, desc: 'Ajustable en altura, 4 ruedas con freno.', emoji: '🛒' },
  { id: 'p7', name: 'Mindray DC-70 (consulta)', cat: 'Equipos', price: 0, desc: 'Ecógrafo premium. Solicita cotización.', emoji: '🩻' },
]
export type Course = { id: string; title: string; level: string; hours: number; price: number; instructor: string; desc: string; lessons: string[] }
export const courses: Course[] = [
  { id: 'c1', title: 'Fundamentos de ecografía', level: 'Básico', hours: 3, price: 0, instructor: 'Equipo MDS', desc: 'Física del ultrasonido, perillas y modos esenciales.', lessons: ['Física del ultrasonido', 'Modos B, M y Doppler', 'Optimización de imagen', 'Cuidado del transductor'] },
  { id: 'c2', title: 'Cuidado y mantenimiento de tu equipo', level: 'Básico', hours: 1, price: 0, instructor: 'Soporte técnico MDS', desc: 'Buenas prácticas para alargar la vida útil.', lessons: ['Limpieza diaria', 'Desinfección de transductores', 'Señales de alerta'] },
  { id: 'c3', title: 'Ecografía abdominal avanzada', level: 'Avanzado', hours: 8, price: 120, instructor: 'Dr. invitado', desc: 'Protocolos, casos clínicos y hallazgos frecuentes.', lessons: ['Hígado y vía biliar', 'Riñón y vías urinarias', 'Páncreas y bazo', 'Casos clínicos'] },
  { id: 'c4', title: 'Doppler vascular en la práctica', level: 'Intermedio', hours: 6, price: 95, instructor: 'Dr. invitado', desc: 'Ajustes de Doppler color y espectral paso a paso.', lessons: ['Ángulo y escala', 'Doppler color', 'Doppler espectral', 'Casos'] },
]
export type EventItem = { id: string; title: string; date: string; place: string; price: number; seats: number; desc: string; emoji: string }
export const events: EventItem[] = [
  { id: 'e1', title: 'Workshop hands-on Mindray', date: '2026-12-05', place: 'Sede MDS', price: 40, seats: 25, desc: 'Practica en equipos reales con instructores.', emoji: '🎓' },
  { id: 'e2', title: 'Congreso de ecografía MDS', date: '2027-02-14', place: 'Centro de convenciones', price: 90, seats: 200, desc: 'Charlas, expositores y networking.', emoji: '🎤' },
  { id: 'e3', title: 'Demo de novedades Mindray', date: '2026-11-20', place: 'Sede MDS', price: 0, seats: 40, desc: 'Conoce los lanzamientos. Entrada libre.', emoji: '✨' },
]
export type Equipment = { id: string; model: string; serial: string; lastService: string; intervalMonths: number }
export const equipment: Equipment[] = [
  { id: 'q1', model: 'Mindray DC-40', serial: 'DC40-2291', lastService: '2026-03-10', intervalMonths: 6 },
  { id: 'q2', model: 'Mindray TE7', serial: 'TE7-0087', lastService: '2026-08-22', intervalMonths: 12 },
]
export const serviceTypes = ['Mantenimiento preventivo', 'Reparación', 'Calibración', 'Capacitación en sitio']
export const offers = [
  { id: 'o1', title: '15% en consumibles', code: 'CLIENTE15', desc: 'Exclusivo para clientes registrados.' },
  { id: 'o2', title: 'Preventivo + limpieza de transductores', code: 'PREV2X', desc: 'Combo con 20% de descuento este mes.' },
]
export const tiers = [{ name: 'Bronce', min: 0 }, { name: 'Plata', min: 500 }, { name: 'Oro', min: 1500 }]
