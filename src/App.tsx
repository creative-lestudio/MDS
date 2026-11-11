import { NavLink, Route, Routes, Link, useLocation } from 'react-router-dom'
import { useApp } from './store'
import Icon from './Icon'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Services from './pages/Services'
import Academy from './pages/Academy'
import Events from './pages/Events'
import Advisor from './pages/Advisor'
import Profile from './pages/Profile'
const tabs = [['/', 'home', 'Inicio'], ['/tienda', 'bag', 'Tienda'], ['/servicios', 'wrench', 'Servicio'], ['/academia', 'cap', 'Academia'], ['/eventos', 'ticket', 'Eventos']]
export default function App() {
  const { cart, points } = useApp(); const { pathname } = useLocation()
  const n = Object.values(cart).reduce((a, b) => a + b, 0)
  return <div className="app">
    <header className="top glass">
      <Link to="/" className="brand"><img src="/logo.webp" alt="Inversiones MDS" /></Link>
      {n > 0 && <Link to="/tienda" className="chip-btn" aria-label="Carrito"><Icon n="cart" s={18} /><i>{n}</i></Link>}
      <Link to="/perfil" className="chip-btn pts"><Icon n="sparkle" s={16} fill />{points}</Link>
      <Link to="/perfil" className="avatar" aria-label="Perfil">C</Link>
    </header>
    <main key={pathname} className="page"><Routes>
      <Route path="/" element={<Home />} /><Route path="/tienda" element={<Shop />} /><Route path="/servicios" element={<Services />} />
      <Route path="/academia" element={<Academy />} /><Route path="/eventos" element={<Events />} /><Route path="/asesor" element={<Advisor />} /><Route path="/perfil" element={<Profile />} />
    </Routes></main>
    <div className="dock">
      {pathname !== '/asesor' && <Link to="/asesor" className="fab glass" aria-label="Asesor IA"><Icon n="sparkle" s={20} fill /><span>Asesor IA</span></Link>}
      <nav className="tabs glass">{tabs.map(([to, i, l]) => <NavLink key={to} to={to} end={to === '/'}><Icon n={i} s={22} /><em>{l}</em></NavLink>)}</nav>
    </div>
  </div>
}
