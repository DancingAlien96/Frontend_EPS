"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { getClientAuth } from '@/lib/firebase';
import api from '@/lib/axios';

interface UserProfile {
  id: number;
  firebase_uid?: string;
  email: string;
  full_name: string;
  phone_number?: string;
  member_type: 'emprendimiento' | 'empresa' | 'organizacion' | 'institucion' | 'consumidor';
  registration_completed: boolean;
  registration_approved: boolean;
  approved_at?: string;
  is_active: boolean;
  created_at: string;
  
  // Progreso del registro
  progress?: {
    current_step: number;
    steps_completed: {
      step_1: boolean;
      step_2: boolean;
      step_3: boolean;
      step_4: boolean;
      step_5: boolean;
      step_6: boolean;
    };
    steps_skipped: {
      step_3: boolean;
      step_4: boolean;
      step_5: boolean;
      step_6: boolean;
    };
    completion_percentage: number;
    last_saved_at: string;
  };
  
  // Completitud detallada
  completion?: {
    totalPercentage: number;
    byStep: any;
    recommendations: string[];
  };
  
  // Perfil específico (puede ser VentureProfile, OrganizationProfile o ConsumerProfile)
  specific_profile?: any;
  
  // Para compatibilidad con sistema viejo
  rol?: 'superusuario' | 'administrador' | 'emprendedor' | 'usuario';
  foto_perfil?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  signIn: async () => {},
  signInWithGoogle: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Obtener el perfil del usuario desde el backend
  const fetchUserProfile = async (firebaseUser: User) => {
    try {
      // Primero verificar si hay un JWT guardado (usuario completó paso 1)
      const jwtToken = localStorage.getItem('token');
      
      if (!jwtToken) {
        // Usuario solo autenticado con Firebase, sin JWT del backend
        console.log('✓ Usuario de Firebase detectado - pendiente de completar registro');
        setUserProfile(null);
        return;
      }

      // Si hay JWT, usarlo para obtener el perfil (usa el interceptor de api)
      const response = await api.get('/registration/perfil');
      setUserProfile(response.data);
    } catch (error: any) {
      // Network Error o conexión rechazada - backend no disponible
      if (!error.response) {
        console.log('⚠️ Backend no disponible - usuario autenticado con Firebase solamente');
        setUserProfile(null);
        return;
      }
      
      // Si es 404, significa que el usuario no ha completado el registro progresivo
      if (error.response?.status === 404) {
        console.log('✓ Usuario registrado pero perfil no encontrado');
        setUserProfile(null);
      } else {
        console.error('Error al obtener perfil:', error);
        setUserProfile(null);
      }
    }
  };

  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    (async () => {
      const auth = await getClientAuth();
      if (!auth) {
        setLoading(false);
        return;
      }
      const { onAuthStateChanged } = await import('firebase/auth');
      unsubscribe = onAuthStateChanged(auth, async (firebaseUser: any) => {
        setUser(firebaseUser);

        if (firebaseUser) {
          await fetchUserProfile(firebaseUser);
        } else {
          setUserProfile(null);
        }

        setLoading(false);
      });
    })();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Iniciar sesión con email y password
  const signIn = async (email: string, password: string) => {
    try {
      const auth = await getClientAuth();
      if (!auth) throw new Error('Falta NEXT_PUBLIC_FIREBASE_API_KEY. Añádela en .env.local y reinicia el servidor de desarrollo.');
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      await signInWithEmailAndPassword(auth as any, email, password);
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  // Iniciar sesión con Google
  const signInWithGoogle = async () => {
    try {
      // Limpiar cualquier token JWT viejo antes de autenticar con Google
      // Esto previene conflictos con sesiones previas
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      const auth = await getClientAuth();
      if (!auth) throw new Error('Falta NEXT_PUBLIC_FIREBASE_API_KEY. Añádela en .env.local y reinicia el servidor de desarrollo.');

      const firebaseAuthModule = await import('firebase/auth');
      const provider = new firebaseAuthModule.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      const { signInWithPopup } = firebaseAuthModule;
      await signInWithPopup(auth as any, provider);
      
      // El fetchUserProfile se ejecutará automáticamente por el listener onAuthStateChanged
      // No necesitamos hacer más aquí
    } catch (error: any) {
      console.error('Error al iniciar sesión con Google:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  // Registrarse
  const signUp = async (email: string, password: string, userData: any) => {
    try {
      // 1. Crear usuario en Firebase
      const auth = await getClientAuth();
      if (!auth) throw new Error('Falta NEXT_PUBLIC_FIREBASE_API_KEY. Añádela en .env.local y reinicia el servidor de desarrollo.');
      const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
      const userCredential = await createUserWithEmailAndPassword(auth as any, email, password);

      // 2. Actualizar perfil de Firebase
      await updateProfile(userCredential.user, {
        displayName: userData.nombre_completo,
      });

      // El perfil se creará cuando el usuario complete el registro progresivo
      // No necesitamos crear nada en el backend aquí
    } catch (error: any) {
      console.error('Error al registrarse:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  // Cerrar sesión
  const signOut = async () => {
    try {
      // Limpiar tokens y datos de usuario
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUserProfile(null);
      
      const auth = await getClientAuth();
      if (!auth) return;
      const { signOut: firebaseSignOut } = await import('firebase/auth');
      await firebaseSignOut(auth as any);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  };

  // Recuperar contraseña
  const resetPassword = async (email: string) => {
    try {
      const auth = await getClientAuth();
      if (!auth) throw new Error('Falta NEXT_PUBLIC_FIREBASE_API_KEY. Añádela en .env.local y reinicia el servidor de desarrollo.');
      const { sendPasswordResetEmail } = await import('firebase/auth');
      await sendPasswordResetEmail(auth as any, email);
    } catch (error: any) {
      console.error('Error al enviar email de recuperación:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Función helper para mensajes de error en español
function getErrorMessage(errorCode: string): string {
  const errorMessages: { [key: string]: string } = {
    'auth/email-already-in-use': 'Este correo electrónico ya está registrado',
    'auth/invalid-email': 'Correo electrónico inválido',
    'auth/operation-not-allowed': 'Operación no permitida',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
    'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
    'auth/user-not-found': 'No existe una cuenta con este correo',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/invalid-credential': 'Credenciales inválidas',
    'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
  };

  return errorMessages[errorCode] || 'Error al autenticar. Intenta nuevamente.';
}
