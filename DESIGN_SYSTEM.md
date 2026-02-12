# Sistema de Diseño - EPS Chiquimula

> Documentación del sistema de diseño profesional para proyectos Next.js de alto nivel, enfocado en una estética editorial con tipografía refinada y paleta navy profunda.

## 🎨 Paleta de Colores

### Colores Principales

| Color | Hex | Uso |
|-------|-----|-----|
| **Midnight Navy** | `#0F172A` | Color principal de marca, botones primarios, textos principales |
| **Champagne Gold** | `#C5A659` | Color de acento, destacados, CTAs secundarios |
| **Emerald Green** | `#065F46` | Éxito, confirmaciones, elementos de progreso |
| **Cream White** | `#F9F7F8` | Fondos claros, tarjetas |
| **Slate Tint** | `#F8F8F8` | Fondos sutiles, áreas secundarias |

### Ejemplos de Uso

```tsx
// Botón Primario
<button className="bg-[#0F172A] text-white hover:bg-[#1e293b] transition-all duration-300">
  Acción Principal
</button>

// Botón Secundario con Gold
<button className="border-2 border-[#C5A659] text-[#C5A659] hover:bg-[#C5A659] hover:text-white">
  Acción Secundaria
</button>

// Tarjeta con Cream Background
<div className="bg-[#F9F7F8] rounded-2xl shadow-sm">
  Contenido
</div>
```

## 📝 Tipografía

### Jerarquía de Texto

```tsx
// Headings
h1: "text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A]"
h2: "text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0F172A]"
h3: "text-xl sm:text-2xl md:text-3xl font-semibold text-[#0F172A]"

// Body
body: "text-sm sm:text-base text-gray-600"
small: "text-xs sm:text-sm text-gray-500"
```

### Fuentes

- **Headings/Display**: Playfair Display (editorial, elegante)
- **Body/Interface**: Inter Sans (alta legibilidad)

## 🎯 Componentes

### Botones

#### Primario
```tsx
className="
  bg-[#0F172A] text-white 
  hover:bg-[#1e293b] 
  rounded-lg px-6 py-3 
  transition-all duration-300 
  shadow-md hover:shadow-lg
  font-medium
"
```

#### Secundario
```tsx
className="
  border-2 border-[#0F172A] text-[#0F172A]
  hover:bg-[#F8F8F8] 
  rounded-lg px-6 py-3 
  transition-all duration-300
  font-medium
"
```

#### Acento (Gold)
```tsx
className="
  bg-[#C5A659] text-white 
  hover:bg-[#b8994d] 
  rounded-lg px-6 py-3 
  transition-all duration-300 
  shadow-md hover:shadow-lg
  font-medium
"
```

### Tarjetas

#### Estándar
```tsx
className="
  bg-white 
  rounded-2xl 
  shadow-sm hover:shadow-md 
  transition-all duration-300
  border border-gray-100
  p-4 sm:p-6
"
```

#### Elevada
```tsx
className="
  bg-white 
  rounded-2xl 
  shadow-lg 
  transition-all duration-300
  p-6
"
```

### Cards de Información
```tsx
className="
  bg-[#F9F7F8] 
  border border-gray-200 
  rounded-2xl 
  shadow-sm
  p-4
"
```

## 🎭 Animaciones

### Transiciones

```css
/* Rápida - Interacciones hover */
transition-all duration-150

/* Normal - Cambios de estado */
transition-all duration-300

/* Lenta - Transiciones complejas */
transition-all duration-500
```

### Easing
- Default: `ease-in-out`
- Smooth: `cubic-bezier(0.4, 0, 0.2, 1)`

## 📐 Espaciado

```tsx
// Spacing Scale
xs: "0.25rem"  // 4px
sm: "0.5rem"   // 8px
md: "1rem"     // 16px
lg: "1.5rem"   // 24px
xl: "2rem"     // 32px
2xl: "3rem"    // 48px

// Ejemplos responsive
gap-3 sm:gap-4 md:gap-6
p-4 sm:p-6 md:p-8
```

## 🔲 Border Radius

```tsx
rounded-sm     // 4px - inputs pequeños
rounded-md     // 8px - inputs estándar
rounded-lg     // 12px - botones
rounded-xl     // 16px - cards pequeñas
rounded-2xl    // 24px - cards grandes
rounded-full   // Completamente redondo
```

## 🌑 Sombras

```tsx
shadow-sm      // Sutil - hover estados
shadow-md      // Media - cards
shadow-lg      // Grande - modales, elementos elevados
shadow-xl      // Extra grande - floating elements
```

## ✅ Mejores Prácticas

### ❌ NO Hacer
```tsx
// Colores aleatorios
bg-blue-500 text-red-600

// Gradientes de múltiples colores
bg-gradient-to-r from-purple-500 via-pink-500 to-red-500

// Transiciones sin duración
hover:bg-gray-100
```

### ✅ Hacer
```tsx
// Usar paleta definida
bg-[#0F172A] text-white

// Colores sólidos de la guía
bg-[#C5A659]

// Transiciones con duración
hover:bg-[#1e293b] transition-all duration-300
```

## 🎨 Ejemplos Completos

### Modal Header
```tsx
<div className="flex items-start justify-between mb-4">
  <h2 className="text-xl sm:text-2xl font-semibold text-[#0F172A]">
    Título
  </h2>
  <button className="text-gray-400 hover:text-[#0F172A] transition-colors duration-300">
    ✕
  </button>
</div>
```

### Tarjeta de Característica
```tsx
<div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-6">
  <div className="w-12 h-12 bg-[#065F46] rounded-lg flex items-center justify-center mb-4">
    <span className="text-2xl">🎯</span>
  </div>
  <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
    Característica
  </h3>
  <p className="text-sm text-gray-600">
    Descripción de la característica
  </p>
</div>
```

### Form Input
```tsx
<div className="space-y-2">
  <label className="text-sm font-medium text-[#0F172A]">
    Nombre
  </label>
  <input 
    type="text"
    className="
      w-full px-4 py-3 
      border-2 border-gray-200 
      rounded-lg 
      focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/10
      transition-all duration-300
      text-[#0F172A]
    "
  />
</div>
```

## 📱 Responsive Design

Todos los componentes deben seguir el enfoque **mobile-first**:

```tsx
// ✅ Correcto
className="text-sm sm:text-base md:text-lg"
className="p-4 sm:p-6 md:p-8"
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"

// ❌ Incorrecto
className="text-lg md:text-sm"  // No reducir en mobile
```

---

## 🔗 Recursos

- **Archivo de configuración**: `/lib/design-system.ts`
- **Paleta Tailwind**: Usar valores hex directos `bg-[#0F172A]`
- **Inspiración**: Editorial, modernista, alto contraste

---

**Versión**: 1.0.0  
**Última actualización**: Febrero 2026
