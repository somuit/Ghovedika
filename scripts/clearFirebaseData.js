import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDoUKzcCHzLlq5lhE5446XMyA91Acwf8zU",
  authDomain: "ghovedika-store-app.firebaseapp.com",
  projectId: "ghovedika-store-app",
  storageBucket: "ghovedika-store-app.firebasestorage.app",
  messagingSenderId: "612590571952",
  appId: "1:612590571952:web:b5505a1004e215b0bfc675"
};

async function clearData() {
  console.log("Connecting to Firestore Project:", firebaseConfig.projectId);
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const collectionsToClear = ['products', 'categories', 'banners', 'coupons', 'faqs', 'testimonials'];
    let totalDeleted = 0;

    for (const colName of collectionsToClear) {
      console.log(`Clearing collection '${colName}'...`);
      const snap = await getDocs(collection(db, colName));
      for (const d of snap.docs) {
        await deleteDoc(doc(db, colName, d.id));
        totalDeleted++;
      }
    }

    console.log(`🎉 SUCCESS! Cleaned ${totalDeleted} dummy documents from Firebase Firestore.`);
  } catch (err) {
    console.error("Firestore Clear Error:", err.message);
  }
}

clearData();
