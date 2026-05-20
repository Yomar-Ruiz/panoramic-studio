# Panoramic Photograph Studio

Sitio web de ejemplo para Panoramic Photograph Studio construido con React, Tailwind CSS y Vite.

## Estructura principal

- `src/App.jsx`: enrutamiento de la aplicación
- `src/components/`: componentes reutilizables de UI
- `src/pages/`: páginas principales (Inicio, Galería, Contactos, Descargas)
- `src/data/siteData.js`: contenido y datos de página
- `src/utils/excel.js`: lectura de datos desde un archivo Excel
- `public/pricing-data.xlsx`: archivo Excel con precios cargado en la página de contactos
- `public/images/`: imágenes de ejemplo para la galería

## Características implementadas

- Navegación multi-página con React Router
- Galería de fotos con filtros
- Planes y precios definidos en datos reutilizables
- Descargas con validación por clave de acceso
- Lectura de datos desde Excel usando `xlsx`
- Tailwind CSS para diseño moderno y responsivo

## Comandos importantes

- `npm install`: instala dependencias
- `npm run dev`: inicia el servidor local de desarrollo
- `npm run build`: genera la versión de producción

## Notas

El archivo Excel `public/pricing-data.xlsx` se importa en la página de Contactos, demostrando la conexión con datos desde una hoja de cálculo.
