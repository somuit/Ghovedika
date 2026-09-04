import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { Product, ProductVariant, Coupon, OrderItem } from '../types';
import { dbService } from '../services/db';

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  totalAmount: number;
  totalItemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  getOrderItems: () => OrderItem[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Persistent session token for cloud backend sync
const getCartSessionId = (): string => {
  let id = sessionStorage.getItem('ghovedika_cart_session_id');
  if (!id) {
    id = `cart_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('ghovedika_cart_session_id', id);
  }
  return id;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const sessionId = getCartSessionId();

  // 1. Sync Cart from Cloud Backend (Firestore)
  useEffect(() => {
    if (!isFirebaseConfigured() || !db) return;

    const cartDocRef = doc(db, 'carts', sessionId);
    const unsubscribe = onSnapshot(cartDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Array.isArray(data.items)) {
          setCartItems(data.items);
        }
        if (data.coupon) {
          setAppliedCoupon(data.coupon);
        }
      }
    }, (err) => {
      console.warn('Cloud Cart sync notice:', err);
    });

    return () => unsubscribe();
  }, [sessionId]);

  // Helper to push cart updates directly to Firebase Cloud Backend
  const syncCartToCloudBackend = (items: CartItem[], coupon: Coupon | null) => {
    setCartItems(items);
    setAppliedCoupon(coupon);

    if (isFirebaseConfigured() && db) {
      setDoc(doc(db, 'carts', sessionId), {
        items,
        coupon,
        updatedAt: new Date().toISOString()
      }, { merge: true }).catch(err => {
        console.warn('Cloud Cart Backend write warning:', err);
      });
    }
  };

  const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    let updatedItems: CartItem[] = [];
    const existingIndex = cartItems.findIndex(item => 
      item.product.id === product.id && 
      ((!variant && !item.variant) || (item.variant?.id === variant?.id))
    );

    if (existingIndex > -1) {
      updatedItems = [...cartItems];
      const currentQty = updatedItems[existingIndex].quantity;
      const availableStock = variant ? variant.stock : product.stock;
      const newQty = Math.min(availableStock, currentQty + quantity);
      updatedItems[existingIndex] = { ...updatedItems[existingIndex], quantity: newQty };
    } else {
      updatedItems = [...cartItems, { product, variant, quantity }];
    }

    syncCartToCloudBackend(updatedItems, appliedCoupon);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    const updatedItems = cartItems.filter(item => 
      !(item.product.id === productId && ((!variantId && !item.variant) || item.variant?.id === variantId))
    );
    syncCartToCloudBackend(updatedItems, appliedCoupon);
  };

  const updateQuantity = (productId: string, variantId: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    const updatedItems = cartItems.map(item => {
      if (item.product.id === productId && ((!variantId && !item.variant) || item.variant?.id === variantId)) {
        const availableStock = item.variant ? item.variant.stock : item.product.stock;
        return { ...item, quantity: Math.min(availableStock, quantity) };
      }
      return item;
    });

    syncCartToCloudBackend(updatedItems, appliedCoupon);
  };

  const clearCart = () => {
    setCouponError(null);
    syncCartToCloudBackend([], null);
  };

  // Subtotal calculation
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.variant ? item.variant.price : item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  // Total items count
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Coupon evaluation
  let couponDiscount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
    const res = dbService.validateCoupon(appliedCoupon.code, subtotal);
    if (res.valid) {
      couponDiscount = res.discount;
    } else {
      syncCartToCloudBackend(cartItems, null);
    }
  }

  const applyCoupon = (code: string): boolean => {
    setCouponError(null);
    const res = dbService.validateCoupon(code, subtotal);
    if (res.valid && res.coupon) {
      syncCartToCloudBackend(cartItems, res.coupon);
      return true;
    } else {
      setCouponError(res.error || 'Invalid coupon code.');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponError(null);
    syncCartToCloudBackend(cartItems, null);
  };

  // Dynamic Shipping Fee from Site Settings
  const settings = dbService.getSettings();
  const freeShippingThreshold = settings.freeShippingThreshold || 999;
  const baseShippingCharge = settings.baseShippingCharge || 60;

  const isFreeShipping = subtotal >= freeShippingThreshold || cartItems.length === 0;
  const shippingFee = isFreeShipping ? 0 : baseShippingCharge;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const totalAmount = Math.max(0, subtotal - couponDiscount + shippingFee);

  const getOrderItems = (): OrderItem[] => {
    return cartItems.map(item => {
      const price = item.variant ? item.variant.price : item.product.price;
      const mrp = item.variant ? item.variant.mrp : item.product.mrp;
      return {
        productId: item.product.id,
        variantId: item.variant?.id,
        productName_en: item.product.name_en,
        productName_te: item.product.name_te,
        variantName_en: item.variant?.name_en,
        variantName_te: item.variant?.name_te,
        price,
        mrp,
        quantity: item.quantity,
        image: item.product.images[0] || '',
        unit: item.variant?.weightUnit || item.product.unit,
      };
    });
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      appliedCoupon,
      couponDiscount,
      couponError,
      applyCoupon,
      removeCoupon,
      subtotal,
      shippingFee,
      freeShippingThreshold,
      amountNeededForFreeShipping,
      totalAmount,
      totalItemCount,
      isCartOpen,
      setIsCartOpen,
      getOrderItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
