# Configuración para Túnel de Cloudflare

## Problema
Cuando accedes desde el celular usando un túnel de Cloudflare, obtienes un error `Network Error` porque el frontend intenta conectarse a `localhost:3000` que no existe en tu celular.

## Solución

### Paso 1: Crear túneles para Frontend y Backend

Necesitas **DOS túneles** separados:

#### Túnel 1 - Backend (Puerto 3000)
```bash
# En una terminal, navega al backend
cd "C:\Users\cristofer perez\Documents\backend-eps"

# Inicia el backend
npm run dev

# En OTRA terminal, crea el túnel de Cloudflare
cloudflared tunnel --url http://localhost:3000
```

Esto te dará una URL como: `https://abc123.trycloudflare.com`

#### Túnel 2 - Frontend (Puerto 3001)
```bash
# En una terminal, navega al frontend  
cd "C:\Users\cristofer perez\Documents\frontend-eps"

# Inicia el frontend
npm run dev

# En OTRA terminal, crea el túnel de Cloudflare
cloudflared tunnel --url http://localhost:3001
```

Esto te dará una URL como: `https://xyz789.trycloudflare.com`

### Paso 2: Configurar la URL del Backend

Edita el archivo `.env.local` en el frontend:

```env
# Reemplaza con la URL de TU túnel del BACKEND (puerto 3000)
NEXT_PUBLIC_API_URL=https://abc123.trycloudflare.com/api
```

⚠️ **IMPORTANTE**: 
- Usa la URL del túnel del **BACKEND** (puerto 3000), NO del frontend
- Agrega `/api` al final
- Estas URLs cambian cada vez que reinicias cloudflared (a menos que uses túneles nombrados)

### Paso 3: Reiniciar el Frontend

Después de cambiar `.env.local`, debes reiniciar el servidor de Next.js:

```bash
# Detén el servidor (Ctrl+C)
# Y vuelve a iniciarlo
npm run dev
```

### Paso 4: Acceder desde el Celular

Abre en tu celular: `https://xyz789.trycloudflare.com` (la URL del túnel del FRONTEND)

Ahora debería funcionar correctamente conectándose al backend.

---

## Túneles Permanentes (Opcional)

Si no quieres que las URLs cambien cada vez, puedes crear túneles permanentes:

```bash
# Instalar cloudflared
# Luego crear túneles nombrados
cloudflared tunnel create mi-backend
cloudflared tunnel create mi-frontend

# Configurar en config.yml y correrlos
```

Consulta: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/

---

## Verificación Rápida

1. ✅ Backend corriendo en `localhost:3000`
2. ✅ Frontend corriendo en `localhost:3001`  
3. ✅ Túnel 1 apuntando a `localhost:3000` → `https://abc123.trycloudflare.com`
4. ✅ Túnel 2 apuntando a `localhost:3001` → `https://xyz789.trycloudflare.com`
5. ✅ `.env.local` configurado con: `NEXT_PUBLIC_API_URL=https://abc123.trycloudflare.com/api`
6. ✅ Frontend reiniciado después de cambiar `.env.local`
7. ✅ Celular accede a: `https://xyz789.trycloudflare.com`

---

## Comandos Completos (Atajo)

```powershell
# Terminal 1 - Backend
cd "C:\Users\cristofer perez\Documents\backend-eps"
npm run dev

# Terminal 2 - Túnel Backend
cloudflared tunnel --url http://localhost:3000
# Copia la URL que aparece (ej: https://abc123.trycloudflare.com)

# Terminal 3 - Frontend
cd "C:\Users\cristofer perez\Documents\frontend-eps"
# ANTES de correr, edita .env.local con la URL del túnel del backend
npm run dev

# Terminal 4 - Túnel Frontend
cloudflared tunnel --url http://localhost:3001
# Copia la URL que aparece (ej: https://xyz789.trycloudflare.com)
# Abre esta URL en tu celular
```
