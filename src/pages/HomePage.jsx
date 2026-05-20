import SectionTitle from '../components/SectionTitle.jsx'
import { Link } from 'react-router-dom'
import { galleryItems, plans, siteInfo } from '../data/siteData.js'
import PlanCard from '../components/PlanCard.jsx'

export default function HomePage() {
  return (
    <main className="space-y-20 px-6 py-10 sm:px-8 lg:px-12">
      <section className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-slate-950 px-8 py-14 text-white shadow-soft md:px-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.32em] text-brand-200">Estudio de fotografía</p>
            <h1 className="text-5xl font-semibold leading-tight sm:text-6xl">{siteInfo.hero.title}</h1>
            <p className="max-w-2xl text-base text-slate-300 sm:text-lg">{siteInfo.hero.subtitle}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/galeria" className="inline-flex w-full items-center justify-center rounded-full bg-brand-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-brand-400 sm:w-auto">
                {siteInfo.hero.ctaText}
              </Link>
              <Link to="/contactos" className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white transition hover:border-white sm:w-auto">
                Conoce nuestros planes
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_45%)] p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {galleryItems.slice(0, 4).map((item) => (
                <div key={item.id} className="rounded-3xl bg-slate-950 p-4 text-white shadow-xl">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.category}</p>
                  <h2 className="mt-3 text-xl font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10">
        <SectionTitle
          eyebrow="Nuestro enfoque"
          title="Fotografía pensada para venta y licencias"
          description="Desde comida empresarial hasta paisajes para impresión y fondos de pantalla, cada imagen está optimizada para máxima calidad y uso comercial."
        />
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Comida y producto</p>
            <h3 className="mt-4 text-2xl font-semibold text-slate-950">Imágenes que venden</h3>
            <p className="mt-3 text-slate-600">Fotografía de producto y gastronomía para marcas que buscan una presentación impecable y profesional.</p>
          </article>
          <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Paisajes</p>
            <h3 className="mt-4 text-2xl font-semibold text-slate-950">Sumérgete en cada escena</h3>
            <p className="mt-3 text-slate-600">Fotos de paisaje premium listas para licencias, fondos de pantalla y obras impresas en gran formato.</p>
          </article>
          <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Claves de acceso</p>
            <h3 className="mt-4 text-2xl font-semibold text-slate-950">Descargas seguras</h3>
            <p className="mt-3 text-slate-600">Los clientes pueden descargar sus fotos en alta resolución usando claves únicas y controladas.</p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10">
        <SectionTitle eyebrow="Planes" title="Precios claros y paquetes flexibles" description="Elige el plan que mejor se adapte a tu proyecto y solicita acceso a descargas en alta resolución." />
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>
    </main>
  )
}
