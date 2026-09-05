import React, { useState, useEffect } from 'react';
import { 
  Product, Category, Order, Coupon, Banner, CMSPage, GeneralFAQ, 
  SiteSettings, InventoryLog, Customer, Testimonial, ConsentRecord,
  PrivacyRequest, DataProcessor, SecurityIncident, PrivacyPolicyVersion, Language
} from '../types';
import { 
  initialProducts, initialCategories, initialCoupons, 
  initialBanners, initialPages, initialFAQs, initialSiteSettings, initialTestimonials,
  initialDataProcessors, initialPrivacyVersions, initialPrivacyRequests, initialConsentRecords
} from '../data/initialData';
import { doc, setDoc, deleteDoc, collection, onSnapshot, getDocs } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { seedFirestoreDatabase } from './firebaseDb';

const DB_UPDATE_EVENT = 'ghovedika_cloud_db_updated';

export const notifyDatabaseUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(DB_UPDATE_EVENT));
  }
};

export const subscribeToDbUpdates = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(DB_UPDATE_EVENT, callback);
  return () => window.removeEventListener(DB_UPDATE_EVENT, callback);
};

export const useLiveDatabase = () => {
  const [version, setVersion] = useState(0);
  useEffect(() => {
    return subscribeToDbUpdates(() => setVersion(v => v + 1));
  }, []);
  return version;
};

// Pure Cloud-First In-Memory Data Store (NO browser localStorage used for backend data)
const cloudStore = {
  products: initialProducts as Product[],
  categories: initialCategories as Category[],
  banners: initialBanners as Banner[],
  coupons: initialCoupons as Coupon[],
  pages: initialPages as CMSPage[],
  faqs: initialFAQs as GeneralFAQ[],
  settings: initialSiteSettings as SiteSettings,
  testimonials: initialTestimonials as Testimonial[],
  orders: [] as Order[],
  customers: [] as Customer[],
  inventoryLogs: [] as InventoryLog[],
  processors: initialDataProcessors as DataProcessor[],
  privacyVersions: initialPrivacyVersions as PrivacyPolicyVersion[],
  privacyRequests: [] as PrivacyRequest[],
  consentRecords: [] as ConsentRecord[],
  securityIncidents: [] as SecurityIncident[],
};

// Helper: Clean out undefined values to prevent Firestore setDoc invalid data errors
const sanitizeForFirestore = (obj: any): any => {
  if (obj === null || obj === undefined) return null;
  if (typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(sanitizeForFirestore);
  
  const cleaned: any = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (val !== undefined) {
      cleaned[key] = sanitizeForFirestore(val);
    }
  }
  return cleaned;
};

// Helper: Push write directly to Firebase Cloud Firestore backend
const writeToCloudBackend = (collectionName: string, id: string, data: any) => {
  notifyDatabaseUpdate();
  if (isFirebaseConfigured() && db) {
    const cleanData = sanitizeForFirestore(data);
    setDoc(doc(db, collectionName, id), cleanData, { merge: true }).catch(err => {
      console.error(`Cloud Firestore backend write warning (${collectionName}/${id}):`, err);
    });
  }
};

const deleteFromCloudBackend = (collectionName: string, id: string) => {
  notifyDatabaseUpdate();
  if (isFirebaseConfigured() && db) {
    deleteDoc(doc(db, collectionName, id)).catch(err => {
      console.warn(`Cloud Firestore backend delete warning (${collectionName}/${id}):`, err);
    });
  }
};

// Initialize Real-Time Cloud Firestore Listeners
let isRealtimeSyncStarted = false;
let isAutoSeedingStarted = false;

