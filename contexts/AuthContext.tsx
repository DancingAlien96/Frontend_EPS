"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { getClientAuth } from '@/lib/firebase';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface UserProfile {
  id: number;
  nombre_completo: string;
  correo_electronico: string;
  rol: 'superusuario' | 'administrador' | 'emprendedor' | 'usuario';
  firebase_uid: string;
  foto_perfil?: string;
  // Campos específicos para emprendedores
  id_emprendedor?: number;
  nombre_emprendimiento?: string;
  telefono?: string;
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
      const token = await firebaseUser.getIdToken();
      const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserProfile(response.data);
    } catch (error: any) {
      // Si es 404, significa que el perfil no existe aún (usuario no registrado como emprendedor)
      if (error.response?.status === 404) {
        console.log('Perfil no encontrado - usuario no registrado como emprendedor');
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
      const auth = await getClientAuth();
      if (!auth) throw new Error('Falta NEXT_PUBLIC_FIREBASE_API_KEY. Añádela en .env.local y reinicia el servidor de desarrollo.');

      const firebaseAuthModule = await import('firebase/auth');
      const provider = new firebaseAuthModule.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      const { signInWithPopup } = firebaseAuthModule;
      const result = await signInWithPopup(auth as any, provider);
      const user = result.user;

      // Verificar si el usuario ya existe en el backend
      const token = await user.getIdToken();
      try {
        await axios.get(`${API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error: any) {
        // Si no existe, crear perfil básico
        if (error.response?.status === 404) {
          await axios.post(`${API_URL}/auth/registro-emprendedor`, {
            firebase_uid: user.uid,
            nombre_completo: user.displayName || 'Usuario Google',
            correo_electronico: user.email,
            telefono: user.phoneNumber || '',
            tiene_cuenta: true,
          }, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      }
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

      // 3. Crear perfil en el backend
      const token = await userCredential.user.getIdToken();
      await axios.post(`${API_URL}/auth/registro-emprendedor`, {
        firebase_uid: userCredential.user.uid,
        ...userData,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    } catch (error: any) {
      console.error('Error al registrarse:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  // Cerrar sesión
  const signOut = async () => {
    try {
      const auth = await getClientAuth();
      if (!auth) return;
      const { signOut: firebaseSignOut } = await import('firebase/auth');
      await firebaseSignOut(auth as any);
      setUserProfile(null);
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
