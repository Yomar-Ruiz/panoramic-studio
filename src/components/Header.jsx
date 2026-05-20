import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Galería', path: '/galeria' },
  { label: 'Contactos', path: '/contactos' },
  { label: 'Descargas', path: '/descargas' },
]

export default function Header() {
  return (
    <header className="bg-slate-950 text-white ring-1 ring-white/10 shadow-soft">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 md:flex-nowrap">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Panoramic Photograph Studio logo" className="h-14 w-14 rounded-3xl object-cover ring-1 ring-white/15" />
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Panoramic Photograph Studio</p>
            <p className="text-sm text-slate-400">Fotografía de producto, comida y paisajes</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-100">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 transition ${
                  isActive ? 'bg-slate-100 text-slate-950' : 'hover:bg-white/10'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
