# Cultura Platform - Frontend

**Cultura Viva** es una plataforma web para descubrir, publicar y gestionar eventos y festividades culturales locales. Este repositorio contiene el frontend de la aplicación, construido con React, Vite y Tailwind CSS.

## 🚀 Características

### Para Usuarios

- 🏠 **Página de inicio** con eventos destacados, próximos eventos y mapa interactivo
- 🔐 **Autenticación** - Login, registro, gestión de perfil y recuperación de contraseña
- 📅 **Calendario de eventos** - Visualización de eventos en formato calendario
- 🗺️ **Mapa interactivo** - Explorar eventos por ubicación geográfica
- 📝 **Publicación de eventos** - Formulario multi-paso con validación
- 🔍 **Búsqueda y filtrado** - Filtrar eventos por categoría
- 📞 **Página de contacto** - Formulario y múltiples métodos de contacto
- ℹ️ **Página "Acerca de"** - Información sobre la plataforma

### Panel de Administración

- 📊 **Dashboard** - Estadísticas, eventos pendientes, gráficos y acciones rápidas
- 🎫 **Gestión de eventos** - CRUD completo con filtros (pendientes, aprobados, destacados, rechazados)
- 👥 **Gestión de usuarios** - Listado y administración de usuarios
- 🛡️ **Gestión de roles** - Control de acceso basado en roles
- 🏷️ **Gestión de categorías** - Administración de categorías de eventos
- 📍 **Gestión de distritos** - Administración de distritos

## 🛠️ Tecnologías

### Core

- **React 18** - Biblioteca de interfaz de usuario
- **Vite 5** - Herramienta de construcción y servidor de desarrollo
- **React Router 6** - Enrutamiento del lado del cliente

### Estilos y UI

- **Tailwind CSS 3** - Framework CSS utility-first
- **Framer Motion** - Biblioteca de animaciones
- **Lucide React** - Biblioteca de iconos
- **Swiper** - Componentes de carrusel/slider
- **Headless UI** - Componentes accesibles sin estilos

### Formularios y Validación

- **React Hook Form** - Gestión de formularios
- **Zod** y **Yup** - Validación de esquemas
- **React Select** - Inputs select mejorados
- **React DatePicker** - Selector de fechas

### Estado y Datos

- **Zustand** - Gestión de estado ligera con persistencia
- **Axios** - Cliente HTTP con interceptores JWT

### Visualización

- **Chart.js** y **Recharts** - Gráficos y visualizaciones
- **Leaflet** y **React Leaflet** - Mapas interactivos
- **React Big Calendar** - Componente de calendario
- **TanStack Table** - Tablas headless

### Notificaciones y Archivos

- **React Hot Toast** - Notificaciones toast
- **FilePond** - Carga de archivos

### Calidad de Código

- **ESLint** - Linting de código
- **PostCSS** y **Autoprefixer** - Procesamiento CSS

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/                    # Configuración principal de la aplicación
│   │   ├── main.jsx            # Punto de entrada
│   │   ├── App.jsx             # Componente raíz (Router + Toaster)
│   │   └── Routes.jsx          # Definición de rutas
│   │
│   ├── features/               # Módulos de características
│   │   ├── admin/              # Panel de administración
│   │   │   ├── pages/          # Páginas del admin
│   │   │   ├── components/     # Componentes específicos
│   │   │   ├── users/          # Gestión de usuarios
│   │   │   ├── roles/          # Gestión de roles
│   │   │   └── categories/     # Gestión de categorías
│   │   └── user/               # Funcionalidades del usuario
│   │       ├── home/           # Página de inicio
│   │       ├── auth/           # Autenticación
│   │       ├── events/         # Gestión de eventos
│   │       ├── contact/        # Página de contacto
│   │       ├── about/          # Página "Acerca de"
│   │       └── directory/      # Directorio de eventos
│   │
│   ├── shared/                 # Código compartido
│   │   ├── api/                # Clientes API
│   │   ├── services/           # Capa de servicios
│   │   ├── stores/             # Stores de Zustand
│   │   ├── hooks/              # Hooks personalizados
│   │   ├── components/         # Componentes reutilizables
│   │   │   ├── layout/         # Componentes de layout
│   │   │   ├── ui/             # Componentes de UI
│   │   │   ├── forms/          # Componentes de formularios
│   │   │   └── animations/     # Componentes de animación
│   │   ├── utils/              # Utilidades
│   │   └── styles/             # Estilos globales
│   │
│   └── lib/                    # Configuración de API
│
├── public/                     # Archivos estáticos
├── package.json                # Dependencias y scripts
├── vite.config.js              # Configuración de Vite
├── tailwind.config.js          # Configuración de Tailwind
└── .env                        # Variables de entorno
```

## ⚙️ Requisitos Previos

- **Node.js** >= 18.x
- **npm** >= 9.x

## 🚀 Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <url-del-repositorio>
   cd cultura-platform/frontend
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Crea un archivo `.env` en la raíz del proyecto:

   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Iniciar el servidor de desarrollo**

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`

## 📜 Scripts Disponibles

| Comando           | Descripción                                             |
| ----------------- | ------------------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo con HMR                |
| `npm run build`   | Compila la aplicación para producción                   |
| `npm run preview` | Vista previa de la compilación de producción localmente |
| `npm run lint`    | Ejecuta ESLint para verificar la calidad del código     |

## 🔧 Configuración

### Variables de Entorno

| Variable       | Predeterminado              | Descripción                    |
| -------------- | --------------------------- | ------------------------------ |
| `VITE_API_URL` | `http://localhost:3000/api` | URL base de la API del backend |

### Tema y Estilos

- **Modo oscuro**: Soporte completo con preferencia persistente
- **Colores personalizados**: Paleta primaria (azul) y oscura (gris) configuradas en `tailwind.config.js`
- **Fuente**: Inter con system-ui como fallback
- **Animaciones**: `fade-in`, `slide-in`, `pulse-slow`

## 🔐 Autenticación

La plataforma utiliza autenticación JWT con:

- Interceptores Axios para manejo automático de tokens
- Renovación automática de tokens expirados (401)
- Estado persistente mediante `persist` de Zustand

## 🎨 Componentes Reutilizables

La plataforma incluye una biblioteca de componentes compartidos en `src/shared/components/`:

- **UI**: Button, Input, Modal, Badge, Table, Tabs, Select, Checkbox
- **Layout**: Header, Footer, Sidebar
- **Formularios**: FormField, Search, ErrorMessage
- **Animaciones**: FadeIn, FadeInUp, SlideIn, ScaleIn, PageTransition

## 🚀 Despliegue

### Compilación para Producción

```bash
npm run build
```

Los archivos compilados se generarán en el directorio `dist/`.

### Vista Previa Local

```bash
npm run preview
```

## 🤝 Contribuciones

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Equipo

Desarrollado con ❤️ para la comunidad cultural

## 📞 Soporte

Si encuentras algún problema o tienes preguntas, por favor abre un issue en el repositorio.
