import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, CheckCircle2, Clock, ChevronLeft, MapPin } from 'lucide-react';
import { orderService } from '../services/orderService';
import { formatINR } from '../utils/formatters';

export const OrderTracking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const order = id ? orderService.getOrderById(id) : undefined;

  if (!order) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <h2 className="text-xl font-light uppercase tracking-widest mb-3">Order Not Found</h2>
        <p className="text-xs text-brand-muted mb-6">Order #{id} could not be located in your records.</p>
        <Link to="/account" className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-widest font-semibold">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/account"
          className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-neutral-500 hover:text-black"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back to Account</span>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 mb-8 gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-brand-muted">Shipment Tracking</span>
          <h1 className="text-2xl sm:text-3xl font-light uppercase tracking-tight text-black mt-1">
            Order #{order.id}
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Tracking Carrier Reference: <strong className="font-mono text-black">{order.trackingNumber}</strong>
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className={`inline-block text-xs uppercase tracking-widest font-bold px-3 py-1 ${
            order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
            order.status === 'shipped' ? 'bg-sky-100 text-sky-800' :
            'bg-amber-100 text-amber-800'
          }`}>
            Status: {order.status.replace('_', ' ')}
          </span>
          <p className="text-[11px] text-brand-muted mt-1">
            Expected Delivery: {order.deliveryMethod.estimatedDays}
          </p>
        </div>
      </div>

      {/* Visual Timeline Stepper */}
      <div className="bg-brand-soft border border-neutral-200 p-6 sm:p-8 mb-10">
        <h2 className="text-xs uppercase tracking-widest font-semibold text-black mb-6">
          Dispatch & Delivery Milestones
        </h2>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-neutral-200">
          {order.timeline.map((step, idx) => {
            const isDone = step.completed;
            const isCurrent = step.current;

            return (
              <div key={idx} className="relative">
                {/* Node icon */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                    isDone
                      ? 'bg-black text-white'
                      : isCurrent
                      ? 'bg-sky-600 text-white ring-4 ring-sky-100'
                      : 'bg-white border-2 border-neutral-300 text-neutral-400'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : isCurrent ? (
                    <Clock className="w-3.5 h-3.5 animate-pulse" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                  )}
                </div>

                <div className="text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <p className={`uppercase tracking-wider font-semibold ${isDone || isCurrent ? 'text-black' : 'text-neutral-400'}`}>
                      {step.label}
                    </p>
                    <span className="text-[11px] text-neutral-500 font-mono">
                      {step.timestamp}
                    </span>
                  </div>
                  <p className="text-brand-muted mt-1 text-[11px] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery Address & Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
        {/* Destination */}
        <div className="border border-neutral-200 p-6 bg-white space-y-3">
          <h3 className="uppercase tracking-widest font-semibold text-black flex items-center gap-1.5 pb-2 border-b">
            <MapPin className="w-3.5 h-3.5" />
            <span>Destination Address</span>
          </h3>
          <p className="text-neutral-700 leading-relaxed">
            <strong>{order.shippingAddress.fullName}</strong>
            <br />{order.shippingAddress.addressLine1}
            {order.shippingAddress.addressLine2 && <>, {order.shippingAddress.addressLine2}</>}
            <br />{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            <br />{order.shippingAddress.country}
          </p>
          <p className="text-brand-muted pt-2 border-t border-neutral-100">
            Contact phone: {order.shippingAddress.phone}
          </p>
        </div>

        {/* Shipment Items */}
        <div className="border border-neutral-200 p-6 bg-white space-y-3">
          <h3 className="uppercase tracking-widest font-semibold text-black flex items-center gap-1.5 pb-2 border-b">
            <Package className="w-3.5 h-3.5" />
            <span>Package Contents ({order.items.length})</span>
          </h3>
          <div className="divide-y divide-neutral-100 max-h-44 overflow-y-auto pr-1">
            {order.items.map((item) => (
              <div key={item.id} className="py-2 flex items-center justify-between">
                <div>
                  <p className="font-medium text-black line-clamp-1">{item.name}</p>
                  <p className="text-[11px] text-brand-muted">{item.size} • {item.color.name} (x{item.quantity})</p>
                </div>
                <span className="font-semibold text-black ml-2">
                  {formatINR(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-neutral-100 flex justify-between font-bold text-black">
            <span>Total Value</span>
            <span>{formatINR(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
