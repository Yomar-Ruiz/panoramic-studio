import { useMemo, useState, useEffect } from 'react'
import SectionTitle from '../components/SectionTitle.jsx'
import PhotoCard from '../components/PhotoCard.jsx'
import PhotoUploadModal from '../components/PhotoUploadModal.jsx'
import { photoService } from '../api/photoService.js'

export default function GalleryPage() {
  const [filter, setFilter] = useState('todos')
  const [photos, setPhotos] = useState([])
  const [categories, setCategories] = useState(['todos', 'producto', 'comida', 'paisaje'])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadPhotos()
    loadCategories()
  }, [])

  useEffect(() => {
    loadPhotos()
  }, [filter])

  const loadPhotos = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await photoService.getPhotos(filter)
      setPhotos(data)
    } catch (err) {
      setError('Error al cargar las fotos')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const data = await photoService.getCategories()
      setCategories(data)
    } catch (err) {
      console.error('Error al cargar categorías:', err)
    }
  }

  const handlePhotoAdded = (newPhoto) => {
    setPhotos([newPhoto, ...photos])
    // Reload categories in case a new category was added
    loadCategories()
  }

  const handleDeletePhoto = async (photoId) => {
    try {
      await photoService.deletePhoto(photoId)
      setPhotos(photos.filter(p => p.id !== photoId))
    } catch (err) {
      alert('Error al eliminar la foto: ' + err.message)
    }
  }

  const filteredItems = useMemo(() => {
    if (filter === 'todos') return photos
    return photos.filter((item) => item.category === filter)
  }, [photos, filter])

  return (
    <main className="px-6 py-10 sm:px-8 lg:px-12">
      <section className="mx-auto max-w-6xl space-y-10">
        <SectionTitle
          eyebrow="Galería"
          title="Fotos de Productos y Paisajes en alta calidad"
          description="Explora nuestra selección curada de fotografías listas para licencias comerciales, fondos y ecommerce."
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={`rounded-full border px-5 py-2 text-sm transition ${
                  filter === category
                    ? 'border-brand-500 bg-brand-500 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-brand-500 px-4 py-2 font-medium text-white transition hover:bg-brand-600"
          >
            + Subir Foto
          </button>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="py-20 text-center text-slate-600">
            Cargando fotos...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-slate-600">No hay fotos en esta categoría</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 rounded-lg bg-brand-500 px-4 py-2 font-medium text-white hover:bg-brand-600"
            >
              Sé el primero en subir una
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <PhotoCard
                key={item.id}
                item={item}
                isDeletable={true}
                onDelete={handleDeletePhoto}
              />
            ))}
          </div>
        )}
      </section>

      <PhotoUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
        onPhotoAdded={handlePhotoAdded}
      />
    </main>
  )
}
