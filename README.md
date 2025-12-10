# ZBE España - Dashboard

Dashboard interactivo de Zonas de Bajas Emisiones de España con datos reales del parque de vehículos.

## 📊 Datos Incluidos

- **51 Zonas de Bajas Emisiones** de España
- **Datos del parque de vehículos** por ciudad:
  - Total de vehículos
  - Distribución por distintivo ambiental (0, ECO, C, B, Sin distintivo)
  - Vehículos afectados por las restricciones
  - Porcentajes por tipo de combustible
- **Información detallada de cada ZBE**:
  - Restricciones vigentes
  - Horarios y días
  - Excepciones
  - Datos geográficos

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
zbe-dashboard/
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Header.jsx
│   │   ├── Navigation.jsx
│   │   ├── StatCard.jsx
│   │   ├── CityCard.jsx
│   │   ├── CityModal.jsx
│   │   └── VehicleStatsCard.jsx   # NUEVO: Estadísticas de vehículos
│   ├── views/             # Vistas principales
│   │   ├── OverviewView.jsx
│   │   ├── CitiesView.jsx
│   │   ├── StatsView.jsx
│   │   └── CalculatorView.jsx
│   ├── data/              # Datos y utilidades
│   │   └── zbeData.js     # ACTUALIZADO: 51 ciudades con datos reales
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Punto de entrada
│   └── index.css          # Estilos globales
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 📈 Estadísticas Disponibles

El dashboard incluye análisis detallado de:

- **Vehículos totales** por ciudad
- **Vehículos afectados** según restricciones
- **Distribución por distintivo**: 0, ECO, C, B, Sin distintivo
- **Distribución por combustible**: Gasolina, Diésel, Eléctrico
- **Porcentajes** de cada categoría

## 🎨 Características

- ✅ Dashboard interactivo con 4 secciones
- ✅ Filtros por nivel de restricción
- ✅ Modal de detalles por ciudad
- ✅ Diseño responsive
- ✅ Animaciones suaves
- ✅ Color corporativo #01f3b3

## 🔧 Tecnologías

- React 18
- Vite
- Tailwind CSS
- Lucide React (iconos)

## 📊 Integración con Backend

Para conectar con tu análisis de Python:

1. Crea una API REST con Flask/FastAPI
2. Actualiza `src/data/zbeData.js` para hacer fetch a tu API
3. Ejemplo:

```javascript
export const fetchZbeData = async () => {
  const response = await fetch('http://localhost:5000/api/zbe');
  return await response.json();
};
```

## 🗺️ Integrar Mapa Real

Para añadir un mapa interactivo:

### Opción 1: Leaflet
```bash
npm install react-leaflet leaflet
```

### Opción 2: Google Maps
```bash
npm install @react-google-maps/api
```

### Opción 3: Mapbox
```bash
npm install react-map-gl mapbox-gl
```

## 📈 Próximas Mejoras

- [ ] Integración con API de Python
- [ ] Mapa interactivo
- [ ] Gráficos avanzados (Chart.js)
- [ ] Búsqueda por ciudad
- [ ] Exportar informes en PDF
- [ ] Sistema de notificaciones
- [ ] Modo oscuro/claro

## 📝 Licencia

MIT
