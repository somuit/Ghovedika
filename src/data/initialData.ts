import { Product, Category, Coupon, Banner, CMSPage, GeneralFAQ, SiteSettings, Testimonial } from '../types';

export const initialSiteSettings: SiteSettings = {
  logoUrl: '/logo.png',
  faviconUrl: '/favicon.svg',
  websiteName: 'Ghovedika | గోవేదిక',
  primaryPhone: '8008588599',
  secondaryPhone: '9393935343',
  whatsappNumber: '918008588599',
  email: 'ghovedika@gmail.com',
  storeAddress: 'Opposite Bradipeta Bridge, Palakollu, West Godavari District, Andhra Pradesh - 534260',
  premisesAddress: 'Vedangi–Vedangipalem, Poduru Mandal, West Godavari District, Andhra Pradesh - 534260',
  googleMapsUrlStore: 'https://maps.google.com/?q=Palakollu+West+Godavari',
  googleMapsUrlPremises: 'https://maps.google.com/?q=Vedangi+Poduru+Mandal',
  facebookUrl: 'https://www.facebook.com/share/1DJTJXW4wL/?mibextid=wwXIfr',
  instagramUrl: 'https://www.instagram.com/ghovedika?igsi=MTh3ejE2bm1naHgxZw==',
  youtubeUrl: 'https://youtube.com/@ghovedika?si=372SZ0l_EllLUDu8',
  currencySymbol: '₹',
  defaultLanguage: 'te',
  baseShippingCharge: 60,
  freeShippingThreshold: 999,
  isCODEnabled: true,
  isRazorpayEnabled: true,
  razorpayKeyId: 'rzp_test_TUK52yasX9ouWT',
  defaultSeoTitle: 'Ghovedika | గోవేదిక - Authentic Cow Products & Bio-Fertilizers',
  defaultSeoDescription: 'Shop 100% pure Desi Cow Ghee, Bio-Fertilizers, Ghana & Drava Jeevamrutham, Gomaya Dhoop, Paddy Tassels & Traditional Eco Decor direct from Palakollu, West Godavari.',
  // DPDP Act 2023 & Rules 2025 Config
  privacyPolicyVersion: 'v1.0-2025',
  privacyContactEmail: 'ghovedika@gmail.com',
  privacyContactPhone: '8008588599',
  privacyResponseSlaDays: 90,
  isMarketingConsentRequired: true,
  isAnalyticsEnabled: false,
  dataRetentionOrderYears: 7,
  dataRetentionAccountDays: 365,
};

export const initialCategories: Category[] = [
  {
    id: 'cat-1',
    slug: 'bio-fertilizers',
    name_en: 'Bio-Fertilizers & Plant Nutrition',
    name_te: 'జీవ ఎరువులు & మొక్కల పోషణ',
    description_en: 'Organic bio-fertilizers and cow-based plant enhancers for high yield and healthy soil.',
    description_te: 'అధిక దిగుబడి మరియు ఆరోగ్యకరమైన నేల కోసం సేంద్రీయ జీవ ఎరువులు మరియు గోవు ఆధారిత మొక్కల పోషకాలు.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 'cat-2',
    slug: 'pooja-essentials',
    name_en: 'Pooja & Spiritual Essentials',
    name_te: 'పూజ & ఆధ్యాత్మిక సామగ్రి',
    description_en: 'Sacred Gomaya Dhoop, Sambrani, Vibhuti and Cow Dung Cakes for divine rituals.',
    description_te: 'దైవిక కార్యక్రమాల కోసం పవిత్రమైన గోమయ ధూప్, సాంబ్రాణి, విభూతి మరియు గోవు పిడకలు.',
    image: 'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=600&q=80',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 'cat-3',
    slug: 'eco-decor',
    name_en: 'Traditional & Eco Decor',
    name_te: 'సాంప్రదాయ & పర్యావరణ అనుకూల అలంకరణ',
    description_en: 'Handcrafted Paddy Tassels, Door Torans, Bird Nests & Natural Deco items.',
    description_te: 'చేతితో తయారు చేసిన వరి కన్నుల తోరణాలు, పక్షుల గూళ్ళు మరియు సహజ అలంకరణ వస్తువులు.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 'cat-4',
    slug: 'hygiene-household',
    name_en: 'Hygiene & Household',
    name_te: 'పరిశుభ్రత & గృహ అవసరాలు',
    description_en: 'Eco-friendly natural Gomaya Phenyl and chemical-free household products.',
    description_te: 'పర్యావరణ అనుకూలమైన సహజ గోమయ ఫినైల్ మరియు రసాయన రహిత గృహ ఉత్పత్తులు.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    sortOrder: 4,
    isActive: true,
  },
  {
    id: 'cat-5',
    slug: 'food-wellness',
    name_en: 'Natural Food & Wellness',
    name_te: 'సహజ ఆహారం & ఆరోగ్యం',
    description_en: 'Pure Desi Cow Ghee, Natural Honey, Herbal Sunnipindi & Pure Oils.',
    description_te: 'స్వచ్ఛమైన దేశీ ఆవు నెయ్యి, ప్రకృతి తేనె, మూలికా సున్నిపిండి మరియు స్వచ్ఛమైన నూనెలు.',
    image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=600&q=80',
    sortOrder: 5,
    isActive: true,
  },
];