export const initRealtimeDatabaseSync = () => {
  if (isRealtimeSyncStarted || !isFirebaseConfigured()) return;
  isRealtimeSyncStarted = true;

  try {
    // 1. Live Products from Firebase Cloud
    onSnapshot(collection(db, 'products'), (snapshot) => {
      if (!snapshot.empty) {
        const prods: Product[] = [];
        snapshot.forEach((docSnap) => prods.push(docSnap.data() as Product));
        cloudStore.products = prods;
        notifyDatabaseUpdate();
      } else if (!isAutoSeedingStarted) {
        isAutoSeedingStarted = true;
        seedFirestoreDatabase().catch(console.warn);
      }
    }, (err) => console.warn('Cloud Products listener notice:', err));

    // 2. Live Categories from Firebase Cloud
    onSnapshot(collection(db, 'categories'), (snapshot) => {
      if (!snapshot.empty) {
        const cats: Category[] = [];
        snapshot.forEach((docSnap) => cats.push(docSnap.data() as Category));
        cloudStore.categories = cats;
        notifyDatabaseUpdate();
      }
    }, (err) => console.warn('Cloud Categories listener notice:', err));

    // 3. Live Banners from Firebase Cloud
    onSnapshot(collection(db, 'banners'), (snapshot) => {
      if (!snapshot.empty) {
        const bans: Banner[] = [];
        snapshot.forEach((docSnap) => bans.push(docSnap.data() as Banner));
        cloudStore.banners = bans;
        notifyDatabaseUpdate();
      }
    }, (err) => console.warn('Cloud Banners listener notice:', err));

    // 4. Live Settings from Firebase Cloud
    onSnapshot(collection(db, 'settings'), (snapshot) => {
      if (!snapshot.empty) {
        snapshot.forEach((docSnap) => {
          if (docSnap.id === 'site_config') {
            cloudStore.settings = docSnap.data() as SiteSettings;
            notifyDatabaseUpdate();
          }
        });
      }
    }, (err) => console.warn('Cloud Settings listener notice:', err));

    // 5. Live Pages from Firebase Cloud
    onSnapshot(collection(db, 'pages'), (snapshot) => {
      if (!snapshot.empty) {
        const pgs: CMSPage[] = [];
        snapshot.forEach((docSnap) => pgs.push(docSnap.data() as CMSPage));
        cloudStore.pages = pgs;
        notifyDatabaseUpdate();
      }
    }, (err) => console.warn('Cloud Pages listener notice:', err));

    // 6. Live Coupons from Firebase Cloud
    onSnapshot(collection(db, 'coupons'), (snapshot) => {
      if (!snapshot.empty) {
        const cpns: Coupon[] = [];
        snapshot.forEach((docSnap) => cpns.push(docSnap.data() as Coupon));
        cloudStore.coupons = cpns;
        notifyDatabaseUpdate();
      }
    }, (err) => console.warn('Cloud Coupons listener notice:', err));

    // 7. Live FAQs from Firebase Cloud
    onSnapshot(collection(db, 'faqs'), (snapshot) => {
      if (!snapshot.empty) {
        const faqs: GeneralFAQ[] = [];
        snapshot.forEach((docSnap) => faqs.push(docSnap.data() as GeneralFAQ));
        cloudStore.faqs = faqs;
        notifyDatabaseUpdate();
      }
    }, (err) => console.warn('Cloud FAQs listener notice:', err));

    // 8. Live Orders from Firebase Cloud
    onSnapshot(collection(db, 'orders'), (snapshot) => {
      if (!snapshot.empty) {
        const ords: Order[] = [];
        snapshot.forEach((docSnap) => ords.push(docSnap.data() as Order));
        cloudStore.orders = ords;
        notifyDatabaseUpdate();
      }
    }, (err) => console.warn('Cloud Orders listener notice:', err));

  } catch (syncError) {
    console.warn('Realtime cloud database sync error:', syncError);
  }
};

// Clean browser localStorage of any legacy keys
export const initializeDatabase = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    // Clear legacy local storage mock items to ensure 100% Cloud Backend data flow
    const keysToRemove = [
      'ghovedika_products', 'ghovedika_categories', 'ghovedika_banners',
      'ghovedika_settings', 'ghovedika_pages', 'ghovedika_faqs', 'ghovedika_coupons'
    ];
    keysToRemove.forEach(k => localStorage.removeItem(k));
  }

  // Start Realtime Cloud Firestore Subscriptions
  initRealtimeDatabaseSync();
};

// Auto-run init
initializeDatabase();

