import { useMemo, useState } from 'react'
import SectionTitle from '../components/SectionTitle.jsx'
import { galleryItems, sampleAccessCodes } from '../data/siteData.js'

export default function DownloadPage() {
  const [accessCode, setAccessCode] = useState('')
  const [status, setStatus] = useState('')

  const approved = useMemo(
    () => sampleAccessCodes.includes(accessCode.trim().toUpperCase()),
    [accessCode],
  )

  const availableItems = approved ? galleryItems : []

  return (
    <main className="px-6 py-10 sm:px-8 lg:px-12">
      <section className="mx-auto max-w-6xl space-y-10">
        <SectionTitle
          eyebrow="Descargas"
          title="Descarga tus fotos en la mejor calidad"
          description="Introduce la clave de acceso que te entregamos para descargar fotos libres de compresión y con licencia autorizada."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <h3 className="text-2xl font-semibold text-slate-950">Acceso seguro</h3>
            <p className="mt-3 text-slate-600">Usa tu clave para ver y descargar archivos de alta resolución desde nuestro archivo seguro de fotos.</p>
            <label className="mt-6 block text-sm font-semibold text-slate-900">Clave de acceso</label>
            <input
              value={accessCode}
              onChange={(event) => {
                setAccessCode(event.target.value)
                setStatus('')
              }}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-brand-500"
              placeholder="Introduce tu clave aquí"
            />
            <button
              type="button"
              onClick={() => setStatus(approved ? 'approved' : 'denied')}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
            >
              Validar clave
            </button>
            {status === 'approved' && <p className="mt-4 text-sm text-emerald-600">Clave correcta. Puedes descargar tus fotos ahora.</p>}
            {status === 'denied' && <p className="mt-4 text-sm text-rose-600">Clave incorrecta. Revisa el código y vuelve a intentarlo.</p>}
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
              <h3 className="text-2xl font-semibold text-slate-950">Fotos disponibles</h3>
              <p className="mt-3 text-slate-600">Al validar tu clave, podrás descargar directamente desde la lista de fotos autorizadas.</p>
            </div>
            {approved ? (
              <div className="space-y-4">
                {availableItems.map((item) => (
                  <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-slate-950">{item.title}</h4>
                        <p className="text-sm text-slate-600">{item.description}</p>
                      </div>
                      <a
                        href={item.image}
                        download
                        className="inline-flex items-center justify-center rounded-full bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
                      >
                        Descargar foto
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-slate-600">
                <p>Introduce una clave válida para mostrar descargas de archivo en alta calidad.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