export const initialProducts: Product[] = [
  // Category 1: Bio-Fertilizers & Plant Nutrition
  {
    id: 'prod-1',
    sku: 'GH-BIO-001',
    slug: 'growth-mix',
    name_en: 'Growth Mix',
    name_te: 'గ్రోత్ మిక్స్',
    categoryId: 'cat-1',
    price: 249,
    mrp: 299,
    discount: 17,
    stock: 50,
    unit: '1 kg',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    ],
    description_en: 'Ghovedika Growth Mix is a bio-enriched organic soil booster made with enriched cow dung, bio-solubles, and natural minerals to stimulate root elongation and crop growth.',
    description_te: 'గోవేదిక గ్రోత్ మిక్స్ అనేది ఆవు పేడ మరియు సహజ ఖనిజాలతో సమృద్ధిగా తయారు చేయబడిన సత్తువ కలిగిన ఎరువు. ఇది వేళ్ళ ఎదుగుదలకు మరియు మొక్కల బలానికి తోడ్పడుతుంది.',
    benefits_en: [
      'Enriches root microbial activity',
      'Improves soil water retention',
      '100% Organic & Chemical-free',
      'Suitable for home gardens & agricultural crops'
    ],
    benefits_te: [
      'వేరు వ్యవస్థను శక్తివంతం చేస్తుంది',
      'నేల నీటిని పట్టి ఉంచే సామర్థ్యాన్ని పెంచుతుంది',
      '100% రసాయన రహిత సేంద్రీయ ఎరువు',
      'ఇంటి తోటలు మరియు పంట పొలాలకు శ్రేష్ఠమైనది'
    ],
    usage_en: [
      'Apply 50-100 grams near the base of garden plants every 15 days.',
      'Mix thoroughly with top soil and water gently.'
    ],
    usage_te: [
      'ప్రతి 15 రోజులకు ఒకసారి మొక్క మొదట్లో 50-100 గ్రాములు వేయండి.',
      'పై మట్టిలో కలిపి తేలికగా నీరు పెట్టండి.'
    ],
    specifications: [
      { key_en: 'Form', key_te: 'రూపం', value_en: 'Powder / Granular', value_te: 'పొడి / గుళికలు' },
      { key_en: 'Source', key_te: 'మూలం', value_en: 'Desi Cow Biomass', value_te: 'దేశీ గోమయం' },
      { key_en: 'Shelf Life', key_te: 'కాలపరిమితి', value_en: '12 Months', value_te: '12 నెలలు' }
    ],
    faqs: [
      {
        question_en: 'Can I use this for indoor pots?',
        question_te: 'ఇంటి లోపలి కుండీలకు ఉపయోగించవచ్చా?',
        answer_en: 'Yes, it is odorless and safe for all indoor and outdoor plants.',
        answer_te: 'అవును, ఇది ఎటువంటి దుర్వాసన లేకుండా ఇంటి లోపలి మరియు బయటి మొక్కలకు సురక్షితమైనది.'
      }
    ],
    variants: [
      { id: 'var-1-1', name_en: '1 kg Pack', name_te: '1 కేజీ ప్యాక్', weightUnit: '1 kg', price: 249, mrp: 299, stock: 30, sku: 'GH-BIO-001-1K', isDefault: true },
      { id: 'var-1-2', name_en: '5 kg Pack', name_te: '5 కేజీ ప్యాక్', weightUnit: '5 kg', price: 999, mrp: 1299, stock: 20, sku: 'GH-BIO-001-5K' }
    ],
    tags: ['Bio-Fertilizer', 'Soil Booster', 'Organic', 'Plant Growth'],
    isFeatured: true,
    isActive: true,
    rating: 4.8,
    reviewsCount: 19,
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'prod-2',
    sku: 'GH-BIO-002',
    slug: 'ghana-jeevamrutham',
    name_en: 'Ghana Jeevamrutham',
    name_te: 'ఘన జీవామృతం',
    categoryId: 'cat-1',
    price: 199,
    mrp: 249,
    discount: 20,
    stock: 75,
    unit: '1 kg',
    images: [
      'https://images.unsplash.com/photo-1592417817098-8f3d6eb19655?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Fermented solid Jeevamrutham made from Desi Cow Dung, Cow Urine, Jaggery, and Pulse Flour. Naturally restores native soil microflora.',
    description_te: 'దేశీ ఆవు పేడ, గోమూత్రం, బెల్లం, మరియు శనగపిండితో తయారు చేసిన పవిత్ర ఘన జీవామృతం. నేలలోని ఉపయోగకర సూక్ష్మజీవులను వృద్ధి చేస్తుంది.',
    benefits_en: ['Boosts earthworm population', 'Naturally increases N-P-K availability', 'Improves crop yield organically'],
    benefits_te: ['వానపాముల సంఖ్యను పెంచుతుంది', 'నేలలో సహజ నత్రజని, భాస్వరం, పొటాషియం పెంపొందిస్తుంది', 'పంట దిగుబడిని పెంచుతుంది'],
    usage_en: ['Broadcast 100g per plant or 100kg per acre during sowing.'],
    usage_te: ['విత్తే సమయంలో ఎకరానికి 100 కేజీలు లేదా మొక్కకు 100 గ్రాములు చల్లండి.'],
    specifications: [
      { key_en: 'Origin', key_te: 'మూలం', value_en: 'Poduru Goshala', value_te: 'పోడూరు గోశాల' }
    ],
    faqs: [],
    variants: [
      { id: 'var-2-1', name_en: '1 kg', name_te: '1 కేజీ', weightUnit: '1 kg', price: 199, mrp: 249, stock: 50, sku: 'GH-BIO-002-1K', isDefault: true },
      { id: 'var-2-2', name_en: '5 kg', name_te: '5 కేజీ', weightUnit: '5 kg', price: 850, mrp: 1100, stock: 25, sku: 'GH-BIO-002-5K' }
    ],
    tags: ['Ghana Jeevamrutham', 'Organic Soil', 'Desi Cow'],
    isFeatured: true,
    isActive: true,
    rating: 4.9,
    reviewsCount: 32,
    createdAt: '2026-01-12T10:00:00Z',
    updatedAt: '2026-01-12T10:00:00Z',
  },
  {
    id: 'prod-3',
    sku: 'GH-BIO-003',
    slug: 'drava-jeevamrutham',
    name_en: 'Drava Jeevamrutham',
    name_te: 'ద్రవ జీవామృతం',
    categoryId: 'cat-1',
    price: 149,
    mrp: 180,
    discount: 17,
    stock: 40,
    unit: '1 Litre',
    images: [
      'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Concentrated Liquid Jeevamrutham ready for foliar spray and drip irrigation to activate soil microbial ecology.',
    description_te: 'స్ప్రే మరియు స్ప్రింక్లర్ ద్వారా నేరుగా మొక్కలకు అందించడానికి అనుకూలమైన స్వచ్ఛమైన ద్రవ జీవామృతం.',
    benefits_en: ['Rapid nutrient uptake', 'Prevents leaf yellowing', 'Enhances flowering'],
    benefits_te: ['పోషకాలు శీఘ్రంగా అందేలా చేస్తుంది', 'ఆకులు పసుపు పచ్చగా మారకుండా చూస్తుంది', 'పూత బాగా వచ్చేలా చేస్తుంది'],
    usage_en: ['Dilute 100ml in 10 Litres of water and spray on foliage every fortnight.'],
    usage_te: ['10 లీటర్ల నీటిలో 100ml కలిపి ప్రతి 15 రోజులకు ఒకసారి మొక్కలపై పిచికారీ చేయండి.'],
    specifications: [
      { key_en: 'Packaging', key_te: 'ప్యాకింగ్', value_en: 'HDPE Bottle', value_te: 'HDPE బాటిల్' }
    ],
    faqs: [],
    variants: [
      { id: 'var-3-1', name_en: '1 Litre Bottle', name_te: '1 లీటరు బాటిల్', weightUnit: '1 Ltr', price: 149, mrp: 180, stock: 40, sku: 'GH-BIO-003-1L', isDefault: true }
    ],
    tags: ['Liquid Fertilizer', 'Foliar Spray', 'Drava Jeevamrutham'],
    isFeatured: false,
    isActive: true,
    rating: 4.7,
    reviewsCount: 14,
    createdAt: '2026-01-12T10:00:00Z',
    updatedAt: '2026-01-12T10:00:00Z',
  },
  {
    id: 'prod-4',
    sku: 'GH-BIO-004',
    slug: 'agni-astram',
    name_en: 'Agni Astram',
    name_te: 'అగ్ని అస్త్రం',
    categoryId: 'cat-1',
    price: 180,
    mrp: 220,
    discount: 18,
    stock: 30,
    unit: '500 ml',
    images: [
      'https://images.unsplash.com/photo-1590005354167-6da97870c757?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Traditional eco-friendly organic pest repellent concoction made with neem, green chillies, garlic, and cow urine.',
    description_te: 'వేపాకు, పచ్చిమిర్చి, వెల్లుల్లి మరియు గోమూత్రంతో సాంప్రదాయ పద్ధతిలో తయారు చేసిన సహజ కీటక నివారిణి.',
    benefits_en: ['Effective against sucking pests & caterpillars', 'Zero chemical toxicity'],
    benefits_te: ['రసం పీల్చే పురుగులు, లార్వాల నివారణలో అత్యంత ప్రభావవంతమైనది', 'రసాయన విషాలు లేవు'],
    usage_en: ['Mix 20ml per Litre of water and spray on infected leaves.'],
    usage_te: ['1 లీటరు నీటికి 20ml కలిపి ఆకులపై పిచికారీ చేయండి.'],
    specifications: [],
    faqs: [],
    variants: [
      { id: 'var-4-1', name_en: '500 ml Bottle', name_te: '500 ml బాటిల్', weightUnit: '500 ml', price: 180, mrp: 220, stock: 30, sku: 'GH-BIO-004-500', isDefault: true }
    ],
    tags: ['Pest Repellent', 'Agni Astram', 'Neem Chilli'],
    isFeatured: false,
    isActive: true,
    rating: 4.8,
    reviewsCount: 8,
    createdAt: '2026-01-14T10:00:00Z',
    updatedAt: '2026-01-14T10:00:00Z',
  },
  {
    id: 'prod-5',
    sku: 'GH-BIO-005',
    slug: 'vermicompost',
    name_en: 'Vermicompost',
    name_te: 'వర్మి కంపోస్ట్',
    categoryId: 'cat-1',
    price: 160,
    mrp: 200,
    discount: 20,
    stock: 100,
    unit: '1 kg',
    images: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Pure earthworm-processed organic compost rich in essential plant micro-nutrients.',
    description_te: 'వానపాముల ద్వారా తయారు చేయబడిన పోషకాలతో కూడిన స్వచ్ఛమైన సేంద్రీయ వర్మి కంపోస్ట్.',
    benefits_en: ['Improves soil aeration & texture', '100% Eco-friendly'],
    benefits_te: ['నేల గాలి ప్రసరణను మెరుగుపరుస్తుంది', '100% పర్యావరణ అనుకూలమైనది'],
    usage_en: ['Apply 200g per pot monthly.'],
    usage_te: ['నెలకు ఒకసారి కుండీకి 200 గ్రాములు వేయండి.'],
    specifications: [],
    faqs: [],
    variants: [
      { id: 'var-5-1', name_en: '1 kg Pack', name_te: '1 కేజీ ప్యాక్', weightUnit: '1 kg', price: 160, mrp: 200, stock: 60, sku: 'GH-BIO-005-1K', isDefault: true },
      { id: 'var-5-2', name_en: '5 kg Pack', name_te: '5 కేజీ ప్యాక్', weightUnit: '5 kg', price: 650, mrp: 850, stock: 40, sku: 'GH-BIO-005-5K' }
    ],
    tags: ['Vermicompost', 'Organic Compost'],
    isFeatured: true,
    isActive: true,
    rating: 4.9,
    reviewsCount: 45,
    createdAt: '2026-01-14T10:00:00Z',
    updatedAt: '2026-01-14T10:00:00Z',
  },
  {
    id: 'prod-6',
    sku: 'GH-BIO-006',
    slug: 'cocopeat',
    name_en: 'Cocopeat Block',
    name_te: 'కోకోపీట్ బ్లాక్',
    categoryId: 'cat-1',
    price: 120,
    mrp: 150,
    discount: 20,
    stock: 60,
    unit: '1 kg Block',
    images: [
      'https://images.unsplash.com/photo-1592417817098-8f3d6eb19655?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Washed and compressed premium coconut coir block that expands up to 15 litres of growing medium.',
    description_te: 'మంచి నీటితో శుభ్రపరచిన ప్రీమియం కొబ్బరి పొట్టు బ్లాక్. నీరు పోస్తే 15 లీటర్ల మట్టి మిశ్రమంగా మారుతుంది.',
    benefits_en: ['High moisture retention', 'Ideal for terrace gardens'],
    benefits_te: ['ఎక్కువ సమయం నీటిని పట్టి ఉంచుతుంది', 'మిద్దె తోటలకు అనువైనది'],
    usage_en: ['Soak block in 5 litres of water for 20 minutes before mixing with soil.'],
    usage_te: ['మట్టితో కలిపే ముందు 5 లీటర్ల నీటిలో 20 నిమిషాలు నానబెట్టండి.'],
    specifications: [],
    faqs: [],
    variants: [
      { id: 'var-6-1', name_en: '1 kg Block', name_te: '1 కేజీ బ్లాక్', weightUnit: '1 kg', price: 120, mrp: 150, stock: 60, sku: 'GH-BIO-006-1K', isDefault: true }
    ],
    tags: ['Cocopeat', 'Terrace Garden'],
    isFeatured: false,
    isActive: true,
    rating: 4.6,
    reviewsCount: 11,
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'prod-7',
    sku: 'GH-BIO-007',
    slug: 'cow-dung-powder',
    name_en: 'Cow Dung Powder',
    name_te: 'ఆవు పేడ పొడి',
    categoryId: 'cat-1',
    price: 99,
    mrp: 130,
    discount: 24,
    stock: 80,
    unit: '1 kg',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Sun-dried, finely sieved pure Desi Cow Dung manure for rich organic carbon.',
    description_te: 'ఎండలో ఎండబెట్టి, జల్లెడ పట్టిన స్వచ్ఛమైన దేశీ ఆవు పేడ పొడి ఎరువు.',
    benefits_en: ['100% Pure', 'Adds organic carbon to soil'],
    benefits_te: ['100% స్వచ్ఛమైనది', 'నేలలో ఆర్గానిక్ కార్బన్ పెంచుతుంది'],
    usage_en: ['Mix with pot soil.'],
    usage_te: ['కుండీ మట్టితో కలపండి.'],
    specifications: [],
    faqs: [],
    variants: [
      { id: 'var-7-1', name_en: '1 kg Pack', name_te: '1 కేజీ ప్యాక్', weightUnit: '1 kg', price: 99, mrp: 130, stock: 80, sku: 'GH-BIO-007-1K', isDefault: true }
    ],
    tags: ['Cow Dung Powder', 'Manure'],
    isFeatured: false,
    isActive: true,
    rating: 4.8,
    reviewsCount: 15,
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'prod-8',
    sku: 'GH-BIO-008',
    slug: 'neem-cake-powder',
    name_en: 'Neem Cake Powder',
    name_te: 'వేప పిండి పొడి',
    categoryId: 'cat-1',
    price: 130,
    mrp: 160,
    discount: 19,
    stock: 50,
    unit: '1 kg',
    images: [
      'https://images.unsplash.com/photo-1590005354167-6da97870c757?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Cold-pressed neem cake meal that protects root zones from nematodes and root rot.',
    description_te: 'వేప గింజల నుండి పిండి తయారు చేసిన సహజ వేప పిండి పొడి. ఇది వేరు పురుగులు మరియు తెగుళ్ళ నుండి కాపాడుతుంది.',
    benefits_en: ['Nematode control', 'Enhances nitrogen retention'],
    benefits_te: ['వేరు పురుగుల నివారణ', 'నత్రజని నిల్వను పెంచుతుంది'],
    usage_en: ['Apply 50g near root zone.'],
    usage_te: ['వేరు దగ్గర 50 గ్రాములు వేయండి.'],
    specifications: [],
    faqs: [],
    variants: [
      { id: 'var-8-1', name_en: '1 kg Pack', name_te: '1 కేజీ ప్యాక్', weightUnit: '1 kg', price: 130, mrp: 160, stock: 50, sku: 'GH-BIO-008-1K', isDefault: true }
    ],
    tags: ['Neem Cake', 'Nematode Repellent'],
    isFeatured: false,
    isActive: true,
    rating: 4.7,
    reviewsCount: 9,
    createdAt: '2026-01-16T10:00:00Z',
    updatedAt: '2026-01-16T10:00:00Z',
  },
  {
    id: 'prod-9',
    sku: 'GH-BIO-009',
    slug: 'cow-urine',
    name_en: 'Distilled Cow Urine (Go-Mutra)',
    name_te: 'శుద్ధి చేసిన గోమూత్రం',
    categoryId: 'cat-1',
    price: 110,
    mrp: 140,
    discount: 21,
    stock: 40,
    unit: '1 Litre',
    images: [
      'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Pure Desi Cow Urine collected at sunrise, ideal for preparing organic sprays and bio-pesticides.',
    description_te: 'ఉదయాన్నే సేకరించిన స్వచ్ఛమైన దేశీ గోమూత్రం. కీటక నివారిణులు మరియు సేంద్రీయ ద్రావణాల తయారీకి ఉత్తమమైనది.',
    benefits_en: ['Natural bio-fungicide base', 'Rich in trace minerals'],
    benefits_te: ['సహజ ఫంగిసైడ్ తయారీకి అనువైనది', 'ఖనిజ లవణాల సమృద్ధి'],
    usage_en: ['Dilute 50ml per Litre of water.'],
    usage_te: ['1 లీటరు నీటికి 50ml కలపండి.'],
    specifications: [],
    faqs: [],
    variants: [
      { id: 'var-9-1', name_en: '1 Litre Bottle', name_te: '1 లీటరు బాటిల్', weightUnit: '1 Ltr', price: 110, mrp: 140, stock: 40, sku: 'GH-BIO-009-1L', isDefault: true }
    ],
    tags: ['Cow Urine', 'Go Mutra', 'Organic Spray'],
    isFeatured: false,
    isActive: true,
    rating: 4.9,
    reviewsCount: 16,
    createdAt: '2026-01-16T10:00:00Z',
    updatedAt: '2026-01-16T10:00:00Z',
  },

  // Category 2: Pooja & Spiritual Essentials
  {
    id: 'prod-10',
    sku: 'GH-POOJA-001',
    slug: 'gomaya-dhoop-sticks',
    name_en: 'Gomaya Dhoop Sticks',
    name_te: 'గోమయ ధూప్ స్టిక్స్',
    categoryId: 'cat-2',
    price: 120,
    mrp: 150,
    discount: 20,
    stock: 120,
    unit: 'Pack of 30 Sticks',
    images: [
      'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: '100% Charcoal-free natural Dhoop sticks blended with Desi Cow Dung, Sambrani, and pure herbs for divine aroma.',
    description_te: 'బొగ్గు రహిత 100% సహజ సిద్ధమైన గోమయ ధూప్ స్టిక్స్. ఆవు పేడ, సాంబ్రాణి మరియు పవిత్ర మూలికలతో శోభాయమానంగా తయారు చేయబడింది.',
    benefits_en: [
      'Purifies indoor air and drives away mosquitoes',
      'Zero charcoal or harmful chemical fragrance',
      'Creates a peaceful, meditative atmosphere'
    ],
    benefits_te: [
      'ఇంటి వాతావరణాన్ని పవిత్రం చేసి దోమలను తోలివేస్తుంది',
      'బొగ్గు లేదా హానికర రసాయన సువాసనలు లేవు',
      'ప్రశాంతమైన మరియు ధ్యాన వాతావరణాన్ని అందిస్తుంది'
    ],
    usage_en: ['Light the tip of the stick, gently blow out flame and place on ceramic holder.'],
    usage_te: ['స్టిక్ చివర నిప్పు అంటించి, జ్వాలను ఆర్పి పీఠంపై ఉంచండి.'],
    specifications: [
      { key_en: 'Count', key_te: 'సంఖ్య', value_en: '30 Sticks + Holder', value_te: '30 స్టిక్స్ + పీఠం' },
      { key_en: 'Burn Time', key_te: 'వెలిగే సమయం', value_en: '45 Minutes', value_te: '45 నిమిషాలు' }
    ],
    faqs: [],
    variants: [
      { id: 'var-10-1', name_en: 'Pack of 30', name_te: '30 స్టిక్స్ ప్యాక్', weightUnit: '30 Pcs', price: 120, mrp: 150, stock: 120, sku: 'GH-POOJA-001-30', isDefault: true }
    ],
    tags: ['Dhoop Sticks', 'Gomaya', 'Charcoal Free', 'Pooja'],
    isFeatured: true,
    isActive: true,
    rating: 5.0,
    reviewsCount: 52,
    createdAt: '2026-01-05T10:00:00Z',
    updatedAt: '2026-01-05T10:00:00Z',
  },
  {
    id: 'prod-11',
    sku: 'GH-POOJA-002',
    slug: 'sambrani-cups',
    name_en: 'Natural Sambrani Cups',
    name_te: 'సాంబ్రాణి కప్స్',
    categoryId: 'cat-2',
    price: 150,
    mrp: 180,
    discount: 17,
    stock: 90,
    unit: 'Pack of 12 Cups',
    images: [
      'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Handmade Gomaya cups pre-filled with pure natural Loban Sambrani resins.',
    description_te: 'స్వచ్ఛమైన సాంబ్రాణి గుగ్గిలంతో నింపబడిన హస్తకళా గోమయ సాంబ్రాణి కప్పులు.',
    benefits_en: ['Traditional Havanam fragrance', 'Brings positive spiritual vibes'],
    benefits_te: ['సాంప్రదాయ యజ్ఞ ధూపం సువాసన', 'ఇంట్లో సకల ధనాత్మక శక్తిని ఇస్తుంది'],
    usage_en: ['Light rim of cup until it catches ember.'],
    usage_te: ['కప్పు అంచులకు నిప్పు అంటించి పొగ వచ్చేలా చూడండి.'],
    specifications: [],
    faqs: [],
    variants: [
      { id: 'var-11-1', name_en: 'Pack of 12', name_te: '12 కప్స్ ప్యాక్', weightUnit: '12 Pcs', price: 150, mrp: 180, stock: 90, sku: 'GH-POOJA-002-12', isDefault: true }
    ],
    tags: ['Sambrani', 'Loban', 'Spiritual'],
    isFeatured: true,
    isActive: true,
    rating: 4.9,
    reviewsCount: 38,
    createdAt: '2026-01-08T10:00:00Z',
    updatedAt: '2026-01-08T10:00:00Z',
  },
  {
    id: 'prod-12',
    sku: 'GH-POOJA-003',
    slug: 'sacred-vibhuti',
    name_en: 'Sacred Gomaya Vibhuti',
    name_te: 'పవిత్ర విభూతి',
    categoryId: 'cat-2',
    price: 80,
    mrp: 100,
    discount: 20,
    stock: 150,
    unit: '100g Pouch',
    images: [
      'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Pure consecrated Bhasma prepared traditionally by burning Desi Cow Dung cakes with sacred chants.',
    description_te: 'దేశీ ఆవు పిడకలను వేద మంత్రోచ్ఛారణలతో పవిత్రంగా కాల్చి శుద్ధి చేసిన అత్యంత పవిత్రమైన గోమయ విభూతి.',
    benefits_en: ['Soothes mind', '100% Pure & Authentic sacred ash'],
    benefits_te: ['మనస్సుకు ప్రశాంతత చేకూరుస్తుంది', '100% స్వచ్ఛమైన పవిత్రమైన విభూతి'],
    usage_en: ['Apply on forehead after morning prayers.'],
    usage_te: ['ఉదయం పూజల అనంతరం నుదుటన ధరించండి.'],
    specifications: [],
    faqs: [],
    variants: [
      { id: 'var-12-1', name_en: '100g Pouch', name_te: '100g ప్యాక్', weightUnit: '100g', price: 80, mrp: 100, stock: 150, sku: 'GH-POOJA-003-100', isDefault: true }
    ],
    tags: ['Vibhuti', 'Bhasma', 'Pooja'],
    isFeatured: false,
    isActive: true,
    rating: 4.9,
    reviewsCount: 27,
    createdAt: '2026-01-08T10:00:00Z',
    updatedAt: '2026-01-08T10:00:00Z',
  },
  {
    id: 'prod-13',
    sku: 'GH-POOJA-004',
    slug: 'agarbatti',
    name_en: 'Natural Herbal Agarbatti',
    name_te: 'సహజ మూలికా అగరబత్తి',
    categoryId: 'cat-2',
    price: 90,
    mrp: 120,
    discount: 25,
    stock: 100,
    unit: 'Pack of 50 Sticks',
    images: [
      'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Chemical-free natural incense sticks prepared with temple flower extracts and cow ghee aroma.',
    description_te: 'రసాయనాలు లేని పవిత్ర దేవాలయ పుష్పాల సారం మరియు ఆవు నెయ్యి సువాసనతో తయారు చేసిన అగరబత్తులు.',
    benefits_en: ['Long lasting fragrance', 'Non-toxic'],
    benefits_te: ['ఎక్కువ సమయం నిలిచే సువాసన', 'విష రసాయనాలు లేవు'],
    usage_en: ['Light during prayer.'],
    usage_te: ['పూజ సమయంలో వెలిగించండి.'],
    specifications: [],
    faqs: [],
    variants: [
      { id: 'var-13-1', name_en: 'Pack of 50', name_te: '50 స్టిక్స్ ప్యాక్', weightUnit: '50 Pcs', price: 90, mrp: 120, stock: 100, sku: 'GH-POOJA-004-50', isDefault: true }
    ],
    tags: ['Agarbatti', 'Incense'],
    isFeatured: false,
    isActive: true,
    rating: 4.7,
    reviewsCount: 18,
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'prod-14',
    sku: 'GH-POOJA-005',
    slug: 'cow-dung-cakes',
    name_en: 'Desi Cow Dung Cakes (Pidakal)',
    name_te: 'దేశీ ఆవు పిడకలు',
    categoryId: 'cat-2',
    price: 140,
    mrp: 180,
    discount: 22,
    stock: 200,
    unit: 'Pack of 20 Pcs',
    images: [
      'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Handmade sun-dried pure Cow Dung cakes for Yagna, Havanam, and Agnihotra rituals.',
    description_te: 'హోమాలు, యజ్ఞాలు మరియు అగ్నిహోత్ర క్రతువుల కోసం చేతితో చేసి ఎండబెట్టిన స్వచ్ఛమైన ఆవు పిడకలు.',
    benefits_en: ['100% Pure Desi Cow', 'Burns clean with sacred aroma'],
    benefits_te: ['100% స్వచ్ఛమైన దేశీ గోమయం', 'పవిత్ర సువాసనతో కాల్చేందుకు అనువైనవి'],
    usage_en: ['Use in Havan Kund.'],
    usage_te: ['హోమ గుండంలో ఉపయోగించండి.'],
    specifications: [],
    faqs: [],
    variants: [
      { id: 'var-14-1', name_en: 'Pack of 20', name_te: '20 పిడకల ప్యాక్', weightUnit: '20 Pcs', price: 140, mrp: 180, stock: 200, sku: 'GH-POOJA-005-20', isDefault: true }
    ],
    tags: ['Cow Dung Cakes', 'Pidakal', 'Yagna'],
    isFeatured: true,
    isActive: true,
    rating: 4.9,
    reviewsCount: 64,
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'prod-15',
    sku: 'GH-POOJA-006',
    slug: 'neem-leaf-cow-dung-cakes',
    name_en: 'Neem Leaf Cow Dung Cakes',
    name_te: 'వేపాకు ఆవు పిడకలు',
    categoryId: 'cat-2',
    price: 160,
    mrp: 200,
    discount: 20,
    stock: 120,
    unit: 'Pack of 20 Pcs',
    images: [
      'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Cow dung cakes mixed with fresh neem leaves, ideal for pest-repelling smokes and homam.',
    description_te: 'తాజా వేపాకు కలిపి తయారు చేసిన గోమయ పిడకలు. దోమలు, క్రిమికీటకాలను నివారించడానికి శ్రేష్ఠమైనది.',
    benefits_en: ['Disinfects air naturally', 'Prevents mosquitoes'],
    benefits_te: ['గాలిని క్రిమిరహితం చేస్తుంది', 'దోమలను నివారిస్తుంది'],
    usage_en: ['Burn outdoors or in dhoop burner.'],
    usage_te: ['ధూప పాత్రలో వేసి పొగ వేయండి.'],
    specifications: [],
    faqs: [],
    variants: [
      { id: 'var-15-1', name_en: 'Pack of 20', name_te: '20 పిడకల ప్యాక్', weightUnit: '20 Pcs', price: 160, mrp: 200, stock: 120, sku: 'GH-POOJA-006-20', isDefault: true }
    ],
    tags: ['Neem Cakes', 'Mosquito Repellent'],
    isFeatured: false,
    isActive: true,
    rating: 4.8,
    reviewsCount: 22,
    createdAt: '2026-01-12T10:00:00Z',
    updatedAt: '2026-01-12T10:00:00Z',
  },
  {
    id: 'prod-16',
    sku: 'GH-POOJA-007',
    slug: 'bhogi-cow-dung-cakes',
    name_en: 'Bhogi Festival Cow Dung Cakes',
    name_te: 'భోగి పిడకలు / భోగి దండ',
    categoryId: 'cat-2',
    price: 199,
    mrp: 250,
    discount: 20,
    stock: 80,
    unit: 'Set of 27 Cakes String',
    images: [
      'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Traditional Bhogi Danda set made of 27 mini sacred dung cakes tied with eco jute thread for Sankranti Bhogi Mantalu.',
    description_te: 'సంక్రాంతి భోగి మంటల కోసం 27 పవిత్ర చిన్న పిడకలతో జూట్ నూలుతో తయారు చేసిన సాంప్రదాయ భోగి దండ.',
    benefits_en: ['Authentic Sankranti tradition', 'Ready to burn set'],
    benefits_te: ['సంక్రాంతి భోగి సాంప్రదాయ దండ', 'సులభంగా వెలిగించే ప్యాక్'],
    usage_en: ['Offer during Bhogi bonfire morning.'],
    usage_te: ['భోగి పండగ ఉదయం మంటలలో సమర్పించండి.'],
    specifications: [],
    faqs: [],
    variants: [
      { id: 'var-16-1', name_en: 'Set of 27 String', name_te: '27 పిడకల దండ', weightUnit: '1 Garland', price: 199, mrp: 250, stock: 80, sku: 'GH-POOJA-007-27', isDefault: true }
    ],
    tags: ['Bhogi Pidakal', 'Sankranti', 'Festival'],
    isFeatured: false,
    isActive: true,
    rating: 5.0,
    reviewsCount: 30,
    createdAt: '2026-01-12T10:00:00Z',
    updatedAt: '2026-01-12T10:00:00Z',
  },

  // Category 3: Traditional & Eco Decor
  {
    id: 'prod-17',
    sku: 'GH-DECOR-001',
    slug: 'paddy-tassels',
    name_en: 'Handcrafted Paddy Tassels (Vari Kannulu)',
    name_te: 'వరి కన్నులు / వరి వెన్నులు',
    categoryId: 'cat-3',
    price: 299,
    mrp: 399,
    discount: 25,
    stock: 45,
    unit: 'Pair of 2 Tassels',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Traditional Godavari paddy grain tassels hand-woven by rural artisans to hang at home entrances, signifying prosperity and feeding birds.',
    description_te: 'గోదావరి జిల్లాల చేనేత కళాకారులతో అల్లబడిన శోభాయమానమైన వరి కన్నుల తోరణాలు. ఇంటి సింహద్వారానికి లక్ష్మీప్రదం మరియు పక్షులకు ఆహారం.',
    benefits_en: [
      'Symbol of wealth and Goddess Lakshmi blessings',
      'Eco-friendly bird feeder decor',
      '100% Natural golden Godavari paddy'
    ],
    benefits_te: [
      'లక్ష్మీదేవి కటాక్షానికి మరియు ఐశ్వర్యానికి సంకేతం',
      'పక్షులకు సహజ సిద్ధమైన మేత',
      '100% స్వచ్ఛమైన పసిడి వరి ధాన్యం'
    ],
    usage_en: ['Hang at main entrance doorway or puja room.'],
    usage_te: ['ఇంటి సింహద్వారానికి లేదా పూజ గదికి అలంకరించండి.'],
    specifications: [
      { key_en: 'Material', key_te: 'పదార్థం', value_en: 'Natural Paddy Crop', value_te: 'సహజ వరి పంట' },
      { key_en: 'Length', key_te: 'పొడవు', value_en: '1.5 Feet each', value_te: '1.5 అడుగులు' }
    ],
    faqs: [],
    variants: [
      { id: 'var-17-1', name_en: 'Pair (2 Pcs)', name_te: 'జత (2 తోరణాలు)', weightUnit: '2 Pcs', price: 299, mrp: 399, stock: 45, sku: 'GH-DECOR-001-2', isDefault: true }
    ],
    tags: ['Paddy Tassels', 'Vari Kannulu', 'Toran', 'Prosperity Decor'],
    isFeatured: true,
    isActive: true,
    rating: 5.0,
    reviewsCount: 42,
    createdAt: '2026-01-01T10:00:00Z',
    updatedAt: '2026-01-01T10:00:00Z',
  },
  {
    id: 'prod-18',
    sku: 'GH-DECOR-002',
    slug: 'paddy-tassel-door-toran',
    name_en: 'Paddy Tassel Main Door Toran',
    name_te: 'వరి వెన్ను గుమ్మం తోరణం',
    categoryId: 'cat-3',
    price: 499,
    mrp: 650,
    discount: 23,
    stock: 30,
    unit: '3.5 Feet Toran',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Full-length threshold paddy toran woven with golden paddy ears and auspicious marigold fabric accents.',
    description_te: 'సింహ ద్వారానికి సరిపోయే విధంగా పసిడి వరి వెన్నులతో అల్లిన మహోన్నత తోరణం.',
    benefits_en: ['Grand festive look for entrance', 'Traditional Andhra Pradesh heritage'],
    benefits_te: ['సింహద్వారానికి పండుగ శోభను తెస్తుంది', 'ఆంధ్ర ప్రదేశ్ సాంప్రదాయ సంస్కృతి'],
    usage_en: ['Tie on frame hooks.'],
    usage_te: ['గుమ్మం పైన అమర్చండి.'],
    specifications: [],
    faqs: [],
    variants: [
      { id: 'var-18-1', name_en: '3.5 Feet Door Toran', name_te: '3.5 అడుగుల గుమ్మం తోరణం', weightUnit: '1 Pc', price: 499, mrp: 650, stock: 30, sku: 'GH-DECOR-002-3.5', isDefault: true }
    ],
    tags: ['Door Toran', 'Paddy Toran'],
    isFeatured: true,
    isActive: true,
    rating: 4.9,
    reviewsCount: 19,
    createdAt: '2026-01-02T10:00:00Z',
    updatedAt: '2026-01-02T10:00:00Z',
  },
  {
    id: 'prod-19',
    sku: 'GH-DECOR-003',
    slug: 'bird-nests',
    name_en: 'Eco-Friendly Handwoven Bird Nests',
    name_te: 'పర్యావరణ పక్షుల గూళ్ళు',
    categoryId: 'cat-3',
    price: 199,
    mrp: 260,
    discount: 23,
    stock: 35,
    unit: 'Single Nest',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Woven coconut coir & paddy straw bird nest to encourage sparrows and garden birds to nest in your balcony or garden.',
    description_te: 'కొబ్బరి పీచు మరియు వరి గడ్డితో తయారు చేసిన పక్షుల గూడు. బాల్కనీలలో పిచ్చుకలను ఆకర్షిస్తుంది.',
    benefits_en: ['Safe haven for small birds', 'Weather-resistant natural fiber'],
    benefits_te: ['చిన్న పక్షులకు సురక్షితమైన ఆవాసం', 'సహజ వాతావరణ నిరోధకత'],
    usage_en: ['Hang in a shaded quiet garden or balcony corner.'],
    usage_te: ['బాల్కనీ లేదా తోట మూలలో వేలాడదీయండి.'],
    specifications: [],
    faqs: [],
    variants: [
      { id: 'var-19-1', name_en: '1 Nest', name_te: '1 గూడు', weightUnit: '1 Pc', price: 199, mrp: 260, stock: 35, sku: 'GH-DECOR-003-1', isDefault: true }
    ],
    tags: ['Bird Nest', 'Eco Friendly'],
    isFeatured: false,
    isActive: true,
    rating: 4.8,
    reviewsCount: 15,
    createdAt: '2026-01-05T10:00:00Z',
    updatedAt: '2026-01-05T10:00:00Z',
  },
  {
    id: 'prod-20',
    sku: 'GH-DECOR-004',
    slug: 'divine-frame',
    name_en: 'Divine Gomaya Frame Decor',
    name_te: 'దైవిక గోమయ ఫ్రేమ్',
    categoryId: 'cat-3',
    price: 599,
    mrp: 799,
    discount: 25,
    stock: 20,
    unit: 'Wooden Frame 8x10',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Handcrafted wooden wall art featuring holy Kamadhenu motifs embossed on natural Gomaya plaque.',
    description_te: 'సహజ గోమయ ఫలకంపై కామధేను శోభతో చెక్కబడిన శ్రేష్ఠమైన గోమయ వాల్ ఫ్రేమ్.',
    benefits_en: ['Auspicious entrance decor', 'Handmade by Andhra artisans'],
    benefits_te: ['మంగళకరమైన శోభనిచ్చే వాల్ ఆర్ట్', 'చేతితో చెక్కబడిన శిల్పం'],
    usage_en: ['Mount on living room or puja hall wall.'],
    usage_te: ['పూజ గదిలో లేదా హాలులో అమర్చండి.'],
    specifications: [],
    faqs: [],
    variants: [
      { id: 'var-20-1', name_en: '8x10 Inch Frame', name_te: '8x10 అంగుళాల ఫ్రేమ్', weightUnit: '1 Pc', price: 599, mrp: 799, stock: 20, sku: 'GH-DECOR-004-810', isDefault: true }
    ],
    tags: ['Divine Frame', 'Wall Decor'],
    isFeatured: false,
    isActive: true,
    rating: 4.9,
    reviewsCount: 11,
    createdAt: '2026-01-06T10:00:00Z',
    updatedAt: '2026-01-06T10:00:00Z',
  },
  {
    id: 'prod-21',
    sku: 'GH-DECOR-005',
    slug: 'coconut-broomsticks',
    name_en: 'Heavy Duty Coconut Eene Broomstick',
    name_te: 'కొబ్బరి ఈనె చీపురు',
    categoryId: 'cat-3',
    price: 120,
    mrp: 150,
    discount: 20,
    stock: 80,
    unit: 'Pack of 1 Broom',
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: '100% Sturdy coconut leaf midribs bound tightly with durable rope for outdoor garden and courtyard cleaning.',
    description_te: 'ఇంటి ప్రాంగణం మరియు తోటను ఊడ్చేందుకు గట్టిగా కట్టిన పటిష్టమైన కొబ్బరి ఈనె చీపురు.',
    benefits_en: ['Long lasting strong sticks', 'Zero plastic waste'],
    benefits_te: ['ఎక్కువ కాలం మన్నే గట్టి ఈనెలు', 'ప్లాస్టిక్ లేని ప్రకృతి చీపురు'],
    usage_en: ['Use for yard cleaning.'],
    usage_te: ['ఇంటి ప్రాంగణాన్ని ఊడ్చేందుకు ఉపయోగించండి.'],
    specifications: [],
    faqs: [],
    variants: [
      { id: 'var-21-1', name_en: 'Standard Broom', name_te: 'చీపురు 1 ప్యాక్', weightUnit: '1 Pc', price: 120, mrp: 150, stock: 80, sku: 'GH-DECOR-005-1', isDefault: true }
    ],
    tags: ['Coconut Broom', 'Eene Cheepuru'],
    isFeatured: false,
    isActive: true,
    rating: 4.7,
    reviewsCount: 24,
    createdAt: '2026-01-06T10:00:00Z',
    updatedAt: '2026-01-06T10:00:00Z',
  },

  // Category 4: Hygiene & Household
  {
    id: 'prod-22',
    sku: 'GH-HYG-001',
    slug: 'gomaya-phenyl',
    name_en: 'Natural Herbal Gomaya Phenyl',
    name_te: 'గోమయ ఫినైల్ (సహజ మూలికా ఫ్లోర్ క్లీనర్)',
    categoryId: 'cat-4',
    price: 160,
    mrp: 200,
    discount: 20,
    stock: 65,
    unit: '1 Litre Bottle',
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Disinfectant floor cleaner synthesized from Distilled Cow Urine, Pine oil, Neem oil, and Citronella. Keeps flies and ants away naturally without synthetic toxins.',
    description_te: 'శుద్ధి చేసిన గోమూత్రం, ఫైన్ ఆయిల్, వేప నూనె మరియు నిమ్మగడ్డి నూనెల కలయికతో తయారు చేసిన సహజ ఫ్లోర్ క్లీనర్. ఈగలు, చీమలు రాకుండా చూస్తుంది.',
    benefits_en: [
      '99.9% Natural anti-bacterial protection',
      'Safe for pets and crawling infants',
      'Refreshing herbal fragrance'
    ],
    benefits_te: [
      '99.9% సహజ బ్యాక్టీరియా నిరోధకం',
      'చిన్న పిల్లలు, పెంపుడు జంతువులకు సురక్షితం',
      'ఉత్తేజకరమైన సహజ మూలికా సువాసన'
    ],
    usage_en: ['Add 15ml to half bucket of mop water.'],
    usage_te: ['అర బకెట్ నీటిలో 15ml కలిపి తుడువండి.'],
    specifications: [
      { key_en: 'Active Ingredients', key_te: 'పదార్థాలు', value_en: 'Distilled Go-Mutra & Pine Oil', value_te: 'గోమూత్రం & ఫైన్ ఆయిల్' }
    ],
    faqs: [],
    variants: [
      { id: 'var-22-1', name_en: '1 Litre Bottle', name_te: '1 లీటరు బాటిల్', weightUnit: '1 Ltr', price: 160, mrp: 200, stock: 65, sku: 'GH-HYG-001-1L', isDefault: true },
      { id: 'var-22-2', name_en: '5 Litres Can', name_te: '5 లీటర్ల క్యాన్', weightUnit: '5 Ltr', price: 699, mrp: 900, stock: 20, sku: 'GH-HYG-001-5L' }
    ],
    tags: ['Gomaya Phenyl', 'Natural Cleaner', 'Disinfectant'],
    isFeatured: true,
    isActive: true,
    rating: 4.9,
    reviewsCount: 41,
    createdAt: '2026-01-03T10:00:00Z',
    updatedAt: '2026-01-03T10:00:00Z',
  },

  // Category 5: Natural Food & Wellness
  {
    id: 'prod-23',
    sku: 'GH-FOOD-001',
    slug: 'desi-cow-ghee',
    name_en: 'Traditional A2 Desi Cow Ghee (Bilona Method)',
    name_te: 'స్వచ్ఛమైన దేశీ ఆవు నెయ్యి (బిలోనా పద్ధతి)',
    categoryId: 'cat-5',
    price: 899,
    mrp: 1100,
    discount: 18,
    stock: 40,
    unit: '500 ml Glass Jar',
    images: [
      'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Golden aromatic A2 Desi Cow Ghee made via traditional wooden Bilona churning of curd. Rich in Vitamin A, D, E, K and healthy butyric acid.',
    description_te: 'సాంప్రదాయ కట్టె కవ్వంతో పెరుగును చిలికి చేసిన స్వచ్ఛమైన A2 దేశీ ఆవు నెయ్యి. సువాసనతో కూడిన బంగారు వర్ణం.',
    benefits_en: [
      'Handcrafted using authentic Bilona curd churning',
      'Boosts digestion & immunity',
      'Aroma & taste of pure traditional Andhra ghee'
    ],
    benefits_te: [
      'పురాతన బిలోనా పద్ధతిలో తయారీ',
      'జీర్ణక్రియ మరియు రోగనిరోధక శక్తిని పెంచుతుంది',
      'అతి శ్రేష్టమైన సాంప్రదాయ కమ్మని రుచి'
    ],
    usage_en: ['Add 1 spoon to hot rice or rotis daily.'],
    usage_te: ['రోజూ వేడి అన్నంలో లేదా రొట్టెలపై 1 చెంచా వేసుకోండి.'],
    specifications: [
      { key_en: 'Method', key_te: 'విధానం', value_en: 'Traditional Bilona Churned', value_te: 'కట్టె కవ్వం బిలోనా పద్ధతి' },
      { key_en: 'Milk Source', key_te: 'పాలు', value_en: 'Desi Cow Breeds', value_te: 'దేశీ ఆవులు' }
    ],
    faqs: [
      {
        question_en: 'Is this made from direct cream or curd?',
        question_te: 'ఇది మీగడ నుండి చేశారా లేదా పెరుగు నుండి చేశారా?',
        answer_en: 'Our ghee is 100% made from curd bilona churning as per Ayurveda.',
        answer_te: 'మా నెయ్యి 100% ఆయుర్వేద పద్ధతిలో తోడుపెట్టిన పెరుగును చిలికి తయారు చేయబడింది.'
      }
    ],
    variants: [
      { id: 'var-23-1', name_en: '500 ml Glass Jar', name_te: '500 ml సీసా', weightUnit: '500 ml', price: 899, mrp: 1100, stock: 25, sku: 'GH-FOOD-001-500', isDefault: true },
      { id: 'var-23-2', name_en: '1 Litre Glass Jar', name_te: '1 లీటరు సీసా', weightUnit: '1 Ltr', price: 1699, mrp: 2100, stock: 15, sku: 'GH-FOOD-001-1L' }
    ],
    tags: ['A2 Ghee', 'Desi Cow Ghee', 'Bilona Ghee', 'Pure Ghee'],
    isFeatured: true,
    isActive: true,
    rating: 5.0,
    reviewsCount: 88,
    createdAt: '2026-01-01T10:00:00Z',
    updatedAt: '2026-01-01T10:00:00Z',
  },
  {
    id: 'prod-24',
    sku: 'GH-FOOD-002',
    slug: 'pure-honey',
    name_en: 'Raw Wildflower Honey',
    name_te: 'స్వచ్ఛమైన ప్రకృతి తేనె',
    categoryId: 'cat-5',
    price: 349,
    mrp: 420,
    discount: 17,
    stock: 50,
    unit: '500g Glass Jar',
    images: [
      'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Unheated, raw honey harvested from natural forest flora, preserved with natural enzymes.',
    description_te: 'అడవులలోని పూల మకరందం నుండి సేకరించిన వేడి చేయని 100% పచ్చి తేనె.',
    benefits_en: ['Zero added sugar or syrup', 'Rich antioxidants'],
    benefits_te: ['ఎటువంటి చక్కెర మిశ్రమాలు లేవు', 'యాంటిఆక్సిడెంట్లు సమృద్ధి'],
    usage_en: ['Take 1 spoon with warm water every morning.'],
    usage_te: ['రోజూ ఉదయం గోరువెచ్చని నీటిలో 1 చెంచా తీసుకోండి.'],
    specifications: [],
    faqs: [],
    variants: [
      { id: 'var-24-1', name_en: '500g Jar', name_te: '500 గ్రాముల సీసా', weightUnit: '500g', price: 349, mrp: 420, stock: 35, sku: 'GH-FOOD-002-500', isDefault: true },
      { id: 'var-24-2', name_en: '1 kg Jar', name_te: '1 కేజీ సీసా', weightUnit: '1 kg', price: 650, mrp: 800, stock: 15, sku: 'GH-FOOD-002-1K' }
    ],
    tags: ['Pure Honey', 'Raw Honey'],
    isFeatured: true,
    isActive: true,
    rating: 4.9,
    reviewsCount: 36,
    createdAt: '2026-01-04T10:00:00Z',
    updatedAt: '2026-01-04T10:00:00Z',
  },
  {
    id: 'prod-25',
    sku: 'GH-FOOD-003',
    slug: 'natural-bath-powder-sunnipindi',
    name_en: 'Natural Herbal Bath Powder (Sunnipindi)',
    name_te: 'నలుగు పిండి / సున్నిపిండి',
    categoryId: 'cat-5',
    price: 180,
    mrp: 220,
    discount: 18,
    stock: 70,
    unit: '250g Pack',
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Authentic 18-herbal traditional body wash powder made with green gram, rose petals, wild turmeric, bavanchalu, and vetiver.',
    description_te: 'పెసలు, గులాబీ రేకులు, కస్తూరి పసుపు, బావంచాలు మరియు వట్టివేళ్లతో చేసిన 18 మూలికల సాంప్రదాయ నలుగు సున్నిపిండి.',
    benefits_en: [
      'Exfoliates dead skin cells gently',
      'Provides natural glow without chemical soaps'
    ],
    benefits_te: [
      'చర్మాన్ని కాంతివంతంగా మరియు మృదువుగా చేస్తుంది',
      'రసాయన సబ్బులకు ఆరోగ్యకర ప్రత్యామ్నాయం'
    ],
    usage_en: ['Mix powder with water or milk to form a paste and scrub gently.'],
    usage_te: ['నీరు లేదా పాలతో పేస్టులా చేసి చర్మానికి పట్టించి స్నానం చేయండి.'],
    specifications: [],
    faqs: [],
    variants: [
      { id: 'var-25-1', name_en: '250g Pack', name_te: '250g ప్యాక్', weightUnit: '250g', price: 180, mrp: 220, stock: 45, sku: 'GH-FOOD-003-250', isDefault: true },
      { id: 'var-25-2', name_en: '500g Pack', name_te: '500g ప్యాక్', weightUnit: '500g', price: 320, mrp: 400, stock: 25, sku: 'GH-FOOD-003-500' }
    ],
    tags: ['Sunnipindi', 'Bath Powder', 'Herbal Skincare'],
    isFeatured: true,
    isActive: true,
    rating: 4.9,
    reviewsCount: 54,
    createdAt: '2026-01-05T10:00:00Z',
    updatedAt: '2026-01-05T10:00:00Z',
  },
  {
    id: 'prod-26',
    sku: 'GH-FOOD-004',
    slug: 'pure-coconut-oil',
    name_en: 'Cold-Pressed Virgin Coconut Oil',
    name_te: 'గానుగ స్వచ్ఛమైన కొబ్బరి నూనె',
    categoryId: 'cat-5',
    price: 260,
    mrp: 310,
    discount: 16,
    stock: 55,
    unit: '500 ml Bottle',
    images: [
      'https://images.unsplash.com/photo-1590005354167-6da97870c757?auto=format&fit=crop&w=800&q=80'
    ],
    description_en: 'Pure unrefined cold-pressed coconut oil extracted from fresh sun-dried Godavari copra.',
    description_te: 'గోదావరి పండు కొబ్బరి కుడకల నుండి సాంప్రదాయ గానుగ ద్వారా తీసిన స్వచ్ఛమైన కొబ్బరి నూనె.',
    benefits_en: ['Pure unbleached aroma', 'Ideal for hair nourish & cooking'],
    benefits_te: ['కల్తీ లేని స్వచ్ఛమైన సువాసన', 'కుదుళ్ళ బలానికి మరియు వంటలకు శ్రేష్ఠం'],
    usage_en: ['Apply on hair or use for cooking.'],
    usage_te: ['తలనూనెగా లేదా వంటకాల్లో వాడండి.'],
    specifications: [],
    faqs: [],
    variants: [
      { id: 'var-26-1', name_en: '500 ml Bottle', name_te: '500 ml బాటిల్', weightUnit: '500 ml', price: 260, mrp: 310, stock: 35, sku: 'GH-FOOD-004-500', isDefault: true },
      { id: 'var-26-2', name_en: '1 Litre Bottle', name_te: '1 లీటరు బాటిల్', weightUnit: '1 Ltr', price: 490, mrp: 600, stock: 20, sku: 'GH-FOOD-004-1L' }
    ],
    tags: ['Coconut Oil', 'Cold Pressed'],
    isFeatured: false,
    isActive: true,
    rating: 4.8,
    reviewsCount: 29,
    createdAt: '2026-01-06T10:00:00Z',
    updatedAt: '2026-01-06T10:00:00Z',
  }
];

export const initialCoupons: Coupon[] = [
  {
    id: 'coup-1',
    code: 'GHOVEDIKA10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 499,
    maxDiscount: 200,
    expiryDate: '2026-12-31',
    usageLimit: 500,
    timesUsed: 42,
    isActive: true,
  },
  {
    id: 'coup-2',
    code: 'DESICOW100',
    discountType: 'flat',
    discountValue: 100,
    minOrderValue: 999,
    expiryDate: '2026-12-31',
    usageLimit: 300,
    timesUsed: 19,
    isActive: true,
  }
];

export const initialBanners: Banner[] = [
  {
    id: 'ban-hero-ghovedika',
    title_en: 'Ghovedika Natural Cow Products & Bio-Fertilizers',
    title_te: 'గోవేదిక - ప్రకృతి సిద్ధమైన గో ఉత్పత్తులు & జీవ ఎరువులు',
    subtitle_en: '100% Pure Desi Cow Ghee, Bio-Fertilizers, Gomaya Dhoop & Traditional Decor direct from Godavari',
    subtitle_te: 'గోదావరి లోగిళ్ళ నుండి స్వచ్ఛమైన దేశీ గో ఉత్పత్తులు, జీవ ఎరువులు మరియు తోరణాలు',
    imageUrl: '/banners/banner_ghovedika_hero_raw.jpg',
    linkUrl: '/shop',
    buttonText_en: 'Explore All Products',
    buttonText_te: 'ఉత్పత్తులను చూడండి',
    position: 'hero',
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'ban-products-collage',
    title_en: 'Godavari Organic Village Products Showcase',
    title_te: 'గోదావరి గ్రామ గ్రామీణ ఉత్పత్తుల శోభ',
    subtitle_en: 'Authentic Jeevamrutham, Gomaya Pidakal, Paddy Tassels & Natural Bio-Fertilizers',
    subtitle_te: 'పవిత్ర జీవామృతం, గోమయ పిడకలు, వరి వెన్నుల తోరణాలు మరియు సహజ ఎరువులు',
    imageUrl: '/banners/banner_products_collage_raw.jpg',
    linkUrl: '/shop',
    buttonText_en: 'Shop Traditional Range',
    buttonText_te: 'సాంప్రదాయ రేంజ్ కొనండి',
    position: 'hero',
    isActive: true,
    sortOrder: 2,
  },
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
    sortOrder: 3,
  }
];

export const initialPages: CMSPage[] = [
  {
    id: 'page-about',
    slug: 'about-us',
    title_en: 'About Ghovedika (గోవేదిక)',
    title_te: 'గోవేదిక గురించి',
    content_en: `Ghovedika (గోవేదిక) is dedicated to reviving ancient Indian cow-based agriculture, spiritual traditions, and sustainable natural living. Located in the fertile Godavari region at Vedangi–Vedangipalem, Poduru Mandal and Palakollu, West Godavari, Andhra Pradesh, we manufacture and distribute authentic organic products derived from indigenous Desi Cows.

Our Goshala and processing units prepare high-potency Bio-Fertilizers (Ghana Jeevamrutham, Drava Jeevamrutham, Agni Astram), divine Gomaya Pooja Essentials (Dhoop Sticks, Pidakal, Vibhuti), Traditional Deco items (Vari Kannulu / Paddy Tassels), and A2 Bilona Desi Cow Ghee.`,
    content_te: `గోవేదిక (Ghovedika) ప్రాచీన భారతీయ గో సంస్కృతి, సేంద్రీయ వ్యవసాయం మరియు ప్రకృతి జీవన విధానాన్ని విస్తరించడానికి కట్టుబడి ఉంది. పశ్చిమ గోదావరి జిల్లా పోడూరు మండలం వేదంగి-వేదంగిపాలెం మరియు పాలకొల్లు వద్ద మా ప్రాంగణం మరియు స్టోర్ విస్తరించి ఉన్నాయి.

మా గోశాలలో దేశీ గోవుల గోమయం మరియు గోమూత్రంతో అత్యంత పవిత్రమైన మరియు గుణాత్మకమైన జీవ ఎరువులు (ఘన జీవామృతం, ద్రవ జీవామృతం, అగ్ని అస్త్రం), గోమయ ధూప్ స్టిక్స్, పిడకలు, పవిత్ర విభూతి, వరి కన్నుల తోరణాలు మరియు కట్టె కవ్వం బిలోనా నెయ్యిని తయారు చేస్తున్నాము.`,
    updatedAt: '2026-01-01T10:00:00Z',
  },
  {
    id: 'page-contact',
    slug: 'contact-us',
    title_en: 'Contact Us',
    title_te: 'మమ్మల్ని సంప్రదించండి',
    content_en: 'Reach us via email at ghovedika@gmail.com or call 8008588599 / 9393935343.',
    content_te: 'మాకు ఇమెయిల్ ద్వారా ghovedika@gmail.com లో లేదా 8008588599 / 9393935343 లలో ఫోన్ ద్వారా సంప్రదించవచ్చు.',
    updatedAt: '2026-01-01T10:00:00Z',
  },
  {
    id: 'page-privacy',
    slug: 'privacy-policy',
    title_en: 'Privacy Policy',
    title_te: 'గోప్యతా విధానం',
    content_en: 'Ghovedika values user privacy. We do not sell your personal information. Order and contact details are used strictly for fulfillment and customer support.',
    content_te: 'గోవేదిక వినియోగదారుల గోప్యతకు అత్యంత ప్రాధాన్యత ఇస్తుంది. మీ వ్యక్తిగత వివరాలను విక్రయించడం జరగదు. ఆర్డర్ డెలివరీ మరియు కస్టమర్ మద్దతు కోసం మాత్రమే సమాచారం ఉపయోగించబడుతుంది.',
    updatedAt: '2026-01-01T10:00:00Z',
  },
  {
    id: 'page-terms',
    slug: 'terms-and-conditions',
    title_en: 'Terms & Conditions',
    title_te: 'నిబంధనలు & షరతులు',
    content_en: 'All orders placed on www.ghovedika.store are subject to product stock availability and address verification.',
    content_te: 'www.ghovedika.store లో చేయబడిన అన్ని ఆర్డర్‌లు సరుకు లభ్యత మరియు చిరునామా ధృవీకరణకు లోబడి ఉంటాయి.',
    updatedAt: '2026-01-01T10:00:00Z',
  },
  {
    id: 'page-shipping',
    slug: 'shipping-policy',
    title_en: 'Shipping Policy',
    title_te: 'రవాణా విధానం',
    content_en: 'We ship orders across India within 24-48 business hours. Orders above ₹999 qualify for Free Shipping.',
    content_te: 'మేము 24-48 గంటలలోపు భారతదేశమంతటా ఆర్డర్‌లను డిస్పాచ్ చేస్తాము. ₹999 కంటే ఎక్కువ ఆర్డర్‌లపై ఉచిత డెలివరీ వర్తిస్తుంది.',
    updatedAt: '2026-01-01T10:00:00Z',
  },
  {
    id: 'page-returns',
    slug: 'cancellation-returns',
    title_en: 'Cancellation & Returns',
    title_te: 'రద్దు మరియు రిటర్న్‌లు',
    content_en: 'If you receive damaged or defective products, notify us within 48 hours for an instant replacement or refund.',
    content_te: 'మీకు ఏదైనా డ్యామేజ్ లేదా లోపభూయిష్టమైన ఉత్పత్తి అందగా 48 గంటలలోపు మాకు తెలియజేస్తే వెంటనే మార్పిడి లేదా రీఫండ్ అందించబడుతుంది.',
    updatedAt: '2026-01-01T10:00:00Z',
  }
];

export const initialFAQs: GeneralFAQ[] = [
  {
    id: 'faq-1',
    category: 'products',
    question_en: 'Are Ghovedika products 100% natural and cow-based?',
    question_te: 'గోవేదిక ఉత్పత్తులు 100% సహజమైనవి మరియు గోమయ ఆధారితమైనవా?',
    answer_en: 'Yes, all our bio-fertilizers, dhoop products, and ghee are made from indigenous Desi Cow dung, urine, and milk without synthetic chemicals.',
    answer_te: 'అవును, మా ఎరువులు, ధూప్ స్టిక్స్ మరియు నెయ్యి 100% స్వచ్ఛమైన దేశీ ఆవు గోమయం, గోమూత్రం మరియు పాలతో తయారు చేయబడినవి.',
    sortOrder: 1,
  },
  {
    id: 'faq-2',
    category: 'shipping',
    question_en: 'What are the delivery charges?',
    question_te: 'డెలివరీ ఛార్జీలు ఎంత?',
    answer_en: 'Standard delivery charge is ₹60. Orders above ₹999 are delivered completely FREE.',
    answer_te: 'సాధారణ రవాణా ఛార్జీ ₹60. రూ. 999 దాటిన ఆర్డర్‌లపై డెలివరీ సంపూర్ణంగా ఉచితం.',
    sortOrder: 2,
  },
  {
    id: 'faq-3',
    category: 'payment',
    question_en: 'Do you offer Cash on Delivery (COD)?',
    question_te: 'క్యాష్ ఆన్ డెలివరీ (COD) అందుబాటులో ఉందా?',
    answer_en: 'Yes, Cash on Delivery (COD) as well as online UPI / Credit Card / Debit Card payments via Razorpay are supported.',
    answer_te: 'అవును, క్యాష్ ఆన్ డెలివరీ (COD) మరియు ఆన్‌లైన్ UPI / కార్డు చెల్లింపులు రెండూ అందుబాటులో ఉన్నాయి.',
    sortOrder: 3,
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Srinivas Rao K.',
    location: 'Palakollu, West Godavari',
    rating: 5,
    comment_en: 'Ghovedika Ghana Jeevamrutham completely transformed my paddy crop soil. Yield increased naturally without urea!',
    comment_te: 'గోవేదిక ఘన జీవామృతం మా వరి పొలం నేల సత్తువను ఎంతగానో పెంచింది. యూరియా లేకుండా దిగుబడి అద్భుతంగా వచ్చింది!',
    isApproved: true
  },
  {
    id: 'test-2',
    name: 'Lakshmi Prasanna',
    location: 'Vijayawada',
    rating: 5,
    comment_en: 'The Paddy Tassels (Vari Kannulu) for main door and Gomaya Dhoop are extremely peaceful and divine. Best quality!',
    comment_te: 'సింహద్వారానికి వరి కన్నుల తోరణం మరియు గోమయ ధూప్ అత్యంత పవిత్రమైన సువాసన ఇస్తున్నాయి. చాలా బాగున్నాయి!',
    isApproved: true
  },
  {
    id: 'test-3',
    name: 'Ramesh Verma',
    location: 'Hyderabad',
    rating: 5,
    comment_en: 'A2 Bilona Desi Cow Ghee smells exactly like traditional homemade ghee from our village. Unmatched aroma.',
    comment_te: 'A2 కట్టె కవ్వం నెయ్యి అసలైన పల్లెటూరి ఇంట్లోనే చేసిన కమ్మని సువాసనతో ఉంది. అద్భుతమైన రుచి.',
    isApproved: true
  }
];

export const initialDataProcessors = [
  {
    id: 'proc-1',
    providerName: 'Firebase (Google Cloud Platform)',
    purpose: 'User Authentication, Secure Cloud Firestore Database & Image Storage',
    dataCategories: ['Account Information', 'Order History', 'Saved Addresses', 'Security Logs'],
    serviceUrl: 'https://firebase.google.com/',
    privacyPolicyUrl: 'https://policies.google.com/privacy',
    isActive: true,
  },
  {
    id: 'proc-2',
    providerName: 'Razorpay Software Private Limited',
    purpose: 'Secure Payment Gateway Processing & Payment Status Verification',
    dataCategories: ['Transaction Reference ID', 'Order Amount', 'Payment Method Type'],
    serviceUrl: 'https://razorpay.com/',
    privacyPolicyUrl: 'https://razorpay.com/privacy/',
    isActive: true,
  },
  {
    id: 'proc-3',
    providerName: 'Indian Postal / Local Logistics Partners',
    purpose: 'Physical Product Order Delivery & Parcel Tracking',
    dataCategories: ['Customer Full Name', 'Delivery Address', 'PIN Code', 'Contact Mobile Number'],
    serviceUrl: 'https://www.indiapost.gov.in/',
    privacyPolicyUrl: 'https://www.indiapost.gov.in/VAS/Pages/PrivacyPolicy.aspx',
    isActive: true,
  }
];

export const initialPrivacyVersions = [
  {
    id: 'ver-1',
    versionNumber: 'v1.0-2025',
    effectiveDate: '2025-11-13',
    title_en: 'Ghovedika Data Privacy & Personal Protection Policy',
    title_te: 'గోవేదిక వ్యక్తిగత డేటా గోప్యత మరియు రక్షణ విధానం',
    content_en: `This Privacy Policy outlines how Ghovedika collects, uses, retains, and protects your personal data in alignment with the Digital Personal Data Protection Act, 2023 (DPDP Act) and the DPDP Rules 2025.`,
    content_te: `డిజిటల్ పర్సనల్ డేటా ప్రొటెక్షన్ యాక్ట్, 2023 (DPDP Act) మరియు DPDP నిబంధనలు 2025 సూత్రాలకు కట్టుబడి గోవేదిక మీ వ్యక్తిగత సమాచారాన్ని ఎలా సేకరిస్తుంది, ఉపయోగిస్తుంది మరియు రక్షిస్తుందో ఈ గోప్యతా విధానం వివరిస్తుంది.`,
    isPublished: true,
    createdByName: 'Ghovedika Data Fiduciary Team',
    createdAt: '2025-11-13T10:00:00Z',
  }
];

export const initialPrivacyRequests = [
  {
    id: 'req-1',
    requestNumber: 'DPDP-2026-001',
    requestType: 'access' as const,
    customerName: 'Srinivas Rao K.',
    customerPhone: '8008588599',
    customerEmail: 'srinivas@example.com',
    description: 'Requesting summary of all personal data held by Ghovedika regarding previous bio-fertilizer orders.',
    preferredContact: 'phone' as const,
    status: 'resolved' as const,
    verificationStatus: 'verified' as const,
    internalNotes: 'Data summary generated and provided via SMS/Phone.',
    createdAt: '2026-01-15T11:00:00Z',
    updatedAt: '2026-01-16T14:30:00Z',
  }
];

export const initialConsentRecords = [
  {
    id: 'con-1',
    phoneOrEmail: '8008588599',
    purpose: 'essential_order_fulfillment' as const,
    isConsented: true,
    timestamp: '2026-01-10T10:00:00Z',
    policyVersion: 'v1.0-2025',
    sourcePage: '/checkout',
    language: 'te' as const,
  }
];

