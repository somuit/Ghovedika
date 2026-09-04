import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';

interface WishlistContextType {
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Get or create persistent cloud session token for anonymous or logged-in user
const getSessionId = (): string => {
  let id = sessionStorage.getItem('ghovedika_session_id');
  if (!id) {
    id = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('ghovedika_session_id', id);
  }
  return id;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const sessionId = getSessionId();

  // Listen to live Cloud Firestore Wishlist Backend
  useEffect(() => {
    if (!isFirebaseConfigured() || !db) return;

    const wishlistDocRef = doc(db, 'wishlists', sessionId);
    const unsubscribe = onSnapshot(wishlistDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Array.isArray(data.items)) {
          setWishlistIds(data.items);
        }
      }
    }, (err) => {
      console.warn('Wishlist cloud sync notice:', err);
    });

    return () => unsubscribe();
  }, [sessionId]);

  const saveWishlistToCloud = (items: string[]) => {
    setWishlistIds(items);
    if (isFirebaseConfigured() && db) {
      setDoc(doc(db, 'wishlists', sessionId), {
        items,
        updatedAt: new Date().toISOString()
      }, { merge: true }).catch(err => {
        console.warn('Failed to save wishlist to cloud backend:', err);
      });
    }
  };

  const toggleWishlist = (productId: string) => {
    let updated: string[];
    if (wishlistIds.includes(productId)) {
      updated = wishlistIds.filter(id => id !== productId);
    } else {
      updated = [...wishlistIds, productId];
    }
    saveWishlistToCloud(updated);
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlistIds.includes(productId);
  };

  return (
    <WishlistContext.Provider value={{
      wishlistIds,
      toggleWishlist,
      isInWishlist,
      wishlistCount: wishlistIds.length
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

