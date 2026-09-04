import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, FolderTree, ShoppingCart, 
  Boxes, Users, Tag, Image, FileText, Settings, LogOut, 
  ExternalLink, Lock, Shield, Menu, X, ShieldCheck 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dbService } from '../../services/db';

export const AdminLayout: React.FC = () => {
  const { user, isAdmin, loginAsAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const pendingOrdersCount = dbService.getOrders().filter(o => o.orderStatus === 'placed' || o.orderStatus === 'confirmed').length;
  const lowStockCount = dbService.getProducts().filter(p => p.stock <= 5).length;

  if (!isAdmin) {
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      const success = loginAsAdmin(passcode.trim());
      if (!success) {
        setPassError(true);
      }
    };

    return (
      <div className="min-h-screen bg-brand-900 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full p-8 rounded-3xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-brand-50 text-brand-500 rounded-2xl flex items-center justify-center mx-auto shadow">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold font-telugu text-brand-900">
              గోవేదిక అడ్మిన్ ప్యానెల్
            </h2>
            <p className="text-xs text-gray-500">
              Master Control Center Authentication
            </p>
          </div>

          {passError && (
            <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl font-bold text-center">
              Invalid Passcode. Please try again.
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Admin Passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => { setPasscode(e.target.value); setPassError(false); }}
                placeholder="Enter passcode (e.g. admin123)"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-xl shadow-lg transition"
            >
              Authenticate & Login
            </button>
          </form>

          <div className="text-center pt-2">
            <Link to="/" className="text-xs text-brand-500 font-semibold hover:underline">
              Return to Customer Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Products', icon: ShoppingBag },
    { path: '/admin/categories', label: 'Categories', icon: FolderTree },
    { path: '/admin/orders', label: 'Orders', icon: ShoppingCart, badge: pendingOrdersCount },
    { path: '/admin/inventory', label: 'Inventory', icon: Boxes, badge: lowStockCount, badgeColor: 'bg-amber-500' },
    { path: '/admin/customers', label: 'Customers', icon: Users },
    { path: '/admin/coupons', label: 'Coupons', icon: Tag },
    { path: '/admin/cms', label: 'Banners & CMS', icon: Image },
    { path: '/admin/privacy', label: 'Privacy & DPDP', icon: ShieldCheck },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];


  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-brand-900 text-white flex-col justify-between shadow-2xl shrink-0">
        <div className="p-6 space-y-6">
          <Link to="/admin" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Ghovedika Admin"
              className="w-10 h-10 rounded-full object-cover shadow border border-brand-gold"
            />
            <div>
              <h2 className="text-lg font-bold font-telugu text-white">గోవేదిక Admin</h2>
              <span className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">Master Control</span>
            </div>
          </Link>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition ${
                    isActive ? 'bg-brand-500 text-white shadow' : 'text-gray-300 hover:bg-brand-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className={`text-[10px] text-white font-bold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-red-500'}`}>
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-brand-800 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 text-xs text-amber-300 hover:text-white font-semibold"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Website Frontend</span>
          </Link>

          <button
            onClick={logout}
            className="w-full py-2 bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-brand-500"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">
              Ghovedika Master Control Panel
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200">
              System Online
            </span>
            <Link to="/" className="text-brand-500 hover:underline font-bold hidden sm:inline">
              Store Preview →
            </Link>
          </div>
        </header>

        {/* Dynamic Admin Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
};
