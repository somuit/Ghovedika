import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSy...",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "ghovedika-store.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "ghovedika-store",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "ghovedika-store.appspot.com",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "8008588599",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:8008588599:web:ghovedika123456"
};

console.log("Testing Firebase Firestore connection for project:", firebaseConfig.projectId);

try {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  console.log("Firebase App Initialized successfully!");
  
  getDocs(collection(db, 'products'))
    .then((snap) => {
      console.log("✅ Firestore Connection SUCCESSFUL! Found products count:", snap.size);
    })
    .catch((err) => {
      console.error("❌ Firestore Connection Error:", err.message);
      console.error("Error Code:", err.code);
    });
} catch (err) {
  console.error("Initialization Error:", err);
}
