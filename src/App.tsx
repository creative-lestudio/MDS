import { NavLink, Route, Routes, Link, useLocation } from 'react-router-dom'
import { useApp } from './store'
import Icon from './Icon'
import logo from './assets/logo.webp'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Services from './pages/Services'
import Academy from './pages/Academy'
import Events from './pages/Events'
import Advisor from './pages/Advisor'
import Profile from './pages/Profile'
const tabs = [['/', 'home', 'Inicio'], ['/tienda', 'bag', 'Tienda'], ['/servicios', 'wrench', 'Servicio'], ['/academia', 'cap', 'Academia'], ['/eventos', 'ticket', 'Eventos']]
export default function App() {
  const { cart, points, name } = useApp(); const { pathname } = useLocation()
  const n = Object.values(cart).reduce((a, b) => a + b, 0)
  return <div className="app">
    <header className="top glass">
      <Link to="/" className="brand" aria-label="Inversiones MDS"><img src={logo} alt="Inversiones MDS" /></Link>
      {n > 0 && <Link to="/tienda" className="ibtn" aria-label="Carrito"><Icon n="cart" s={19} /><i>{n}</i></Link>}
      <Link to="/asesor" className={'ibtn' + (pathname === '/asesor' ? ' on' : '')} aria-label="Asesor IA"><Icon n="sparkle" s={19} /></Link>
      <Link to="/perfil" className="who"><span>{points} pts</span><b className="avatar">{name[0]}</b></Link>
    </header>
    <main key={pathname} className="page"><Routes>
      <Route path="/" element={<Home />} /><Route path="/tienda" element={<Shop />} /><Route path="/servicios" element={<Services />} />
      <Route path="/academia" element={<Academy />} /><Route path="/eventos" element={<Events />} /><Route path="/asesor" element={<Advisor />} /><Route path="/perfil" element={<Profile />} />
    </Routes></main>
    <div className="dock"><nav className="tabs glass">{tabs.map(([to, i, l]) => <NavLink key={to} to={to} end={to === '/'}><Icon n={i} s={22} /><em>{l}</em></NavLink>)}</nav></div>
  </div>
}
