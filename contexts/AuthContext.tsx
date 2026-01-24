'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
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
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      setUserProfile(null);
    }
  };

  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        await fetchUserProfile(firebaseUser);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Iniciar sesión con email y password
  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  // Iniciar sesión con Google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, provider);
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
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
      await firebaseSignOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  };

  // Recuperar contraseña
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
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
