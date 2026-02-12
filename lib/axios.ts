import axios from 'axios';

// Detectar la URL del API automáticamente
const getApiUrl = () => {
  // En el servidor (SSR), usar la variable de entorno
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  }
  
  // En el navegador, usar la URL configurada o construir desde window.location
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // Si hay una URL configurada y NO es localhost, usarla (túnel de Cloudflare, etc.)
  if (envUrl && !envUrl.includes('localhost')) {
    console.log('✓ Usando API configurada:', envUrl);
    return envUrl;
  }
  
  // Si estamos en localhost del navegador, usar localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3000/api';
  }
  
  // Si accedemos vía túnel pero no hay NEXT_PUBLIC_API_URL configurada
  console.warn('⚠️ Accediendo vía túnel pero NEXT_PUBLIC_API_URL no está configurada.');
  console.warn('   Configura NEXT_PUBLIC_API_URL en .env.local con la URL de tu túnel del backend.');
  console.warn('   Ejemplo: NEXT_PUBLIC_API_URL=https://tu-backend.trycloudflare.com/api');
  console.warn('   Ver: CLOUDFLARE_TUNNEL_SETUP.md para instrucciones completas.');
  
  // Fallback: usar localhost (probablemente no funcionará desde dispositivos externos)
  return 'http://localhost:3000/api';
};

const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

export default api;
