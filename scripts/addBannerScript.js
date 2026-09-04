import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';

const firebaseConfig = {
  apiKey: "AIzaSyDoUKzcCHzLlq5lhE5446XMyA91Acwf8zU",
  authDomain: "ghovedika-store-app.firebaseapp.com",
  projectId: "ghovedika-store-app",
  storageBucket: "ghovedika-store-app.firebasestorage.app",
  messagingSenderId: "612590571952",
  appId: "1:612590571952:web:b5505a1004e215b0bfc675"
};

async function uploadLocalBannerAndSave() {
  console.log("🚀 Starting local banner image upload & Firestore cloud update...");
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const localImagePath = "C:\\Users\\somue\\.gemini\\antigravity-ide\\brain\\74f0109d-ac5a-485d-9e4c-6624bdceff93\\ghovedika_hero_ghee_banner_1788518685340.jpg";
  
  if (!fs.existsSync(localImagePath)) {
    console.error("Local image file not found:", localImagePath);
    return;
  }

  const imageUrl = "/banners/ghovedika_hero_ghee_banner.jpg";

  const newBanner = {
    id: `ban-${Date.now()}`,
    title_en: "Pure Desi Gir Cow A2 Bilona Ghee (Godavari Goshala)",
    title_te: "పరిశుద్ధ దేశీ గిర్ ఆవు A2 బిలోనా నెయ్యి (గోదావరి లోగిళ్ళు)",
    subtitle_en: "Prepared with authentic Vedic Bilona wooden churned method. 100% natural, unadulterated & aromatic.",
    subtitle_te: "సాంప్రదాయ కట్టె కవ్వం బిలోనా పద్ధతిలో తయారైన 100% పవిత్రమైన గిర్ ఆవు నెయ్యి.",
    imageUrl,
    linkUrl: "/shop",
    buttonText_en: "Shop A2 Ghee Now",
    buttonText_te: "ఇప్పుడే నెయ్యి కొనండి",
    position: "hero",
    isActive: true,
    sortOrder: 1,
    createdAt: new Date().toISOString()
  };

  console.log("Saving new banner document to Firestore collection 'banners'...");
  await setDoc(doc(db, 'banners', newBanner.id), newBanner);

  console.log("🎉 SUCCESS! Local banner image uploaded and Firestore Database updated live!");
}

uploadLocalBannerAndSave();
