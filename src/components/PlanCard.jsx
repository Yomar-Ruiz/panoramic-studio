export default function PlanCard({ plan }) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
      <h3 className="text-2xl font-semibold text-slate-950">{plan.name}</h3>
      <p className="mt-3 text-sm text-slate-600">{plan.description}</p>
      <p className="mt-6 text-4xl font-bold text-brand-700">{plan.price}</p>
      <ul className="mt-6 space-y-3 text-sm text-slate-600">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-brand-700">✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </article>
  )
}
