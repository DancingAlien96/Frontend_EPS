// Lazy client-side Firebase initializer to avoid importing firebase/auth on the server
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: 'emprendedoresgt-ad783.firebaseapp.com',
  projectId: 'emprendedoresgt-ad783',
  storageBucket: 'emprendedoresgt-ad783.firebasestorage.app',
  messagingSenderId: '652991534707',
  appId: '1:652991534707:web:205764a5ffcd72d47abc06',
  measurementId: 'G-09T95XCFNP'
};

declare global {
  // attach to globalThis to persist between HMR reloads in dev
  var __firebaseApp: any | undefined;
  var __firebaseAuth: any | undefined;
  var __firebaseAnalytics: any | undefined;
}

export async function getClientAuth() {
  if (typeof window === 'undefined') return null;
  if (!firebaseConfig.apiKey) {
    // If no API key present, silently return null. The caller will handle user-facing errors.
    return null;
  }
  if ((globalThis as any).__firebaseAuth) return (globalThis as any).__firebaseAuth;

  const [{ initializeApp }, { getAuth }, analyticsModule] = await Promise.all([
    import('firebase/app'),
    import('firebase/auth'),
    import('firebase/analytics').catch(() => ({})),
  ]);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  try {
    if (analyticsModule && analyticsModule.getAnalytics) {
      (globalThis as any).__firebaseAnalytics = analyticsModule.getAnalytics(app);
    }
  } catch (e) {
    // ignore analytics errors in environments without support
  }

  (globalThis as any).__firebaseApp = app;
  (globalThis as any).__firebaseAuth = auth;

  return auth;
}

export default null;
