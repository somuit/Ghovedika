import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDoc,
  writeBatch 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from '../lib/firebase';
import { 
  initialProducts, initialCategories, initialCoupons, 
  initialBanners, initialPages, initialFAQs, initialSiteSettings, initialTestimonials 
} from '../data/initialData';
import { Product, Category, Order, Coupon, Banner, CMSPage, GeneralFAQ, SiteSettings, Testimonial } from '../types';

export interface FirebaseStatusInfo {
  isConfigured: boolean;
  isConnected: boolean;
  projectId: string;
  errorMessage?: string;
  collectionsCount?: Record<string, number>;
}

// 1. Check Connectivity & Collection Stats
export const checkFirebaseStatus = async (): Promise<FirebaseStatusInfo> => {
  const configured = isFirebaseConfigured();
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || 'ghovedika-store';

  if (!configured) {
    return {
      isConfigured: false,
      isConnected: false,
      projectId,
      errorMessage: 'Firebase configuration is incomplete in .env file.',
    };
  }

  try {
    // Try fetching products collection to verify read access
    const productsSnap = await getDocs(collection(db, 'products'));
    const categoriesSnap = await getDocs(collection(db, 'categories'));
    const bannersSnap = await getDocs(collection(db, 'banners'));

    return {
      isConfigured: true,
      isConnected: true,
      projectId,
      collectionsCount: {
        products: productsSnap.size,
        categories: categoriesSnap.size,
        banners: bannersSnap.size,
      },
    };
  } catch (error: any) {
    console.warn('Firebase status check warning:', error);
    return {
      isConfigured: true,
      isConnected: false,
      projectId,
      errorMessage: error.message || 'Could not connect to Firestore database.',
    };
  }
};

// 2. Seed Firebase Database with Initial Content
export const seedFirestoreDatabase = async (): Promise<{ success: boolean; message: string; count?: number }> => {
  if (!isFirebaseConfigured()) {
    return { success: false, message: 'Firebase credentials missing in .env.' };
  }

  try {
    let totalItems = 0;

    // Seed Products
    for (const prod of initialProducts) {
      await setDoc(doc(db, 'products', prod.id), prod, { merge: true });
      totalItems++;
    }

    // Seed Categories
    for (const cat of initialCategories) {
      await setDoc(doc(db, 'categories', cat.id), cat, { merge: true });
      totalItems++;
    }

    // Seed Banners
    for (const ban of initialBanners) {
      await setDoc(doc(db, 'banners', ban.id), ban, { merge: true });
      totalItems++;
    }

    // Seed Coupons
    for (const cpn of initialCoupons) {
      await setDoc(doc(db, 'coupons', cpn.id), cpn, { merge: true });
      totalItems++;
    }

    // Seed Site Settings
    await setDoc(doc(db, 'settings', 'site_config'), initialSiteSettings, { merge: true });
    totalItems++;

    // Seed FAQs
    for (const faq of initialFAQs) {
      await setDoc(doc(db, 'faqs', faq.id), faq, { merge: true });
      totalItems++;
    }

    // Seed Pages
    for (const pg of initialPages) {
      await setDoc(doc(db, 'pages', pg.id), pg, { merge: true });
      totalItems++;
    }

    // Seed Testimonials
    for (const test of initialTestimonials) {
      await setDoc(doc(db, 'testimonials', test.id), test, { merge: true });
      totalItems++;
    }

    return {
      success: true,
      message: `Successfully created and seeded database with ${totalItems} records across all collections!`,
      count: totalItems,
    };
  } catch (error: any) {
    console.error('Error seeding Firestore database:', error);
    return {
      success: false,
      message: `Database seeding failed: ${error.message || 'Unknown error'}`,
    };
  }
};

