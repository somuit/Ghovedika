import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { 
  initialProducts, initialCategories, initialCoupons, 
  initialBanners, initialPages, initialFAQs, initialSiteSettings, initialTestimonials 
} from '../src/data/initialData.js';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSy...",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "ghovedika-store.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "ghovedika-store",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "ghovedika-store.appspot.com",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "8008588599",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:8008588599:web:ghovedika123456"
};

console.log("🚀 Starting Seeding to Firebase Project:", firebaseConfig.projectId);

async function runSeed() {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log("Seeding Products...");
    for (const prod of initialProducts) {
      await setDoc(doc(db, 'products', prod.id), prod, { merge: true });
    }

    console.log("Seeding Categories...");
    for (const cat of initialCategories) {
      await setDoc(doc(db, 'categories', cat.id), cat, { merge: true });
    }

    console.log("Seeding Banners...");
    for (const ban of initialBanners) {
      await setDoc(doc(db, 'banners', ban.id), ban, { merge: true });
    }

    console.log("Seeding Site Settings...");
    await setDoc(doc(db, 'settings', 'site_config'), initialSiteSettings, { merge: true });

    console.log("🎉 ALL COLLECTIONS SUCCESSFULLY SEEDED TO FIREBASE CLOUD!");
  } catch (err) {
    console.error("❌ Seeding Error:", err.message);
    if (err.message.includes('permission-denied') || err.message.includes('PERMISSION_DENIED')) {
      console.error("\n👉 FIX: Go to Firebase Console -> Firestore Database -> Rules tab and publish:");
      console.error("allow read, write: if true;\n");
    }
  }
}

runSeed();