// 100% Cloud-First Database Service (All reads & writes target Firebase Cloud Firestore Backend)
export const dbService = {
  // PRODUCTS
  getProducts: (): Product[] => cloudStore.products,
  getProductById: (id: string): Product | undefined => {
    return cloudStore.products.find(p => p.id === id);
  },
  getProductBySlug: (slug: string): Product | undefined => {
    return cloudStore.products.find(p => p.slug === slug);
  },
  saveProduct: (product: Product): Product => {
    const existingIdx = cloudStore.products.findIndex(p => p.id === product.id);
    let targetProd = product;

    if (existingIdx >= 0) {
      targetProd = { ...product, updatedAt: new Date().toISOString() };
      cloudStore.products[existingIdx] = targetProd;
    } else {
      targetProd = { ...product, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      cloudStore.products.unshift(targetProd);
    }

    writeToCloudBackend('products', targetProd.id, targetProd);
    return targetProd;
  },
  deleteProduct: (id: string): void => {
    cloudStore.products = cloudStore.products.filter(p => p.id !== id);
    deleteFromCloudBackend('products', id);
  },
  updateProductStock: (productId: string, variantId: string | undefined, delta: number, reason: string, staffNote?: string): void => {
    const product = cloudStore.products.find(p => p.id === productId);
    if (!product) return;

    let previousStock = product.stock;
    let newStock = Math.max(0, product.stock + delta);

    if (variantId && product.variants) {
      product.variants = product.variants.map(v => {
        if (v.id === variantId) {
          previousStock = v.stock;
          const updatedVStock = Math.max(0, v.stock + delta);
          newStock = updatedVStock;
          return { ...v, stock: updatedVStock };
        }
        return v;
      });
    } else {
      product.stock = newStock;
    }

    writeToCloudBackend('products', product.id, product);

    // Log transaction in cloud
    const newLog: InventoryLog = {
      id: `log-${Date.now()}`,
      productId,
      variantId,
      productName: product.name_en,
      changeType: delta < 0 ? 'reduction' : 'addition',
      quantity: Math.abs(delta),
      previousStock,
      newStock,
      reason,
      staffNote,
      createdAt: new Date().toISOString(),
    };
    cloudStore.inventoryLogs.unshift(newLog);
    writeToCloudBackend('inventory_logs', newLog.id, newLog);
  },

  // CATEGORIES
  getCategories: (): Category[] => cloudStore.categories,
  saveCategory: (category: Category): Category => {
    const idx = cloudStore.categories.findIndex(c => c.id === category.id);
    if (idx >= 0) {
      cloudStore.categories[idx] = category;
    } else {
      cloudStore.categories.push(category);
    }
    writeToCloudBackend('categories', category.id, category);
    return category;
  },
  deleteCategory: (id: string): void => {
    cloudStore.categories = cloudStore.categories.filter(c => c.id !== id);
    deleteFromCloudBackend('categories', id);
  },

  // ORDERS
  getOrders: (): Order[] => cloudStore.orders,
  getOrderById: (id: string): Order | undefined => {
    return cloudStore.orders.find(o => o.id === id || o.orderNumber === id);
  },
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'statusHistory'>): Order => {
    const timestamp = Date.now();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `GH-${timestamp.toString().slice(-4)}${randomDigits}`;
    
    const newOrder: Order = {
      ...orderData,
      id: `ord-${timestamp}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      statusHistory: [
        {
          status: 'placed',
          timestamp: new Date().toISOString(),
          note: 'Order successfully placed by customer.'
        }
      ]
    };

    cloudStore.orders.unshift(newOrder);
    writeToCloudBackend('orders', newOrder.id, newOrder);

    // Automatically update inventory for each ordered item
    newOrder.items.forEach(item => {
      dbService.updateProductStock(item.productId, item.variantId, -item.quantity, `Order #${newOrder.orderNumber}`);
    });

    // Update customer records
    dbService.recordCustomerOrder(newOrder);
    dbService.recordConsent(newOrder.customerPhone || newOrder.customerEmail, 'essential_order_fulfillment', true, '/checkout', 'te');

    // Trigger non-blocking transactional email receipt & admin notification
    import('./emailService').then(({ emailService }) => {
      emailService.sendCustomerOrderReceipt(newOrder).catch(console.warn);
      emailService.sendAdminOrderAlert(newOrder).catch(console.warn);
    }).catch(console.warn);

    return newOrder;
  },
  updateOrderStatus: (orderId: string, status: Order['orderStatus'], trackingNumber?: string, internalNotes?: string): Order | null => {
    const idx = cloudStore.orders.findIndex(o => o.id === orderId);
    if (idx === -1) return null;

    const currentOrder = cloudStore.orders[idx];
    const updatedHistory = [
      ...currentOrder.statusHistory,
      {
        status,
        timestamp: new Date().toISOString(),
        note: `Status updated to ${status}`
      }
    ];

    const updatedOrder: Order = {
      ...currentOrder,
      orderStatus: status,
      trackingNumber: trackingNumber || currentOrder.trackingNumber,
      internalNotes: internalNotes !== undefined ? internalNotes : currentOrder.internalNotes,
      statusHistory: updatedHistory,
      updatedAt: new Date().toISOString(),
    };

    cloudStore.orders[idx] = updatedOrder;
    writeToCloudBackend('orders', updatedOrder.id, updatedOrder);

    // If order was cancelled, restore inventory
    if (status === 'cancelled' && currentOrder.orderStatus !== 'cancelled') {
      currentOrder.items.forEach(item => {
        dbService.updateProductStock(item.productId, item.variantId, item.quantity, `Cancelled Order #${currentOrder.orderNumber}`);
      });
    }

    return updatedOrder;
  },
  updatePaymentStatus: (orderId: string, paymentStatus: Order['paymentStatus']): Order | null => {
    const idx = cloudStore.orders.findIndex(o => o.id === orderId);
    if (idx === -1) return null;

    cloudStore.orders[idx] = {
      ...cloudStore.orders[idx],
      paymentStatus,
      updatedAt: new Date().toISOString(),
    };
    writeToCloudBackend('orders', cloudStore.orders[idx].id, cloudStore.orders[idx]);
    return cloudStore.orders[idx];
  },

  // CUSTOMERS
  getCustomers: (): Customer[] => cloudStore.customers,
  recordCustomerOrder: (order: Order): void => {
    const existingIdx = cloudStore.customers.findIndex(c => c.phone === order.customerPhone || c.email === order.customerEmail);

    if (existingIdx >= 0) {
      const c = cloudStore.customers[existingIdx];
      const updatedCust: Customer = {
        ...c,
        totalOrders: c.totalOrders + 1,
        totalSpent: c.totalSpent + order.totalAmount,
        lastOrderAt: order.createdAt,
        addresses: [...c.addresses, order.shippingAddress]
      };
      cloudStore.customers[existingIdx] = updatedCust;
      writeToCloudBackend('customers', updatedCust.id, updatedCust);
    } else {
      const newCustomer: Customer = {
        id: `cust-${Date.now()}`,
        name: order.customerName,
        email: order.customerEmail,
        phone: order.customerPhone,
        addresses: [order.shippingAddress],
        totalOrders: 1,
        totalSpent: order.totalAmount,
        createdAt: new Date().toISOString(),
        lastOrderAt: order.createdAt,
      };
      cloudStore.customers.push(newCustomer);
      writeToCloudBackend('customers', newCustomer.id, newCustomer);
    }
  },

  // COUPONS
  getCoupons: (): Coupon[] => cloudStore.coupons,
  saveCoupon: (coupon: Coupon): Coupon => {
    const idx = cloudStore.coupons.findIndex(c => c.id === coupon.id);
    if (idx >= 0) {
      cloudStore.coupons[idx] = coupon;
    } else {
      cloudStore.coupons.push(coupon);
    }
    writeToCloudBackend('coupons', coupon.id, coupon);
    return coupon;
  },
  deleteCoupon: (id: string): void => {
    cloudStore.coupons = cloudStore.coupons.filter(c => c.id !== id);
    deleteFromCloudBackend('coupons', id);
  },
  validateCoupon: (code: string, subtotal: number): { valid: boolean; coupon?: Coupon; error?: string; discount: number } => {
    const coupon = cloudStore.coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);

    if (!coupon) {
      return { valid: false, error: 'Invalid or expired coupon code.', discount: 0 };
    }

    if (subtotal < coupon.minOrderValue) {
      return { valid: false, error: `Minimum order value for this coupon is ₹${coupon.minOrderValue}`, discount: 0 };
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = (subtotal * coupon.discountValue) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.discountValue;
    }

    return { valid: true, coupon, discount: Math.min(discount, subtotal) };
  },

  // BANNERS
  getBanners: (): Banner[] => cloudStore.banners,
  saveBanner: (banner: Banner): Banner => {
    const idx = cloudStore.banners.findIndex(b => b.id === banner.id);
    if (idx >= 0) {
      cloudStore.banners[idx] = banner;
    } else {
      cloudStore.banners.push(banner);
    }
    writeToCloudBackend('banners', banner.id, banner);
    return banner;
  },
  deleteBanner: (id: string): void => {
    cloudStore.banners = cloudStore.banners.filter(b => b.id !== id);
    deleteFromCloudBackend('banners', id);
  },

  // CMS PAGES
  getPages: (): CMSPage[] => cloudStore.pages,
  getPageBySlug: (slug: string): CMSPage | undefined => {
    return cloudStore.pages.find(p => p.slug === slug);
  },
  savePage: (page: CMSPage): CMSPage => {
    const idx = cloudStore.pages.findIndex(p => p.id === page.id);
    let updatedPage = { ...page, updatedAt: new Date().toISOString() };
    if (idx >= 0) {
      cloudStore.pages[idx] = updatedPage;
    } else {
      cloudStore.pages.push(updatedPage);
    }
    writeToCloudBackend('pages', updatedPage.id, updatedPage);
    return updatedPage;
  },

  // FAQS
  getFAQs: (): GeneralFAQ[] => cloudStore.faqs,
  saveFAQ: (faq: GeneralFAQ): GeneralFAQ => {
    const idx = cloudStore.faqs.findIndex(f => f.id === faq.id);
    if (idx >= 0) {
      cloudStore.faqs[idx] = faq;
    } else {
      cloudStore.faqs.push(faq);
    }
    writeToCloudBackend('faqs', faq.id, faq);
    return faq;
  },
  deleteFAQ: (id: string): void => {
    cloudStore.faqs = cloudStore.faqs.filter(f => f.id !== id);
    deleteFromCloudBackend('faqs', id);
  },

  // TESTIMONIALS
  getTestimonials: (): Testimonial[] => cloudStore.testimonials,
  saveTestimonial: (t: Testimonial): Testimonial => {
    const idx = cloudStore.testimonials.findIndex(item => item.id === t.id);
    if (idx >= 0) {
      cloudStore.testimonials[idx] = t;
    } else {
      cloudStore.testimonials.push(t);
    }
    writeToCloudBackend('testimonials', t.id, t);
    return t;
  },

  // SETTINGS
  getSettings: (): SiteSettings => cloudStore.settings,
  saveSettings: (settings: SiteSettings): SiteSettings => {
    cloudStore.settings = settings;
    writeToCloudBackend('settings', 'site_config', settings);
    return settings;
  },

  // INVENTORY LOGS
  getInventoryLogs: (): InventoryLog[] => cloudStore.inventoryLogs,

  // DPDP ACT PRIVACY COMPLIANCE
  getDataProcessors: (): DataProcessor[] => cloudStore.processors,
  saveDataProcessor: (processor: DataProcessor): DataProcessor => {
    const idx = cloudStore.processors.findIndex(p => p.id === processor.id);
    if (idx >= 0) cloudStore.processors[idx] = processor;
    else cloudStore.processors.push(processor);
    writeToCloudBackend('data_processors', processor.id, processor);
    return processor;
  },
  deleteDataProcessor: (id: string): void => {
    cloudStore.processors = cloudStore.processors.filter(p => p.id !== id);
    deleteFromCloudBackend('data_processors', id);
  },

  getPrivacyVersions: (): PrivacyPolicyVersion[] => cloudStore.privacyVersions,
  savePrivacyVersion: (v: PrivacyPolicyVersion): PrivacyPolicyVersion => {
    const idx = cloudStore.privacyVersions.findIndex(pv => pv.id === v.id);
    if (idx >= 0) cloudStore.privacyVersions[idx] = v;
    else cloudStore.privacyVersions.push(v);
    writeToCloudBackend('privacy_versions', v.id, v);
    return v;
  },

  getPrivacyRequests: (): PrivacyRequest[] => cloudStore.privacyRequests,
  createPrivacyRequest: (data: Omit<PrivacyRequest, 'id' | 'requestNumber' | 'createdAt' | 'updatedAt' | 'status' | 'verificationStatus'>): PrivacyRequest => {
    const req: PrivacyRequest = {
      ...data,
      id: `req-${Date.now()}`,
      requestNumber: `DPDP-REQ-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'new',
      verificationStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    cloudStore.privacyRequests.unshift(req);
    writeToCloudBackend('privacy_requests', req.id, req);
    return req;
  },
  updatePrivacyRequestStatus: (id: string, status: PrivacyRequest['status'], internalNotes?: string): PrivacyRequest | null => {
    const idx = cloudStore.privacyRequests.findIndex(r => r.id === id);
    if (idx === -1) return null;
    cloudStore.privacyRequests[idx] = {
      ...cloudStore.privacyRequests[idx],
      status,
      internalNotes: internalNotes || cloudStore.privacyRequests[idx].internalNotes,
      updatedAt: new Date().toISOString(),
    };
    writeToCloudBackend('privacy_requests', cloudStore.privacyRequests[idx].id, cloudStore.privacyRequests[idx]);
    return cloudStore.privacyRequests[idx];
  },

  getConsentRecords: (): ConsentRecord[] => cloudStore.consentRecords,
  recordConsent: (phoneOrEmail: string, purpose: ConsentRecord['purpose'], isConsented: boolean, sourcePage: string, language: Language): ConsentRecord => {
    const record: ConsentRecord = {
      id: `consent-${Date.now()}`,
      phoneOrEmail,
      purpose,
      isConsented,
      sourcePage,
      language,
      policyVersion: cloudStore.settings.privacyPolicyVersion || 'v1.0-2025',
      timestamp: new Date().toISOString(),
    };
    cloudStore.consentRecords.unshift(record);
    writeToCloudBackend('consent_records', record.id, record);
    return record;
  },

  getSecurityIncidents: (): SecurityIncident[] => cloudStore.securityIncidents,
  reportSecurityIncident: (incidentData: Omit<SecurityIncident, 'id' | 'createdAt'>): SecurityIncident => {
    const inc: SecurityIncident = {
      ...incidentData,
      id: `inc-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    cloudStore.securityIncidents.unshift(inc);
    writeToCloudBackend('security_incidents', inc.id, inc);
    return inc;
  },
  logSecurityIncident: (incidentData: Omit<SecurityIncident, 'id' | 'createdAt'>): SecurityIncident => {
    return dbService.reportSecurityIncident(incidentData);
  },

  exportCustomerData: (email: string) => {
    const customerOrders = cloudStore.orders.filter(o => o.customerEmail === email);
    const requests = cloudStore.privacyRequests.filter(r => r.customerEmail === email);
    return {
      email,
      orders: customerOrders,
      privacyRequests: requests,
      exportedAt: new Date().toISOString(),
    };
  },

  deleteCustomerData: (email: string) => {
    cloudStore.orders = cloudStore.orders.filter(o => o.customerEmail !== email);
    cloudStore.customers = cloudStore.customers.filter(c => c.email !== email);
  },

  clearAllDummyData: async () => {
    cloudStore.products = [];
    cloudStore.categories = [];
    cloudStore.banners = [];
    cloudStore.coupons = [];
    cloudStore.faqs = [];
    cloudStore.testimonials = [];
    notifyDatabaseUpdate();

    const { clearFirestoreDatabase } = await import('./firebaseDb');
    return clearFirestoreDatabase();
  },
};
