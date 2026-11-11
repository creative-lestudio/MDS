const P: Record<string, string> = {
  home: 'M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6',
  bag: 'M6 7h12l1 13H5L6 7zM9 7a3 3 0 016 0',
  wrench: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z',
  cap: 'M22 10L12 5 2 10l10 5 10-5zM6 12v5c3 2 9 2 12 0v-5',
  ticket: 'M4 6h16a1 1 0 011 1v3a2 2 0 000 4v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3a2 2 0 000-4V7a1 1 0 011-1zM14 6v12',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0',
  plus: 'M12 5v14M5 12h14', minus: 'M5 12h14', check: 'M5 13l4 4L19 7',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  pin: 'M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4z',
  chevron: 'M9 6l6 6-6 6', lock: 'M6 11h12v9H6zM8 11V8a4 4 0 018 0v3', play: 'M8 5l11 7-11 7V5z',
  send: 'M12 19V5M5 12l7-7 7 7', clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2',
  tag: 'M3 12V4h8l10 10-8 8L3 12zM7.5 8.5h.01', drop: 'M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z', probe: 'M9 3h6l1 6-2 3v9h-4v-9L8 9l1-6z',
  doc: 'M7 3h8l4 4v14H7zM14 3v5h5', mic: 'M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3zM6 11a6 6 0 0012 0M12 17v4',
  cart: 'M3 4h2l2.5 11h10L20 7H6.5M9 20h.01M17 20h.01', copy: 'M9 9h11v11H9zM5 15V4h11',
  cube: 'M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5',
  gift: 'M4 11h16v9H4zM3 7h18v4H3zM12 7v13M12 7c-2 0-4-1-4-2.5S10 3 12 7c2-4 4-3 4-2.5S14 7 12 7z',
}
export default function Icon({ n, s = 22, fill = false }: { n: string; s?: number; fill?: boolean }) {
  return <svg className="ic" width={s} height={s} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={P[n] || P.cube} /></svg>
}
export const catIcon = (c: string) => ({ Transductores: 'probe', Consumibles: 'drop', Accesorios: 'shield', Equipos: 'cube' } as Record<string, string>)[c] || 'cube'
