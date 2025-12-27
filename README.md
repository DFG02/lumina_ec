# Lúmina Prints - Plataforma de Fotolibros Personalizados

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![Fabric.js](https://img.shields.io/badge/Fabric.js-6.0-orange?style=for-the-badge)

## 🎯 Descripción

Plataforma web moderna de creación de fotolibros personalizados. Diseñada para convertir recuerdos en productos emocionales de alto valor con experiencia de usuario excepcional, estabilidad técnica y escalabilidad.

**Inspiración:** Analizado desde la funcionalidad de Pixory, pero mejorado en estabilidad, UX y confianza.

## ✨ Características Principales

### 🎨 Landing Page Emocional
- ✅ **Hero con Confianza** - Badges de garantía, envío seguro y satisfacción 30 días
- ✅ **Navbar Premium** - Navegación sticky con logo elegante y menú responsive
- ✅ **Features Destacadas** - Ventajas del producto con iconos y efectos hover
- ✅ **Proceso Claro** - Explicación paso a paso 1-2-3
- ✅ **Galería Visual** - Imágenes reales de alta calidad (Unsplash)
- ✅ **Testimonios Reales** - 10,000+ clientes con fotos y calificaciones
- ✅ **FAQ Completo** - Responde todas las dudas comunes
- ✅ **Footer Transparente** - Políticas, contacto y garantías visibles

### 📐 Sistema de Templates Funcionales
- ✅ **6 Plantillas Prediseñadas** - Travel Classic, Modern Minimal, Vintage, Adventure, Family, Luxury
- ✅ **Vista Previa Real** - Imágenes de muestra profesionales
- ✅ **Selección Interactiva** - Indicador visual con borde azul
- ✅ **Información Clara** - Precio, páginas y descripción por plantilla
- ✅ **Progreso Visual** - Barra de pasos 1-2-3 visible en todo momento

### 📤 Upload Inteligente
- ✅ **Drag & Drop** - Interfaz intuitiva con react-dropzone
- ✅ **Vista Previa** - Grid responsive con thumbnails
- ✅ **Gestión Completa** - Agregar, remover, limpiar todo
- ✅ **Formatos Múltiples** - JPG, PNG, WEBP, HEIC
- ✅ **Feedback Visual** - Estados de carga y dropzone activo
- ✅ **Progreso del Flujo** - Indicador visual de paso completado

### 🎨 Editor Pro (Estable y Potente)
#### Herramientas Básicas
- ✅ **Texto Editable** - 8 fuentes, tamaño 12-120px, color personalizable
- ✅ **Formas Geométricas** - Rectángulos y círculos con relleno/borde
- ✅ **Insertar Imágenes** - Desde galería personal con crossOrigin habilitado
- ✅ **Fondos** - 10 colores sólidos + 3 degradados premium

#### Herramientas Avanzadas
- ✅ **Control de Opacidad** - Slider 0-100%
- ✅ **Alineación** - Izquierda, centro, derecha
- ✅ **Orden Z** - Traer al frente / enviar atrás
- ✅ **Duplicar** - Clonar elementos con un clic
- ✅ **Rotar** - Giros de 90°
- ✅ **Eliminar** - Borrado rápido de elementos

#### Plantillas Automatizadas
- ✅ **6 Layouts Precargados** - Aplican diseño completo con un clic
- ✅ **Auto-posicionamiento** - Fotos se insertan en posiciones optimizadas
- ✅ **Diseños Únicos** - Cada plantilla con tipografía y colores propios

#### Panel de Capas Profesional
- ✅ **Vista de Capas** - Lista de todos los elementos
- ✅ **Visibilidad** - Mostrar/ocultar elementos
- ✅ **Bloqueo** - Prevenir edición accidental
- ✅ **Selección Rápida** - Clic en capa para seleccionar

#### Guardado Inteligente
- ✅ **Guardado Manual** - Botón con feedback visual
- ✅ **Auto-guardado** - Cada 30 segundos automáticamente
- ✅ **Indicador de Estado** - "Guardando...", "Guardado 14:30", dot verde
- ✅ **Toast de Éxito** - Notificación temporal al guardar
- ✅ **Persistencia** - sessionStorage para no perder trabajo

#### Exportación
- ✅ **PNG de Alta Calidad** - 2x multiplier para resolución premium
- ✅ **Descarga Directa** - Un clic para obtener archivo

## 🎯 UX/UI - Principios Aplicados

### ✅ Claridad Total
- Microcopys claros en cada paso
- Feedback visual constante (spinners, success toasts)
- Progreso visible del proyecto (1-2-3)
- Sin fricción ni pasos confusos

### ✅ Confianza
- Badges de confianza en Hero (SSL, Garantía 30 días, Envío gratis)
- Testimonios reales (10k+ clientes)
- FAQ exhaustivo
- Footer con políticas claras

### ✅ Estabilidad
- Sin bugs en editor (crossOrigin resuelto)
- Guardado automático para prevenir pérdida
- TypeScript para type safety
- Fabric.js v6 correctamente implementado

### ✅ Emocional
- Diseño limpio y premium
- Imágenes reales de alta calidad
- Animaciones suaves (hover, scale, transitions)
- Lenguaje cercano y motivador

## 🚀 Inicio Rápido

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
app/
├── components/          # Componentes reutilizables
│   ├── Navbar.tsx      # Navegación principal sticky
│   ├── Hero.tsx        # Sección hero con imágenes reales
│   ├── Features.tsx    # Características del producto
│   ├── Process.tsx     # Proceso paso a paso
│   ├── Gallery.tsx     # Galería de ejemplos
│   ├── Testimonials.tsx # Reseñas con fotos
│   ├── FAQ.tsx         # Preguntas frecuentes
│   └── Footer.tsx      # Pie de página
├── templates/
│   └── page.tsx        # Catálogo de templates
├── upload/
│   └── page.tsx        # Sistema de upload con drag & drop
├── editor/
│   └── page.tsx        # Editor canvas con Fabric.js
├── layout.tsx          # Layout principal
├── page.tsx            # Página de inicio
└── globals.css         # Estilos globales
```

## 🚀 Flujo de Usuario

1. **Landing** (`/`) - Usuario ve la propuesta de valor
2. **Templates** (`/templates`) - Selecciona un diseño
3. **Upload** (`/upload?template=X`) - Sube sus fotos
4. **Editor** (`/editor`) - Personaliza su photobook
5. **Export** - Descarga su diseño en PNG

## 🛠️ Tecnologías Utilizadas

- **Next.js 16** - Framework React con App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Fabric.js** - Canvas editor (v6+)
- **react-dropzone** - Drag & drop de archivos
- **react-icons** - Iconografía
- **Unsplash** - Imágenes de alta calidad

## 🔜 Próximas Funcionalidades

### Fase Actual ✅ COMPLETO
- [x] Sistema de templates (catálogo de diseños)
- [x] Upload de imágenes con drag & drop
- [x] Editor canvas con Fabric.js
- [x] Personalización: fuentes, colores, backgrounds
- [x] Exportación a PNG

### Fase 3 - E-commerce (2-3 semanas)
- [ ] Carrito de compras funcional
- [ ] Sistema de precios por páginas/tamaño
- [ ] Integración con Stripe
- [ ] Sistema de checkout
- [ ] Email confirmaciones

### Fase 4 - Features Avanzadas (3-4 semanas)
- [ ] Auto-layout AI para organizar fotos
- [ ] Más herramientas de edición (crop, filters, stickers)
- [ ] Templates personalizables guardados
- [ ] Panel de usuario con pedidos
- [ ] Exportación a PDF print-ready

### Fase 5 - Optimización (1-2 semanas)
- [ ] Server-side rendering optimizado
- [ ] Image optimization con next/image
- [ ] SEO completo
- [ ] Analytics
- [ ] A/B testing

## 📚 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
