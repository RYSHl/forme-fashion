import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatters';

export const Cart: React.FC = () => {
  const {
    items,
    summary,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const success = applyCoupon(couponInput.trim());
      if (success) setCouponInput('');
    }
  };

  const progressPercent = Math.min(100, (summary.subtotal / summary.freeShippingThreshold) * 100);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 border border-neutral-300 mx-auto flex items-center justify-center mb-6 text-neutral-400">
          <ShoppingBag className="w-8 h-8 stroke-[1.25]" />
        </div>
        <h1 className="text-2xl font-light uppercase tracking-widest text-black mb-3">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs text-brand-muted max-w-md mx-auto mb-8 leading-relaxed">
          Looks like you haven't added any garments to your bag yet. Explore our latest arrivals or seasonal collections.
        </p>
        <Link
          to="/category/t-shirts"
          className="inline-block px-8 py-3.5 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <h1 className="text-2xl sm:text-3xl font-light uppercase tracking-tight text-black mb-8 pb-4 border-b border-neutral-200">
        Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Cart Items List (8 Cols) */}
        <div className="lg:col-span-8 divide-y divide-neutral-200">
          {/* Free Shipping Alert Banner */}
          <div className="p-4 bg-brand-soft border border-neutral-200 mb-6">
            <div className="flex justify-between items-center text-xs mb-2">
              {summary.amountNeededForFreeShipping > 0 ? (
                <span className="text-brand-muted">
                  Add <strong>{formatINR(summary.amountNeededForFreeShipping)}</strong> more to receive <strong>Complimentary Shipping</strong>
                </span>
              ) : (
                <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Your order qualifies for complimentary express delivery!
                </span>
              )}
              <span className="text-[11px] font-semibold text-neutral-500">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="w-full bg-neutral-200 h-1.5 overflow-hidden">
              <div
                className="bg-black h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {items.map((item) => (
            <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6 items-start">
              <Link to={`/product/${item.productId}`} className="shrink-0 w-24 sm:w-28 aspect-[3/4] bg-neutral-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>

              <div className="flex-1 flex flex-col justify-between w-full h-full">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-black">
                        <Link to={`/product/${item.productId}`} className="hover:underline">
                          {item.name}
                        </Link>
                      </h3>
                      <p className="text-xs text-brand-muted mt-1">
                        Size: <strong className="text-black">{item.size}</strong> | Color: <strong className="text-black">{item.color.name}</strong>
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-black">
                      {formatINR(item.price * item.quantity)}
                    </span>
                  </div>

                  <p className="text-xs text-brand-muted mt-1">
                    {formatINR(item.price)} each
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-100">
                  <div className="flex items-center border border-neutral-300 bg-white">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2.5 py-1 text-neutral-500 hover:text-black hover:bg-neutral-50"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      disabled={item.quantity >= item.stock}
                      className="px-2.5 py-1 text-neutral-500 hover:text-black hover:bg-neutral-50 disabled:opacity-30"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-neutral-400 hover:text-black flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Order Summary & Coupon (4 Cols) */}
        <div className="lg:col-span-4 bg-brand-soft border border-neutral-200 p-6 md:p-8 space-y-6">
          <h2 className="text-sm font-medium uppercase tracking-widest text-black pb-4 border-b border-neutral-200">
            Order Summary
          </h2>

          {/* Coupon Code Input */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-2 font-medium">
              Promotional Voucher
            </label>
            {summary.appliedCoupon ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 p-3 text-xs">
                <div>
                  <p className="font-semibold text-emerald-800">
                    Code: {summary.appliedCoupon.code}
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    {summary.appliedCoupon.description} (-{formatINR(summary.discount)})
                  </p>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-rose-600 hover:text-rose-800 text-xs font-medium underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="e.g. FORME10 or WELCOME20"
                  className="flex-1 px-3 py-2 text-xs uppercase tracking-wider bg-white border border-neutral-300 focus:outline-none focus:border-black"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Breakdown */}
          <div className="space-y-3 text-xs text-brand-muted pt-2 border-t border-neutral-200">
            <div className="flex justify-between">
              <span>Item Subtotal</span>
              <span className="text-black font-medium">{formatINR(summary.subtotal)}</span>
            </div>

            {summary.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Promotional Discount</span>
                <span>-{formatINR(summary.discount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="text-black font-medium">
                {summary.shipping === 0 ? 'Complimentary' : formatINR(summary.shipping)}
              </span>
            </div>

            <div className="flex justify-between text-[11px]">
              <span>Taxes (GST Included)</span>
              <span className="text-black">All inclusive</span>
            </div>

            <div className="pt-4 border-t border-neutral-200 flex justify-between text-base font-semibold text-black">
              <span>Grand Total</span>
              <span>{formatINR(summary.total)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/category/t-shirts"
              className="block w-full py-3 text-center border border-neutral-300 text-black text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

          <div className="pt-4 border-t border-neutral-200 text-[11px] text-neutral-500 space-y-1">
            <p>• Complimentary 15-day home pickup returns</p>
            <p>• Authentic certified organic cotton & linen</p>
          </div>
        </div>
      </div>
    </div>
  );
};
