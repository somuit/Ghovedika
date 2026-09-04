import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDoUKzcCHzLlq5lhE5446XMyA91Acwf8zU",
  authDomain: "ghovedika-store-app.firebaseapp.com",
  projectId: "ghovedika-store-app",
  storageBucket: "ghovedika-store-app.firebasestorage.app",
  messagingSenderId: "612590571952",
  appId: "1:612590571952:web:b5505a1004e215b0bfc675"
};

const sampleProducts = [
  {
    id: "prod-101",
    sku: "GH-GHEE-001",
    slug: "pure-desi-cow-ghee",
    name_en: "Pure Desi Gir Cow Ghee (A2 Bilona Method)",
    name_te: "పరిశుద్ధ దేశీ గిర్ ఆవు నెయ్యి (A2 బిలోనా పద్ధతి)",
    categoryId: "cat-1",
    price: 999,
    mrp: 1200,
    stock: 50,
    unit: "500 ml",
    images: ["https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800"],
    description_en: "100% Traditional Bilona Method A2 Gir Cow Ghee prepared with Vedic authenticity.",
    description_te: "100% సాంప్రదాయ బిలోనా పద్ధతిలో తయారుచేసిన వేద ప్రమాణాల A2 గిర్ ఆవు నెయ్యి.",
    isFeatured: true,
    isActive: true,
    rating: 4.9
  },
  {
    id: "prod-102",
    sku: "GH-HONEY-001",
    slug: "raw-organic-forest-honey",
    name_en: "Raw Organic Wild Forest Honey",
    name_te: "స్వచ్ఛమైన అటవీ తేనె (రసాయన రహితం)",
    categoryId: "cat-2",
    price: 499,
    mrp: 599,
    stock: 35,
    unit: "500 g",
    images: ["https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=800"],
    description_en: "Unfiltered, unheated pure raw honey collected from dense wild forests.",
    description_te: "దట్టమైన అడవుల నుండి సేకరించిన ఎటువంటి వేడి చేయని స్వచ్ఛమైన తేనె.",
    isFeatured: true,
    isActive: true,
    rating: 4.8
  }
];

const sampleCategories = [
  {
    id: "cat-1",
    slug: "desi-cow-products",
    name_en: "Desi Cow Products",
    name_te: "దేశవాళీ గో ఉత్పత్తులు",
    description_en: "Pure A2 Bilona Ghee, Gaumutra Arka, Panchagavya products.",
    description_te: "స్వచ్ఛమైన A2 బిలోనా నెయ్యి మరియు గోమయ ఉత్పత్తులు.",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600",
    sortOrder: 1,
    isActive: true
  },
  {
    id: "cat-2",
    slug: "organic-food-essentials",
    name_en: "Organic Food & Honey",
    name_te: "సేంద్రీయ ఆహార పదార్థాలు & తేనె",
    description_en: "Unprocessed raw honey, organic millets and cold pressed oils.",
    description_te: "ఆర్గానిక్ ఆహార ధాన్యాలు మరియు స్వచ్ఛమైన నూనెలు.",
    image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=600",
    sortOrder: 2,
    isActive: true
  }
];

