import { Product, ProductColor, ProductSize } from './product';

export interface CartItem {
  id: string; // generated unique id for variant
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  size: ProductSize;
  color: ProductColor;
  image: string;
  quantity: number;
  stock: number;
  product?: Product;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minSpend?: number;
  description: string;
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  appliedCoupon: Coupon | null;
  shipping: number;
  estimatedTax: number;
  total: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
}
