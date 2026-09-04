import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Package, CheckCircle2, Clock, Truck, MapPin, AlertCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { dbService } from '../services/db';
import { OrderStatus } from '../types';

export const OrderTrackingPage: React.FC = () => {
  const { t, getText } = useLanguage();
  const [searchParams] = useSearchParams();

  const initialQuery = searchParams.get('orderId') || '';
  const [query, setQuery] = useState(initialQuery);
  const [searchedOrder, setSearchedOrder] = useState(() => {
    return initialQuery ? dbService.getOrderById(initialQuery) : null;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const found = dbService.getOrderById(query.trim());
      setSearchedOrder(found || null);
    }
  };

  const statusSteps: { status: OrderStatus; label_te: string; label_en: string }[] = [
    { status: 'placed', label_te: 'ఆర్డర్ నమోదు', label_en: 'Placed' },
    { status: 'confirmed', label_te: 'నిర్ధారించబడింది', label_en: 'Confirmed' },
    { status: 'processing', label_te: 'ప్రాసెసింగ్', label_en: 'Processing' },
    { status: 'packed', label_te: 'ప్యాకింగ్ పూర్తయింది', label_en: 'Packed' },
    { status: 'shipped', label_te: 'రవాణాలో ఉంది', label_en: 'Shipped' },
    { status: 'out_for_delivery', label_te: 'డెలివరీకి బయలుదేరింది', label_en: 'Out for Delivery' },
    { status: 'delivered', label_te: 'డెలివరీ పూర్తయింది', label_en: 'Delivered' },
  ];

  const getStepIndex = (currentStatus: OrderStatus) => {
    return statusSteps.findIndex(s => s.status === currentStatus);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold font-telugu text-brand-900">
          {t('ఆర్డర్ స్టేటస్ ట్రాకింగ్', 'Track Order Status')}
        </h1>
        <p className="text-xs text-gray-500">
          {t('మీ ఆర్డర్ ఐడీ లేదా మొబైల్ నంబర్ నమోదు చేసి స్థితిని తెలుసుకోండి', 'Enter your Order ID or registered mobile number to check status')}
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
        <input
          type="text"
          placeholder="e.g. GH-8831 or 8008588599"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-500 shadow-sm"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>{t('ట్రాక్ చేయి', 'Track')}</span>
        </button>
      </form>

      {/* Order Details & Timeline */}
      {searchedOrder ? (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-100 shadow-card space-y-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-100 gap-4">
            <div>
              <span className="text-xs text-gray-500 font-medium">{t('ఆర్డర్ ఐడీ', 'Order ID')}</span>
              <h3 className="text-xl font-extrabold text-brand-500">#{searchedOrder.orderNumber}</h3>
              <span className="text-xs text-gray-400">Date: {new Date(searchedOrder.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                {searchedOrder.orderStatus}
              </span>
              {searchedOrder.trackingNumber && (
                <p className="text-xs text-gray-600 mt-1">
                  Courier Tracking: <strong className="text-brand-500">{searchedOrder.trackingNumber}</strong>
                </p>
              )}
            </div>
          </div>

          {/* Visual Timeline Tracking Bar */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t('లైవ్ డెలివరీ ప్రగతి', 'Live Order Progress Timeline')}
            </h4>

            {searchedOrder.orderStatus === 'cancelled' ? (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{t('ఈ ఆర్డర్ రద్దు చేయబడింది.', 'This order has been cancelled.')}</span>
              </div>
            ) : (
              <div className="relative py-4">
                <div className="overflow-x-auto pb-4">
                  <div className="flex items-center min-w-[650px] justify-between relative px-4">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-8 right-8 h-1 bg-gray-200 -translate-y-1/2 z-0" />
                    <div 
                      className="absolute top-1/2 left-8 h-1 bg-brand-500 -translate-y-1/2 z-0 transition-all duration-500" 
                      style={{ 
                        width: `${Math.max(0, (getStepIndex(searchedOrder.orderStatus) / (statusSteps.length - 1)) * 90)}%` 
                      }} 
                    />

                    {statusSteps.map((step, idx) => {
                      const currentIdx = getStepIndex(searchedOrder.orderStatus);
                      const isCompleted = idx <= currentIdx;

                      return (
                        <div key={step.status} className="relative z-10 flex flex-col items-center gap-2 text-center w-20">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition ${
                            isCompleted ? 'bg-brand-500 text-white shadow-md' : 'bg-gray-100 text-gray-400 border border-gray-300'
                          }`}>
                            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                          </div>
                          <span className={`text-[10px] font-semibold ${isCompleted ? 'text-brand-900' : 'text-gray-400'}`}>
                            {t(step.label_te, step.label_en)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Items Summary */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t('ఆర్డర్ సరుకులు', 'Ordered Items')}
            </h4>
            <div className="space-y-2">
              {searchedOrder.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-xs p-2 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt="" className="w-10 h-10 object-cover rounded border" />
                    <div>
                      <span className="font-bold text-gray-900 block">{item.productName_en}</span>
                      <span className="text-gray-500">Qty: {item.quantity} x ₹{item.price}</span>
                    </div>
                  </div>
                  <span className="font-bold text-brand-500">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : query ? (
        <div className="bg-white p-8 rounded-3xl border border-brand-100 shadow-card text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="font-bold text-gray-900 text-sm">
            {t('ఏటువంటి ఆర్డర్ లభించలేదు', 'No Order Found')}
          </h3>
          <p className="text-xs text-gray-500">
            {t('దయచేసి సరైన ఆర్డర్ నంబర్ నమోదు చేసినట్లు సరి చూసుకోండి.', 'Please check the order ID or phone number entered.')}
          </p>
        </div>
      ) : null}

    </div>
  );
};
