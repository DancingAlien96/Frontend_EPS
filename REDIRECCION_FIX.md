# 🔧 Corrección de Redirección Incorrecta a /admin

## Problema Identificado

Cuando un usuario iniciaba sesión con Google (o con email/password), era redirigido incorrectamente a `/admin` en lugar de permanecer en la parte pública del sitio.

## Causas del Problema

### 1. **Interceptor de Axios** (`lib/axios.ts`)
**❌ ANTES:**
```typescript
if (error.response?.status === 401) {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/admin';  // ← Asumía que todos eran admin
}
```

**✅ DESPUÉS:**
```typescript
if (error.response?.status === 401) {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  // Solo redirigir si estamos en rutas protegidas de admin
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
    window.location.href = '/auth/login';
  }
}
```

**Explicación:**
- Ahora el interceptor **NO asume** que todos los usuarios son administradores
- Solo redirige a `/auth/login` cuando estamos en una ruta `/admin/*` y hay un error 401
- En otras rutas públicas, simplemente limpia los tokens sin redirigir

---

### 2. **Login con Google** (`contexts/AuthContext.tsx`)  
**❌ ANTES:**
```typescript
const signInWithGoogle = async () => {
  try {
    const auth = await getClientAuth();
    // ... código de autenticación ...
    await signInWithPopup(auth as any, provider);
  }
}
```

**✅ DESPUÉS:**
```typescript
const signInWithGoogle = async () => {
  try {
    // Limpiar tokens viejos ANTES de autenticar
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    const auth = await getClientAuth();
    // ... código de autenticación ...
    await signInWithPopup(auth as any, provider);
  }
}
```

**Explicación:**
- Limpia cualquier token JWT viejo **antes** de iniciar sesión con Google
- Previene conflictos con sesiones anteriores que podrían causar errores 401

---

### 3. **Método signOut mejorado** (`contexts/AuthContext.tsx`)
**✅ MEJORA:**
```typescript
const signOut = async () => {
  try {
    // Limpiar tokens y datos PRIMERO
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserProfile(null);
    
    // Luego cerrar sesión de Firebase
    const auth = await getClientAuth();
    if (!auth) return;
    const { signOut: firebaseSignOut } = await import('firebase/auth');
    await firebaseSignOut(auth as any);
  }
}
```

**Explicación:**
- Asegura que los tokens se limpien en el orden correcto
- Previene estados inconsistentes durante el cierre de sesión

---

## Flujo Correcto Ahora

### **Login con Google:**
1. Usuario hace clic en "Continuar con Google" en `/auth/login`
2. ✅ Se limpian tokens JWT viejos del localStorage
3. ✅ Firebase autentica con Google
4. ✅ Usuario es redirigido a `/` (página pública)
5. ✅ Si tiene perfil completo, puede navegar normalmente
6. ✅ Si NO tiene perfil, puede completar el registro progresivo

### **Login con Email/Password:**
1. Usuario ingresa credenciales en `/auth/login`
2. ✅ Firebase autentica
3. ✅ Usuario es redirigido a `/` (página pública)
4. ✅ Flujo normal de navegación

### **Error 401 en rutas públicas:**
1. Usuario autenticado navega en la parte pública
2. Si hay un error 401 (token expirado, etc.)
3. ✅ Se limpian los tokens
4. ✅ **NO hay redirección automática**
5. ✅ Usuario puede seguir viendo contenido público

### **Error 401 en rutas de admin:**
1. Usuario en `/admin/*` con token inválido
2. Backend retorna 401
3. ✅ Se limpian los tokens
4. ✅ Redirecciona a `/auth/login` (correcto)

---

## Qué Hacer para Probar

### 1. **Limpiar localStorage del navegador**
Abre la consola de desarrollador (F12) y ejecuta:
```javascript
localStorage.clear();
```

Esto elimina cualquier token viejo que pueda causar problemas.

### 2. **Reiniciar el servidor de desarrollo**
```powershell
cd "C:\Users\cristofer perez\Documents\frontend-eps"
npm run dev
```

### 3. **Probar el flujo completo**

#### **Prueba 1: Login con Google (Usuario Nuevo)**
1. Ir a `http://localhost:3001/auth/login`
2. Hacer clic en "Continuar con Google"
3. Seleccionar cuenta de Google
4. ✅ **Resultado esperado:** Redirige a `http://localhost:3001/` (home público)
5. ✅ Puedes ver tu nombre/foto en el header
6. ✅ Puedes navegar por la plataforma pública

