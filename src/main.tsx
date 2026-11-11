import { createRoot } from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App from './App'
import { Provider } from './store'
import './styles.css'
// En el artefacto publicado la URL no admite rutas, se navega en memoria.
const Router = import.meta.env.VITE_MEMORY ? MemoryRouter : BrowserRouter
createRoot(document.getElementById('root')!).render(<Router><Provider><App /></Provider></Router>)
