import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CartSummary, Coupon } from '../types/cart';
import { cartService } from '../services/cartService';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  summary: CartSummary;
  itemCount: number;
  isCartOpen: boolean;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (id: string, deltaOrValue: number, isAbsolute?: boolean) => void;
  removeFromCart: (id: string) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => cartService.getItems());
  const [coupon, setCoupon] = useState<Coupon | null>(() => cartService.getAppliedCoupon());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { showToast } = useToast();

  const summary = cartService.calculateSummary(items, coupon);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    cartService.saveItems(items);
  }, [items]);

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    // Generate unique ID for this specific product + size + color combination
    const variantId = `${newItem.productId}-${newItem.size}-${newItem.color.name.replace(/\s+/g, '').toLowerCase()}`;

    setItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === variantId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const currentQty = updated[existingIndex].quantity;
        const newQty = Math.min(newItem.stock, currentQty + newItem.quantity);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        const itemWithId: CartItem = {
          ...newItem,
          id: variantId,
        };
        return [...prev, itemWithId];
      }
    });

    showToast(`Added to Bag`, 'success', `${newItem.name} (${newItem.size} / ${newItem.color.name})`);
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, deltaOrValue: number, isAbsolute: boolean = false) => {
    setItems(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = isAbsolute ? deltaOrValue : item.quantity + deltaOrValue;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: Math.min(item.stock, newQty),
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (id: string) => {
    const itemToRemove = items.find(i => i.id === id);
    setItems(prev => prev.filter(i => i.id !== id));
    if (itemToRemove) {
      showToast('Removed from Bag', 'info', itemToRemove.name);
    }
  };

  const applyCoupon = (code: string): boolean => {
    const result = cartService.applyCoupon(code);
    if (result.success && result.coupon) {
      setCoupon(result.coupon);
      showToast('Promo Code Applied', 'success', result.message);
      return true;
    } else {
      showToast('Invalid Code', 'error', result.message);
      return false;
    }
  };

  const removeCoupon = () => {
    cartService.removeCoupon();
    setCoupon(null);
    showToast('Promo Code Removed', 'info');
  };

  const clearCart = () => {
    cartService.clearCart();
    setItems([]);
    setCoupon(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        items,
        summary,
        itemCount,
        isCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        applyCoupon,
        removeCoupon,
        clearCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
