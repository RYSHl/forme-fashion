import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/formatters';

export const CartDrawer: React.FC = () => {
  const {
    items,
    summary,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    closeCart();
    navigate('/cart');
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const ok = applyCoupon(couponCode);
    if (ok) setCouponCode('');
  };

  const progressPercent = Math.min(100, (summary.subtotal / summary.freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white flex flex-col shadow-2xl border-l border-brand-border">
          {/* Header */}
          <div className="p-5 border-b border-brand-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-medium uppercase tracking-widest text-brand-text">Shopping Bag</h2>
              <span className="text-xs text-brand-muted">({items.reduce((s, i) => s + i.quantity, 0)})</span>
            </div>
            <button
              onClick={closeCart}
              className="p-1 text-neutral-500 hover:text-black transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-5 py-3 bg-brand-soft border-b border-brand-border">
            {summary.amountNeededForFreeShipping > 0 ? (
              <p className="text-xs text-brand-muted mb-1.5">
                Add <span className="font-medium text-brand-text">{formatINR(summary.amountNeededForFreeShipping)}</span> more for <strong>Complimentary Shipping</strong>
              </p>
            ) : (
              <p className="text-xs text-emerald-700 font-medium mb-1.5 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 inline" /> You've unlocked Complimentary Express Delivery!
              </p>
            )}
            <div className="w-full bg-neutral-200 h-1.5 rounded-none overflow-hidden">
              <div
                className="bg-black h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 border border-dashed border-neutral-300 flex items-center justify-center mb-4 text-neutral-400">
                  <Tag className="w-6 h-6 stroke-[1.5]" />
                </div>
                <p className="text-sm font-medium uppercase tracking-wider text-brand-text mb-1">Your bag is empty</p>
                <p className="text-xs text-brand-muted max-w-xs mb-6">
                  Explore our curated seasonal collections of shirts, tees, trousers, and heavyweight hoodies.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/category/t-shirts');
                  }}
                  className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="py-4 first:pt-0 flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover bg-neutral-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-xs font-medium text-brand-text line-clamp-1">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-400 hover:text-black transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-brand-muted mt-0.5">
                        {item.size} / {item.color.name}
                      </p>
                      <p className="text-xs font-medium text-brand-text mt-1">
                        {formatINR(item.price * item.quantity)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-neutral-300">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1 text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          disabled={item.quantity >= item.stock}
                          className="px-2 py-1 text-neutral-500 hover:text-black hover:bg-neutral-100 disabled:opacity-30 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      {item.stock <= 3 && (
                        <span className="text-[10px] text-amber-700 tracking-wider uppercase">Only {item.stock} left</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Calculations */}
          {items.length > 0 && (
            <div className="p-5 border-t border-brand-border bg-white">
              {/* Coupon Form */}
              <div className="mb-4">
                {summary.appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs">
                    <span className="text-emerald-800 font-medium">
                      Code "{summary.appliedCoupon.code}" applied (-{formatINR(summary.discount)})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-800 hover:text-black underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Promo code (e.g. FORME10)"
                      className="flex-1 px-3 py-1.5 text-xs border border-neutral-300 focus:outline-none focus:border-black uppercase tracking-wider"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-neutral-900 text-white text-xs uppercase tracking-wider hover:bg-black"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-brand-muted mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-brand-text font-medium">{formatINR(summary.subtotal)}</span>
                </div>
                {summary.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span>-{formatINR(summary.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-brand-text font-medium">
                    {summary.shipping === 0 ? 'Complimentary' : formatINR(summary.shipping)}
                  </span>
                </div>
                <div className="border-t border-neutral-200 pt-2 flex justify-between text-sm font-semibold text-brand-text">
                  <span>Total (Incl. all taxes)</span>
                  <span>{formatINR(summary.total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-black text-white text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleViewCart}
                  className="w-full py-2.5 border border-neutral-300 text-brand-text text-xs uppercase tracking-widest font-medium hover:bg-neutral-50 transition-colors"
                >
                  View Full Bag
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
