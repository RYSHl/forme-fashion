import { CartItem, CartSummary, Coupon } from '../types/cart';
import { calculateDiscount } from '../utils/formatters';

const CART_STORAGE_KEY = 'forme_cart_items';
const COUPON_STORAGE_KEY = 'forme_applied_coupon';

export const VALID_COUPONS: Coupon[] = [
  {
    code: 'FORME10',
    discountPercent: 10,
    description: '10% off on all items across the store',
  },
  {
    code: 'WELCOME20',
    discountPercent: 20,
    description: '20% off welcome discount for new season members',
  },
];

export const FREE_SHIPPING_THRESHOLD = 1999;
export const STANDARD_SHIPPING_FEE = 150;

export const cartService = {
  getItems: (): CartItem[] => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to load cart', e);
      return [];
    }
  },

  saveItems: (items: CartItem[]): void => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  },

  getAppliedCoupon: (): Coupon | null => {
    try {
      const stored = localStorage.getItem(COUPON_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  },

  applyCoupon: (code: string): { success: boolean; coupon?: Coupon; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const match = VALID_COUPONS.find(c => c.code === cleanCode);
    if (!match) {
      return {
        success: false,
        message: 'Invalid promo code. Try "FORME10" or "WELCOME20".',
      };
    }
    localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(match));
    return {
      success: true,
      coupon: match,
      message: `Coupon "${match.code}" applied! ${match.description}.`,
    };
  },

  removeCoupon: (): void => {
    localStorage.removeItem(COUPON_STORAGE_KEY);
  },

  calculateSummary: (items: CartItem[], coupon: Coupon | null): CartSummary => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = coupon ? calculateDiscount(subtotal, coupon.code) : 0;
    
    // Free shipping if subtotal - discount >= 1999 or items empty
    const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
    const shipping = items.length === 0 ? 0 : qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
    const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const estimatedTax = 0; // Prices in INR are all-inclusive (GST included)
    const total = Math.max(0, subtotal - discount + shipping);

    return {
      subtotal,
      discount,
      appliedCoupon: coupon,
      shipping,
      estimatedTax,
      total,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      amountNeededForFreeShipping,
    };
  },

  clearCart: (): void => {
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(COUPON_STORAGE_KEY);
  }
};
