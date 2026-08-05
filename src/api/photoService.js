const API_BASE_URL = 'https://panoramic-studio.onrender.com'

export const photoService = {
  // Get all photos or filter by category
  async getPhotos(category = 'todos') {
    try {
      const response = await fetch(`${API_BASE_URL}/photos?category=${category}`)
      if (!response.ok) throw new Error('Failed to fetch photos')
      return await response.json()
    } catch (error) {
      console.error('Error fetching photos:', error)
      return []
    }
  },

  // Upload a new photo
  async uploadPhoto(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/photos`, {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || 'Upload failed')
      }
      return await response.json()
    } catch (error) {
      console.error('Error uploading photo:', error)
      throw error
    }
  },

  // Delete a photo
  async deletePhoto(photoId) {
    try {
      const response = await fetch(`${API_BASE_URL}/photos/${photoId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete photo')
      return await response.json()
    } catch (error) {
      console.error('Error deleting photo:', error)
      throw error
    }
  },

  // Get available categories
  async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`)
      if (!response.ok) throw new Error('Failed to fetch categories')
      return await response.json()
    } catch (error) {
      console.error('Error fetching categories:', error)
      return ['todos']
    }
  },
}