const sampleBanners = [
  {
    id: 'ban-1',
    title_en: 'Pure Desi Gir Cow A2 Bilona Ghee',
    title_te: 'పరిశుద్ధ దేశీ గిర్ ఆవు A2 బిలోనా నెయ్యి',
    subtitle_en: 'Prepared using traditional Vedic Bilona method from indigenous Gir cows in Godavari Goshala',
    subtitle_te: 'కట్టె కవ్వం బిలోనా పద్ధతిలో తయారైన 100% ఆరోగ్యకరమైన మరియు పవిత్రమైన గిర్ ఆవు నెయ్యి',
    imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=1600&q=80',
    linkUrl: '/shop',
    buttonText_en: 'Shop A2 Ghee',
    buttonText_te: 'నెయ్యి షాపింగ్ చేయండి',
    position: 'hero',
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'ban-2',
    title_en: 'Organic Ghana & Drava Jeevamrutham Bio-Fertilizers',
    title_te: 'ఘన & ద్రవ జీవామృతం సేంద్రీయ జీవ ఎరువులు',
    subtitle_en: 'Enrich your agricultural soil naturally with Zero Chemical organic solutions for high yield',
    subtitle_te: 'రసాయన రహిత ప్రకృతి వ్యవసాయంతో నేలకు సత్తువ ఇవ్వండి, అధిక దిగుబడి పొందండి',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1600&q=80',
    linkUrl: '/category/bio-fertilizers',
    buttonText_en: 'Buy Organic Fertilizers',
    buttonText_te: 'జీవ ఎరువులు కొనండి',
    position: 'hero',
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'ban-3',
    title_en: 'Traditional Gomaya Dhoop Batti & Pooja Essentials',
    title_te: 'సాంప్రదాయ గోమయ ధూప్ స్టిక్స్ & పవిత్ర పూజా సామాగ్రి',
    subtitle_en: '100% Organic Gomaya products prepared with Vedic purity in our Godavari Goshala',
    subtitle_te: 'మా గోశాల గోవుల గోమయంతో చేసిన లక్ష్మీ కటాక్ష ధూప ద్రవ్యాలు మరియు పిడకలు',
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1600&q=80',
    linkUrl: '/category/pooja-essentials',
    buttonText_en: 'Shop Pooja Essentials',
    buttonText_te: 'పూజా ద్రవ్యాలు చూడండి',
    position: 'hero',
    isActive: true,
    sortOrder: 3,
  },
  {
    id: 'ban-4',
    title_en: 'Divine Gomaya Pooja Essentials & Paddy Tassels',
    title_te: 'పవిత్ర గోమయ ధూప్ స్టిక్స్ & వరి వెన్నుల తోరణాలు',
    subtitle_en: '100% Pure Gomaya Dhoop Sticks, Bhasmam, Pidakal & Handcrafted Decorative Vari Kannulu',
    subtitle_te: 'ఇంటికి శోభాయమానం మరియు శుభప్రదం - సహజ సిద్ధమైన గోమయ పూజా సామాగ్రి',
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1600&q=80',
    linkUrl: '/category/pooja-essentials',
    buttonText_en: 'Shop Divine Items',
    buttonText_te: 'పూజా ద్రవ్యాలు చూడండి',
    position: 'hero',
    isActive: true,
    sortOrder: 4,
  },
  {
    id: 'ban-5',
    title_en: 'Raw Unheated Organic Wild Forest Honey',
    title_te: 'స్వచ్ఛమైన అటవీ తేనె - 100% సహజమైనది',
    subtitle_en: 'Directly harvested from dense wild forests with zero chemical processing or artificial heating',
    subtitle_te: 'దట్టమైన అడవుల నుండి సేకరించిన ఎటువంటి వేడి చేయని స్వచ్ఛమైన అటవీ తేనె',
    imageUrl: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=1600&q=80',
    linkUrl: '/shop',
    buttonText_en: 'Buy Pure Honey',
    buttonText_te: 'స్వచ్ఛమైన తేనె కొనండి',
    position: 'hero',
    isActive: true,
    sortOrder: 5,
  }
];

const sampleSettings = {
  websiteName: "Ghovedika (గోవేదిక)",
  tagline_en: "Pure Desi Cow & Natural Organic Products",
  tagline_te: "స్వచ్ఛమైన దేశీ గోవు & ప్రాకృతిక ఉత్పత్తుల వేదిక",
  email: "ghovedika@gmail.com",
  primaryPhone: "9133699166",
  secondaryPhone: "9133699133",
  whatsappNumber: "918008588599",
  logoUrl: "/logo.png",
  storeAddress: "Main Road, Near Ksheera Ramalingeswara Temple, Palakol, W.G. Dist, A.P - 534260",
  baseShippingCharge: 50,
  freeShippingThreshold: 999,
  isCODEnabled: true,
  isRazorpayEnabled: true,
  razorpayKeyId: "rzp_test_TUK52yasX9ouWT"
};

async function seedDirect() {
  console.log("Connecting to Firestore Project:", firebaseConfig.projectId);
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log("Writing to collection 'products'...");
    for (const p of sampleProducts) {
      await setDoc(doc(db, 'products', p.id), p, { merge: true });
    }

    console.log("Writing to collection 'categories'...");
    for (const c of sampleCategories) {
      await setDoc(doc(db, 'categories', c.id), c, { merge: true });
    }

    console.log("Writing to collection 'banners'...");
    for (const b of sampleBanners) {
      await setDoc(doc(db, 'banners', b.id), b, { merge: true });
    }

    console.log("Writing to collection 'settings'...");
    await setDoc(doc(db, 'settings', 'site_config'), sampleSettings, { merge: true });

    console.log("🎉 SUCCESS! All collections created and documents written to Firebase Firestore project:", firebaseConfig.projectId);
  } catch (err) {
    console.error("Firestore Write Error:", err.message);
  }
}

seedDirect();
