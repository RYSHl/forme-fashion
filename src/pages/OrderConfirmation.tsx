import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Printer } from 'lucide-react';
import { orderService } from '../services/orderService';
import { formatINR, formatDate } from '../utils/formatters';

export const OrderConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const order = id ? orderService.getOrderById(id) : undefined;

  if (!order) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <h2 className="text-xl font-light uppercase tracking-widest mb-3">Order Not Found</h2>
        <p className="text-xs text-brand-muted mb-6">Could not retrieve order details for #{id}.</p>
        <Link to="/" className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-widest font-semibold">
          Return Home
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Success Badge Banner */}
      <div className="text-center mb-10 pb-8 border-b border-neutral-200">
        <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold bg-emerald-100 px-3 py-1">
          Demo Order Registered
        </span>
        <h1 className="text-3xl font-light uppercase tracking-tight text-black mt-3">
          Thank you for your order
        </h1>
        <p className="text-xs text-brand-muted mt-2">
          A confirmation summary has been registered under reference <strong>{order.id}</strong>.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Link
            to={`/orders/${order.id}`}
            className="px-5 py-2 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 flex items-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>Track Order Status</span>
          </Link>
          <button
            onClick={handlePrint}
            className="px-4 py-2 border border-neutral-300 text-neutral-700 text-xs uppercase tracking-wider font-medium hover:bg-neutral-50 flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-brand-soft border border-neutral-200 p-6 sm:p-8 space-y-6 text-xs">
        {/* Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-neutral-200">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-brand-muted block">Order Reference</span>
            <span className="font-semibold text-black text-sm">{order.id}</span>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-brand-muted block">Date</span>
            <span className="font-medium text-black">{formatDate(order.date)}</span>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-brand-muted block">Payment</span>
            <span className="font-medium text-black">Demo Authorized</span>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-brand-muted block">Estimated Delivery</span>
            <span className="font-semibold text-emerald-800">{order.deliveryMethod.estimatedDays}</span>
          </div>
        </div>

        {/* Shipping Destination */}
        <div className="pb-6 border-b border-neutral-200">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-black mb-2">
            Shipping Destination
          </h3>
          <p className="text-neutral-700 leading-relaxed">
            <strong>{order.shippingAddress.fullName}</strong>
            <br />{order.shippingAddress.addressLine1}
            {order.shippingAddress.addressLine2 && <>, {order.shippingAddress.addressLine2}</>}
            <br />{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            <br />Contact: {order.shippingAddress.phone}
          </p>
        </div>

        {/* Purchased Items List */}
        <div>
          <h3 className="text-xs uppercase tracking-widest font-semibold text-black mb-3">
            Garments in this Shipment ({order.items.length})
          </h3>
          <div className="divide-y divide-neutral-200">
            {order.items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-14 object-cover bg-neutral-200" />
                  <div>
                    <p className="font-medium text-black">{item.name}</p>
                    <p className="text-[11px] text-brand-muted">{item.size} • {item.color.name} (Qty: {item.quantity})</p>
                  </div>
                </div>
                <span className="font-semibold text-black">
                  {formatINR(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="pt-4 border-t border-neutral-200 space-y-2 text-brand-muted">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-black font-medium">{formatINR(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Voucher Discount</span>
              <span>-{formatINR(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="text-black font-medium">{order.shippingFee === 0 ? 'Complimentary' : formatINR(order.shippingFee)}</span>
          </div>
          <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-bold text-black">
            <span>Total Paid (Demo)</span>
            <span>{formatINR(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/"
          className="text-xs uppercase tracking-widest underline hover:text-neutral-600"
        >
          Return to Storefront
        </Link>
      </div>
    </div>
  );
};
