import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { CartDrawer } from './components/cart/CartDrawer';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AccountPage } from './pages/AccountPage';
import { StoreLocationsPage } from './pages/StoreLocationsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { CMSPage } from './pages/CMSPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { PrivacyCenterPage } from './pages/PrivacyCenterPage';

import { AdminLayout } from './pages/admin/AdminLayout';

import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminInventory } from './pages/admin/AdminInventory';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminCoupons } from './pages/admin/AdminCoupons';
import { AdminCMS } from './pages/admin/AdminCMS';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminPrivacyDashboard } from './pages/admin/AdminPrivacyDashboard';
import { AdminPrivacyRequests } from './pages/admin/AdminPrivacyRequests';
import { AdminPrivacyVersions } from './pages/admin/AdminPrivacyVersions';
import { AdminPrivacyProcessors } from './pages/admin/AdminPrivacyProcessors';
import { AdminPrivacyBreaches } from './pages/admin/AdminPrivacyBreaches';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {!isAdminRoute && <Header />}
      
      <main className="flex-1">
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/category/:slug" element={<ShopPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
          <Route path="/order-tracking" element={<OrderTrackingPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/store-locations" element={<StoreLocationsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />

          
          {/* Dedicated DPDP Privacy & Legal Routes */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy-center" element={<PrivacyCenterPage />} />
          <Route path="/privacy-center/consent" element={<PrivacyCenterPage />} />
          <Route path="/privacy-center/rights" element={<PrivacyCenterPage />} />
          <Route path="/privacy-center/grievance" element={<PrivacyCenterPage />} />

          <Route path="/terms-and-conditions" element={<CMSPage slugOverride="terms-and-conditions" />} />
          <Route path="/shipping-policy" element={<CMSPage slugOverride="shipping-policy" />} />
          <Route path="/cancellation-returns" element={<CMSPage slugOverride="cancellation-returns" />} />

          {/* Legacy / Unknown Reception Route Redirect */}
          <Route path="/reception" element={<Navigate to="/admin" replace />} />
          <Route path="/admin/reception" element={<Navigate to="/admin" replace />} />

          {/* Admin Master Control Center Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="cms" element={<AdminCMS />} />
            <Route path="settings" element={<AdminSettings />} />

            {/* Admin DPDP Privacy & Compliance Routes */}
            <Route path="privacy" element={<AdminPrivacyDashboard />} />
            <Route path="privacy-requests" element={<AdminPrivacyRequests />} />
            <Route path="privacy-versions" element={<AdminPrivacyVersions />} />
            <Route path="privacy-processors" element={<AdminPrivacyProcessors />} />
            <Route path="privacy-breaches" element={<AdminPrivacyBreaches />} />
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppButton />}
      {!isAdminRoute && <CartDrawer />}
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <WishlistProvider>
            <CartProvider>
              <AppLayout />
            </CartProvider>
          </WishlistProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
