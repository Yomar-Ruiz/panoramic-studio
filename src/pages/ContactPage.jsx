import { useEffect, useState } from 'react'
import SectionTitle from '../components/SectionTitle.jsx'
import { contactInfo, plans } from '../data/siteData.js'
import { fetchExcelSheet } from '../utils/excel.js'

export default function ContactPage() {
  const [pricingData, setPricingData] = useState([])

  useEffect(() => {
    let active = true

    async function loadData() {
      const rows = await fetchExcelSheet('/pricing-data.xlsx')
      if (active) setPricingData(rows)
    }

    loadData()
    return () => {
      active = false
    }
  }, [])

  return (
    <main className="px-6 py-10 sm:px-8 lg:px-12">
      <section className="mx-auto max-w-6xl space-y-10">
        <SectionTitle
          eyebrow="Contactos"
          title="Habla con nosotros y pide tu clave de acceso"
          description="Nuestros planes y precios están disponibles aquí. También cargamos la información desde una base de datos Excel para mantener todo al día."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <h3 className="text-2xl font-semibold text-slate-950">Datos de contacto</h3>
            <dl className="space-y-4 text-slate-600">
              <div>
                <dt className="text-sm font-semibold text-slate-900">Email</dt>
                <dd>{contactInfo.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-slate-900">Teléfono</dt>
                <dd>{contactInfo.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-slate-900">Instagram</dt>
                <dd>{contactInfo.instagram}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-slate-900">Ubicación</dt>
                <dd>{contactInfo.address}</dd>
              </div>
            </dl>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
              <h3 className="text-2xl font-semibold text-slate-950">Planes actuales</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {plans.map((plan) => (
                  <div key={plan.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-brand-600">{plan.name}</p>
                    <p className="mt-3 text-sm text-slate-600">{plan.description}</p>
                    <p className="mt-5 text-2xl font-bold text-slate-950">{plan.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
              <h3 className="text-2xl font-semibold text-slate-950">Base de datos Excel</h3>
              <p className="mt-3 text-slate-600">Esta sección carga precios desde un archivo Excel ubicado en el servidor, simulando la conexión de datos con tu hoja de cálculo.</p>
              <div className="mt-6 space-y-4 overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50 p-4">
                {pricingData.length === 0 ? (
                  <p className="text-sm text-slate-500">Cargando precios desde Excel...</p>
                ) : (
                  <table className="min-w-full text-left text-sm text-slate-700">
                    <thead>
                      <tr className="border-b border-slate-200">
                        {Object.keys(pricingData[0]).map((column) => (
                          <th key={column} className="px-4 py-3 font-semibold text-slate-900">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pricingData.map((row, index) => (
                        <tr key={index} className="border-b border-slate-200 last:border-0">
                          {Object.values(row).map((value, cellIndex) => (
                            <td key={cellIndex} className="px-4 py-3">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
