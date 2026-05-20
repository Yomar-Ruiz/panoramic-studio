export default function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl space-y-3">
      {eyebrow ? <p className="text-sm uppercase tracking-[0.3em] text-brand-200">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold text-slate-950 sm:text-4xl">{title}</h2>
      {description ? <p className="text-slate-600">{description}</p> : null}
    </div>
  )
}
