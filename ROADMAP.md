# MDS Clientes — Roadmap

## Estado: MVP v0.1 (prototipo funcional con datos de ejemplo)
Inicio con recordatorios y ofertas · Tienda + carrito · Servicios técnicos (agendar/seguimiento) · Academia (gratis/paga) · Eventos y entradas · Asesor IA · Perfil con puntos y niveles. PWA instalable.

## Fase 1 — Hacerlo real (2–4 semanas)
1. Supabase: auth (email/WhatsApp OTP), tablas de `supabase/schema.sql`, reemplazar `src/store.tsx` por consultas.
2. Pagos: pasarela local (Wompi/PayU/MercadoPago/Stripe) para tienda, cursos y entradas.
3. Asesor IA real: Edge Function → Claude con RAG sobre manuales Mindray (`kb_documents`), con aviso clínico y escalado a técnico.
4. Panel admin (catálogo, citas, cursos, eventos, check-in QR).
5. Notificaciones: push + WhatsApp para recordatorios de preventivo y confirmaciones.

## Fase 2 — Fidelización
Canje de puntos, referidos, niveles con beneficios, cupones dinámicos, encuestas NPS tras cada servicio.

## Fase 3 — Ecosistema
Comunidad/foro y casos clínicos, certificados de cursos, reserva de repuestos por equipo (por S/N), tickets de soporte con fotos/video, cotizador de equipos, financiamiento, QR por equipo, app de técnicos (rutas y reportes).

## Mejora continua
Medir: activación, % equipos con preventivo al día, conversión tienda, finalización de cursos, preguntas sin respuesta del asesor (alimentan la base de conocimiento).
