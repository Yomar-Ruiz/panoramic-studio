export default function PhotoCard({ item, onDelete, isDeletable = false }) {
  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta foto?')) {
      onDelete?.(item.id)
    }
  }

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          src={item.image}
          alt={item.title}
        />
        {isDeletable && (
          <button
            onClick={handleDelete}
            className="absolute right-2 top-2 rounded-lg bg-red-500 px-3 py-1 text-sm font-medium text-white opacity-0 transition group-hover:opacity-100"
          >
            Eliminar
          </button>
        )}
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-brand-600">
          <span>{item.category}</span>
          <span>{item.license}</span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{item.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
