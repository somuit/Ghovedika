import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Printer, ArrowRight, MapPin, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { dbService } from '../services/db';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { t, getText } = useLanguage();

  const order = dbService.getOrderById(orderId || '');

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-800">Order not found</h2>
        <Link to="/" className="text-brand-500 hover:underline mt-4 inline-block">Return to Home</Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Top Success Banner */}
      <div className="bg-white p-8 rounded-3xl border border-brand-100 shadow-card text-center space-y-4">
        <div className="w-20 h-20 mx-auto bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        
        <span className="inline-block bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {t('ఆర్డర్ విజయవంతంగా నమోదు కాబడింది!', 'Order Successfully Placed!')}
        </span>

        <h1 className="text-3xl font-extrabold font-telugu text-brand-900">
          {t(`ధన్యవాదాలు, ${order.customerName}!`, `Thank you for your order, ${order.customerName}!`)}
        </h1>

        <p className="text-sm text-gray-600 max-w-lg mx-auto">
          {t(
            `మీ ఆర్డర్ నంబర్ #${order.orderNumber}. మేము మీ ఉత్పత్తులను ప్యాక్ చేసి డిస్పాచ్ ప్రక్రియ ప్రారంభిస్తున్నాము.`,
            `Your order #${order.orderNumber} has been received and is being processed for dispatch.`
          )}
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl flex items-center gap-2 transition"
          >
            <Printer className="w-4 h-4 text-gray-600" />
            <span>{t('ఇన్‌వాయిస్ ప్రింట్ చేయి', 'Print Tax Invoice')}</span>
          </button>

          <Link
            to={`/order-tracking?orderId=${order.orderNumber}`}
            className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow transition"
          >
            <Package className="w-4 h-4" />
            <span>{t('ఆర్డర్ ట్రాక్ చేయండి', 'Track Order Status')}</span>
          </Link>
        </div>
      </div>

      {/* Printable Invoice Container */}
      <div id="printable-invoice" className="bg-white p-8 rounded-3xl border border-brand-100 shadow-card space-y-6">
        
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-100 gap-4">
          <div>
            <h2 className="text-2xl font-bold font-telugu text-brand-900">గోవేదిక | GHOVEDIKA</h2>
            <p className="text-xs text-gray-500">Opposite Bradipeta Bridge, Palakollu, AP - 534260</p>
            <p className="text-xs text-gray-500">Phone: 8008588599 | ghovedika@gmail.com</p>
          </div>

          <div className="text-left sm:text-right text-xs">
            <span className="font-extrabold text-brand-500 text-sm block">#{order.orderNumber}</span>
            <span className="text-gray-500 block">Date: {new Date(order.createdAt).toLocaleDateString()}</span>
            <span className="text-gray-500 block">Payment: <strong>{order.paymentMethod}</strong> ({order.paymentStatus})</span>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs bg-brand-50/40 p-4 rounded-2xl border border-brand-100">
          <div>
            <h4 className="font-bold text-brand-900 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              <span>{t('డెలివరీ వివరాలు', 'Delivery Address')}</span>
            </h4>
            <p className="font-semibold text-gray-900">{order.shippingAddress.fullName}</p>
            <p className="text-gray-600">{order.shippingAddress.addressLine}</p>
            {order.shippingAddress.landmark && <p className="text-gray-500">Landmark: {order.shippingAddress.landmark}</p>}
            <p className="text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
            <p className="text-gray-600 font-semibold mt-1">Phone: {order.shippingAddress.phone}</p>
          </div>

          <div>
            <h4 className="font-bold text-brand-900 mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-500" />
              <span>{t('అంచనా డెలివరీ', 'Estimated Delivery')}</span>
            </h4>
            <p className="text-gray-700">3 - 5 Working Days</p>
            <p className="text-gray-500 mt-2">Status: <strong className="uppercase text-brand-500">{order.orderStatus}</strong></p>
          </div>
        </div>

        {/* Order Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase">
                <th className="py-2">Item</th>
                <th className="py-2 text-center">Unit Price</th>
                <th className="py-2 text-center">Qty</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {order.items.map((item, i) => (
                <tr key={i}>
                  <td className="py-3">
                    <span className="font-bold text-gray-900 block">{item.productName_en}</span>
                    {item.variantName_en && <span className="text-[11px] text-gray-500">{item.variantName_en}</span>}
                  </td>
                  <td className="py-3 text-center">₹{item.price}</td>
                  <td className="py-3 text-center">{item.quantity}</td>
                  <td className="py-3 text-right font-bold text-gray-900">₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="pt-4 border-t border-gray-200 space-y-1.5 text-xs text-gray-600 max-w-xs ml-auto">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-bold text-gray-900">₹{order.subtotal}</span>
          </div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Discount</span>
              <span>-₹{order.discountAmount}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span>
          </div>
          <div className="flex justify-between text-sm font-extrabold text-brand-500 pt-2 border-t border-gray-200">
            <span>Grand Total</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
