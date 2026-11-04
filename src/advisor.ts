// Asesor IA. MVP: base de conocimiento local. Producción: POST a /api/advisor (Edge Function de Supabase que llama a Claude con RAG sobre manuales Mindray).
const kb: { k: string[]; a: string }[] = [
  { k: ['gain', 'ganancia', 'brillo', 'oscura', 'clara'], a: 'La **ganancia (Gain)** ajusta el brillo global de la imagen. Si está muy oscura sube Gain; si está saturada bájala. Ajusta primero la profundidad y el foco, y usa **TGC** para compensar zonas específicas en profundidad.' },
  { k: ['depth', 'profundidad'], a: 'La **profundidad** debe permitir ver la estructura de interés ocupando 2/3 de la pantalla. Más profundidad = menor frecuencia efectiva y menos resolución.' },
  { k: ['doppler', 'color', 'pw', 'espectral'], a: 'Para **Doppler color**: ajusta el cuadro de color pequeño, la escala (PRF) según la velocidad esperada y mantén un ángulo < 60°. Para Doppler espectral (PW) coloca la compuerta en el centro del vaso y corrige el ángulo.' },
  { k: ['transductor', 'sonda', 'probe', 'lineal', 'convexo'], a: 'Lineal (alta frecuencia): estructuras superficiales, vascular, partes blandas. Convexo (baja frecuencia): abdomen y obstetricia. Cardiaco/sectorial: ventana intercostal. Elige según profundidad y resolución necesarias.' },
  { k: ['limpiar', 'limpieza', 'desinfect', 'mantenimiento'], a: 'Limpia el transductor tras cada paciente con paño y desinfectante **aprobado por Mindray**; nunca sumerjas el conector. Revisa cables y filtros, y programa el **mantenimiento preventivo** desde la sección Servicios.' },
  { k: ['error', 'falla', 'no enciende', 'pantalla', 'no funciona'], a: 'Prueba: 1) reiniciar el equipo, 2) revisar cable de poder y batería, 3) reconectar el transductor. Si persiste, anota el código de error y **agenda un servicio técnico** desde la app para que lo atendamos.' },
  { k: ['preset', 'protocolo', 'optimizar', 'imagen'], a: 'Usa los **presets** por tipo de examen y luego afina: foco a la zona de interés, frecuencia, compound/harmónica y gain. Puedes guardar tus ajustes como preset de usuario.' },
]
export async function ask(q: string): Promise<string> {
  await new Promise(r => setTimeout(r, 600))
  const t = q.toLowerCase()
  const hit = kb.find(e => e.k.some(w => t.includes(w)))
  return hit ? hit.a : 'Aún estoy aprendiendo sobre eso 🤓. Puedo ayudarte con: ganancia/brillo, profundidad, Doppler, elección de transductor, limpieza y mantenimiento, presets y fallas comunes. Para consultas clínicas o técnicas complejas te conecto con un especialista de MDS.'
}