// High-Speed WebP Conversion using createImageBitmap & GPU Hardware Acceleration (Ultra High Quality - 1920px HD, Quality 0.88)
export const convertFileToWebP = async (file: File, maxWidth = 1920, quality = 0.88): Promise<File> => {
  // If already WebP and small enough (<500KB), resolve instantly
  if (file.type === 'image/webp' && file.size < 500 * 1024) {
    return file;
  }

  try {
    // 1. Fast Hardware-Accelerated Image Decoding via createImageBitmap
    let imgBitmap: ImageBitmap | null = null;
    if (typeof window !== 'undefined' && 'createImageBitmap' in window) {
      imgBitmap = await createImageBitmap(file);
    }

    let width = imgBitmap ? imgBitmap.width : 0;
    let height = imgBitmap ? imgBitmap.height : 0;

    const canvas = document.createElement('canvas');

    if (imgBitmap && width > 0 && height > 0) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d', { alpha: true });
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high'; // Maximum crisp detail
        ctx.drawImage(imgBitmap, 0, 0, width, height);
        imgBitmap.close(); // Release GPU memory immediately

        const blob: Blob | null = await new Promise(res => canvas.toBlob(res, 'image/webp', quality));
        if (blob) {
          const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
          return new File([blob], `${baseName.replace(/[^a-zA-Z0-9_-]/g, '_')}.webp`, {
            type: 'image/webp',
            lastModified: Date.now(),
          });
        }
      }
    }
  } catch (fastErr) {
    console.warn('Fast ImageBitmap conversion fallback:', fastErr);
  }

  // Fallback to standard fast FileReader if createImageBitmap is not supported
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (!blob) {
            resolve(file);
            return;
          }
          const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
          const webpFile = new File([blob], `${baseName.replace(/[^a-zA-Z0-9_-]/g, '_')}.webp`, {
            type: 'image/webp',
            lastModified: Date.now(),
          });
          resolve(webpFile);
        }, 'image/webp', quality);
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
};

// Helper: High-Quality WebP Data URL fallback (1920px Full HD resolution, Quality 0.88)
const compressImageFile = (file: File, maxWidth = 1920, quality = 0.88): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        // Compress as High-Quality WebP
        const compressedDataUrl = canvas.toDataURL('image/webp', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

// 3. Image Upload Helper (Firebase Storage WebP Auto-Conversion + Storage Saver)
export const uploadImageToFirebase = async (
  file: File, 
  folderName: string = 'uploads'
): Promise<{ url: string; storageType: 'cloud' | 'compressed'; originalSizeKb?: number; webpSizeKb?: number }> => {
  const originalSizeKb = Math.round(file.size / 1024);

  // 1. Auto-Convert to lightweight WebP format to save Cloud Storage space
  const webpFile = await convertFileToWebP(file);
  const webpSizeKb = Math.round(webpFile.size / 1024);

  // First try Firebase Storage if configured
  if (isFirebaseConfigured() && storage) {
    try {
      const timeStamp = Date.now();
      const sanitizedName = webpFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const storageRef = ref(storage, `${folderName}/${timeStamp}_${sanitizedName}`);
      
      const snapshot = await uploadBytes(storageRef, webpFile);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return { url: downloadUrl, storageType: 'cloud', originalSizeKb, webpSizeKb };
    } catch (storageErr: any) {
      console.warn('Firebase Storage upload notice (using WebP fallback):', storageErr?.message || storageErr);
    }
  }

  // Fallback to high-efficiency WebP Data URL
  const compressedUrl = await compressImageFile(webpFile);
  return { url: compressedUrl, storageType: 'compressed', originalSizeKb, webpSizeKb };
};

// 4. Clear/Wipe All Sample Dummy Data from Firebase Firestore Database
export const clearFirestoreDatabase = async (): Promise<{ success: boolean; message: string }> => {
  if (!isFirebaseConfigured() || !db) {
    return { success: false, message: 'Firebase credentials missing.' };
  }

  try {
    const collectionsToWipe = ['products', 'categories', 'banners', 'coupons', 'faqs', 'testimonials'];
    let deletedCount = 0;

    for (const colName of collectionsToWipe) {
      const snap = await getDocs(collection(db, colName));
      for (const docSnap of snap.docs) {
        await deleteDoc(doc(db, colName, docSnap.id));
        deletedCount++;
      }
    }

    return {
      success: true,
      message: `Cleaned ${deletedCount} dummy records from Firebase Firestore Database. You can now add fresh content!`,
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Wipe failed: ${err.message || 'Unknown error'}`,
    };
  }
};

