export type Language = 'te' | 'en';

export interface BilingualText {
  en: string;
  te: string;
}

export interface SpecificationItem {
  key_en: string;
  key_te: string;
  value_en: string;
  value_te: string;
}

export interface FAQItem {
  question_en: string;
  question_te: string;
  answer_en: string;
  answer_te: string;
}

export interface ProductVariant {
  id: string;
  name_en: string;
  name_te: string;
  weightUnit: string;
  price: number;
  mrp: number;
  stock: number;
  sku: string;
  isDefault?: boolean;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name_en: string;
  name_te: string;
  categoryId: string;
  price: number;
  mrp: number;
  discount: number; // percentage
  stock: number;
  unit: string; // e.g. "500g", "1 Ltr", "25 Pcs"
  images: string[];
  description_en: string;
  description_te: string;
  benefits_en: string[];
  benefits_te: string[];
  usage_en: string[];
  usage_te: string[];
  specifications: SpecificationItem[];
  faqs: FAQItem[];
  variants: ProductVariant[];
  tags: string[];
  isFeatured: boolean;
  isActive: boolean;
  rating: number;
  reviewsCount: number;
  seoTitle_en?: string;
  seoTitle_te?: string;
  seoDescription_en?: string;
  seoDescription_te?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name_en: string;
  name_te: string;
  description_en: string;
  description_te: string;
  image: string;
  sortOrder: number;
  isActive: boolean;
}

export type OrderStatus = 
  | 'placed'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'COD' | 'Razorpay';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
  productId: string;
  variantId?: string;
  productName_en: string;
  productName_te: string;
  variantName_en?: string;
  variantName_te?: string;
  price: number;
  mrp: number;
  quantity: number;
  image: string;
  unit: string;
}

export interface OrderStatusHistory {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface Address {
  id?: string;
  fullName: string;
  phone: string;
  email?: string;
  addressLine: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  couponCode?: string;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  courierName?: string;
  internalNotes?: string;
  statusHistory: OrderStatusHistory[];
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  totalOrders: number;
  totalSpent: number;
  marketingOptIn?: boolean;
  createdAt: string;
  lastOrderAt?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiryDate: string;
  usageLimit: number;
  timesUsed: number;
  isActive: boolean;
  applicableCategoryIds?: string[];
  applicableProductIds?: string[];
}

export interface Banner {
  id: string;
  title_en: string;
  title_te: string;
  subtitle_en: string;
  subtitle_te: string;
  imageUrl: string;
  linkUrl: string;
  buttonText_en: string;
  buttonText_te: string;
  position: 'hero' | 'promo' | 'category';
  isActive: boolean;
  sortOrder: number;
}

export interface CMSPage {
  id: string;
  slug: string;
  title_en: string;
  title_te: string;
  content_en: string;
  content_te: string;
  updatedAt: string;
}

export interface GeneralFAQ {
  id: string;
  category: 'shipping' | 'products' | 'organic' | 'payment' | 'privacy' | 'general';
  question_en: string;
  question_te: string;
  answer_en: string;
  answer_te: string;
  sortOrder: number;
}

export interface SiteSettings {
  logoUrl: string;
  faviconUrl: string;
  websiteName: string;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  email: string;
  storeAddress: string;
  premisesAddress: string;
  googleMapsUrlStore: string;
  googleMapsUrlPremises: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  currencySymbol: string;
  defaultLanguage: Language;
  baseShippingCharge: number;
  freeShippingThreshold: number;
  isCODEnabled: boolean;
  isRazorpayEnabled: boolean;
  razorpayKeyId: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  // DPDP & Privacy Settings
  privacyPolicyVersion: string;
  privacyContactEmail: string;
  privacyContactPhone: string;
  privacyResponseSlaDays: number;
  isMarketingConsentRequired: boolean;
  isAnalyticsEnabled: boolean;
  dataRetentionOrderYears: number;
  dataRetentionAccountDays: number;
}

export interface InventoryLog {
  id: string;
  productId: string;
  variantId?: string;
  productName: string;
  changeType: 'addition' | 'reduction' | 'adjustment' | 'sale' | 'cancel';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  staffNote?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment_en: string;
  comment_te: string;
  avatarUrl?: string;
  isApproved: boolean;
}

/* =========================================================
   DPDP ACT 2023 & RULES 2025 COMPLIANCE DATA STRUCTURES
========================================================= */

export type PrivacyRequestType = 
  | 'access'
  | 'correction'
  | 'erasure'
  | 'consent_withdrawal'
  | 'grievance';

export type PrivacyRequestStatus = 
  | 'new'
  | 'verification_required'
  | 'in_review'
  | 'action_required'
  | 'resolved'
  | 'rejected'
  | 'closed';

export interface ConsentRecord {
  id: string;
  userId?: string;
  phoneOrEmail: string;
  purpose: 'marketing_opt_in' | 'analytics' | 'essential_order_fulfillment';
  isConsented: boolean;
  timestamp: string;
  policyVersion: string;
  sourcePage: string;
  language: Language;
  withdrawnAt?: string;
}

export interface PrivacyRequest {
  id: string;
  requestNumber: string;
  requestType: PrivacyRequestType;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  description: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
  status: PrivacyRequestStatus;
  verificationStatus: 'pending' | 'verified' | 'unverified';
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DataProcessor {
  id: string;
  providerName: string;
  purpose: string;
  dataCategories: string[];
  serviceUrl: string;
  privacyPolicyUrl: string;
  isActive: boolean;
}

export interface SecurityIncident {
  id: string;
  incidentId: string;
  detectionTime: string;
  incidentType: string;
  affectedSystems: string;
  dataCategories: string;
  approxAffectedUsers: number;
  riskAssessment: string;
  actionsTaken: string;
  containmentStatus: 'investigating' | 'contained' | 'resolved' | 'closed';
  notifications: string;
  resolutionNotes?: string;
  createdAt: string;
}

export interface PrivacyPolicyVersion {
  id: string;
  versionNumber: string;
  effectiveDate: string;
  title_en: string;
  title_te: string;
  content_en: string;
  content_te: string;
  isPublished: boolean;
  createdByName: string;
  createdAt: string;
}
