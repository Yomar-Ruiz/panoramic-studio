import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import DownloadPage from './pages/DownloadPage.jsx'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/galeria" element={<GalleryPage />} />
        <Route path="/contactos" element={<ContactPage />} />
        <Route path="/descargas" element={<DownloadPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
