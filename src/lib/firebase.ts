import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Read from import.meta.env or fallback
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDoUKzcCHzLlq5lhE5446XMyA91Acwf8zU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ghovedika-store-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ghovedika-store-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ghovedika-store-app.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "612590571952",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:612590571952:web:b5505a1004e215b0bfc675"
};


// Initialize Firebase safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export const isFirebaseConfigured = () => {
  return Boolean(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID);
};

export default app;
