import { NavLink, Route, Routes, Link } from 'react-router-dom'
import { useApp } from './store'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Services from './pages/Services'
import Academy from './pages/Academy'
import Events from './pages/Events'
import Advisor from './pages/Advisor'
import Profile from './pages/Profile'
const tabs = [['/', '🏠', 'Inicio'], ['/tienda', '🛍️', 'Tienda'], ['/servicios', '🔧', 'Servicios'], ['/academia', '🎓', 'Academia'], ['/eventos', '🎟️', 'Eventos'], ['/asesor', '🤖', 'Asesor']]
export default function App() {
  const { cart, points } = useApp()
  const n = Object.values(cart).reduce((a, b) => a + b, 0)
  return <div className="app">
    <header className="top"><Link to="/" className="brand"><img src="/logo.webp" alt="Inversiones MDS"/><span>Clientes</span></Link>
      <Link to="/perfil" className="pill">⭐ {points} pts</Link>{n > 0 && <Link to="/tienda" className="pill">🛒 {n}</Link>}</header>
    <main><Routes>
      <Route path="/" element={<Home />} /><Route path="/tienda" element={<Shop />} /><Route path="/servicios" element={<Services />} />
      <Route path="/academia" element={<Academy />} /><Route path="/eventos" element={<Events />} /><Route path="/asesor" element={<Advisor />} /><Route path="/perfil" element={<Profile />} />
    </Routes></main>
    <nav className="tabs">{tabs.map(([to, i, l]) => <NavLink key={to} to={to} end={to === '/'}><b>{i}</b>{l}</NavLink>)}</nav>
  </div>
}
