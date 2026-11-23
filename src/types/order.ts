import { CartItem } from './cart';

export type OrderStatus = 'placed' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault?: boolean;
}

export interface DeliveryMethod {
  id: 'standard' | 'express';
  name: string;
  description: string;
  cost: number;
  estimatedDays: string;
}

export interface OrderStatusEvent {
  status: OrderStatus;
  label: string;
  timestamp: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string; // e.g. FRM-84920
  date: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  deliveryMethod: DeliveryMethod;
  paymentMethod: string;
  paymentStatus: 'demo_authorized' | 'pending' | 'completed';
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  status: OrderStatus;
  timeline: OrderStatusEvent[];
  trackingNumber: string;
  notes?: string;
}
