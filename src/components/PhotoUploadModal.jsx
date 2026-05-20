import { useState } from 'react'
import { photoService } from '../api/photoService'

export default function PhotoUploadModal({ isOpen, onClose, categories, onPhotoAdded }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('producto')
  const [tags, setTags] = useState('')
  const [license, setLicense] = useState('Comercial estándar')
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('El archivo no puede ser mayor a 5MB')
        return
      }
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file || !title || !category) {
      setError('Por favor completa los campos requeridos')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('tags', tags)
      formData.append('license', license)
      formData.append('file', file)

      const result = await photoService.uploadPhoto(formData)
      onPhotoAdded(result.photo)
      
      // Reset form
      setTitle('')
      setDescription('')
      setCategory('producto')
      setTags('')
      setFile(null)
      onClose()
    } catch (err) {
      setError(err.message || 'Error al subir la foto')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-950">Subir Nueva Foto</h2>
          <p className="mt-1 text-sm text-slate-600">Añade una foto profesional a la galería</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Archivo de imagen *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-slate-600"
              disabled={isLoading}
            />
            {file && (
              <p className="mt-1 text-xs text-slate-500">
                Archivo: {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
              </p>
            )}
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700">
              Título *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Plato gourmet al atardecer"
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe la foto..."
              rows="3"
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-700">
              Categoría *
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:border-brand-500 focus:outline-none"
              disabled={isLoading}
            >
              {categories.filter(c => c !== 'todos').map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-slate-700">
              Etiquetas (separadas por coma)
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Ej: comida, gourmet, restaurante"
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="license" className="block text-sm font-medium text-slate-700">
              Licencia
            </label>
            <input
              id="license"
              type="text"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 focus:border-brand-500 focus:outline-none"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-200 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-brand-500 px-4 py-2 font-medium text-white hover:bg-brand-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Subiendo...' : 'Subir Foto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