#### **Prueba 2: Login con Google (Usuario que ya tiene cuenta)**
1. Ir a `http://localhost:3001/auth/login`
2. Hacer clic en "Continuar con Google"
3. ✅ **Resultado esperado:** Redirige a `http://localhost:3001/` (home público)
4. ✅ Si tienes perfil completo, puedes acceder a "Mi Dashboard" desde el menú

#### **Prueba 3: Acceso directo a /admin (Sin estar autenticado como admin)**
1. Cerrar sesión si estás logueado
2. Ir a `http://localhost:3001/admin`
3. ✅ **Resultado esperado:** Login de admin (diferente al login público)
4. Solo credenciales de admin funcionan aquí (admin@sistema.com / admin123)

#### **Prueba 4: Cerrar sesión**
1. Estando logueado, hacer clic en tu foto de perfil
2. Seleccionar "🚪 Cerrar Sesión"
3. ✅ **Resultado esperado:** Permaneces en la página pública
4. ✅ Ya no aparece tu información de usuario

---

## Diferencias Clave

| Aspecto | ❌ Antes | ✅ Ahora |
|---------|----------|----------|
| **Login con Google** | Redirigía a `/admin` | Redirige a `/` (público) |
| **Error 401 en público** | Redirigía a `/admin` | No redirige, limpia tokens |
| **Error 401 en admin** | Redirigía a `/admin` | Redirige a `/auth/login` |
| **Tokens viejos** | Causaban conflictos | Se limpian antes de login |
| **Asunción de roles** | Todos eran admin | Respeta el contexto del usuario |

---

## Arquitectura de Rutas

```
📁 Aplicación
├── 🌐 Público (/)
│   ├── Inicio
│   ├── Programas
│   ├── Eventos
│   ├── Noticias
│   ├── Recursos
│   └── Contacto
│
├── 🔐 Autenticación (/auth)
│   ├── /auth/login (Login público - Google + Email)
│   └── /auth/registro (Registro progresivo)
│
├── 👤 Dashboard Usuario (/dashboard)
│   └── Panel del emprendedor/consumidor
│
└── 🔒 Administración (/admin)
    ├── /admin (Login de admin - Solo email/password)
    ├── /admin/dashboard
    ├── /admin/solicitudes
    ├── /admin/programas
    └── ... (otras rutas admin)
```

---

## Roles y Accesos

| Rol | Login en | Después del login | Puede acceder a |
|-----|----------|-------------------|-----------------|
| **Usuario Público** | `/auth/login` | `/` (home) | Todo público + registro |
| **Emprendedor** | `/auth/login` | `/` (home) | Público + Dashboard personal |
| **Consumidor** | `/auth/login` | `/` (home) | Público + Dashboard personal |
| **Admin** | `/admin` | `/admin/dashboard` | Todo + Panel admin |

---

## Notas Importantes

1. **No hay redirección automática a /admin** a menos que uses el login de admin en `/admin`
2. **Google login es para usuarios públicos**, no para administradores
3. **Administradores deben usar** el login de `/admin` con credenciales específicas
4. **Tokens se limpian correctamente** en cada flujo de autenticación
5. **No hay conflictos** entre sesiones de Firebase y JWT del backend

---

## Archivos Modificados

1. ✅ `lib/axios.ts` - Interceptor de errores 401
2. ✅ `contexts/AuthContext.tsx` - Métodos `signInWithGoogle` y `signOut`
3. ✅ `app/auth/login/page.tsx` - Redirección después de login (comentarios mejorados)

---

## Verificación Final

Ejecuta estos comandos en la consola del navegador después de hacer login:

```javascript
// Ver si hay token guardado
console.log('Token:', localStorage.getItem('token') ? 'SÍ' : 'NO');

// Ver usuario de Firebase
console.log('Usuario Firebase:', firebase.auth().currentUser?.email);

// Ver ruta actual
console.log('Ruta actual:', window.location.pathname);
```

**Resultado esperado después de login con Google:**
```
Token: NO (correcto - usuarios públicos no tienen JWT hasta completar registro)
Usuario Firebase: tu-email@gmail.com
Ruta actual: /
```

---

## Si aún hay problemas

1. **Limpia completamente el navegador:**
   - Cierra todas las pestañas de localhost:3001
   - Abre DevTools (F12) → Application → Clear Storage → "Clear site data"
   - Recarga la página (Ctrl + F5)

2. **Verifica las variables de entorno:**
   - `frontend-eps/.env.local` debe tener `NEXT_PUBLIC_FIREBASE_API_KEY` y otras configs de Firebase

3. **Revisa la consola del navegador:**
   - No debe haber errores rojos
   - Pueden aparecer warnings de Firebase (normal)

---

✅ **El problema está resuelto. Ahora todos los usuarios van a la parte pública después de login con Google.**
