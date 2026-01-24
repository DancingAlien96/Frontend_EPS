// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process?.env?.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: 'emprendedoresgt-ad783.firebaseapp.com',
  projectId: 'emprendedoresgt-ad783',
  storageBucket: 'emprendedoresgt-ad783.firebasestorage.app',
  messagingSenderId: '652991534707',
  appId: '1:652991534707:web:205764a5ffcd72d47abc06',
  measurementId: 'G-09T95XCFNP'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Analytics (solo en el cliente)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
