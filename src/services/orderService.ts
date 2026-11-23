import { Order, OrderStatus } from '../types/order';
import { INITIAL_ORDERS } from '../data/mockOrders';
import { generateOrderId } from '../utils/formatters';
import { productService } from './productService';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const ORDERS_STORAGE_KEY = 'forme_orders';

export const orderService = {
  getAllOrders: (): Order[] => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to read orders from localStorage, using initial', e);
    }
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ORDERS;
  },

  getOrderById: (id: string): Order | undefined => {
    const orders = orderService.getAllOrders();
    return orders.find(o => o.id === id);
  },

  createOrder: (orderData: Omit<Order, 'id' | 'date' | 'status' | 'timeline' | 'trackingNumber'>): Order => {
    const orders = orderService.getAllOrders();
    const newId = generateOrderId();
    const now = new Date();
    const trackingCode = `DELHIVERY-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrder: Order = {
      ...orderData,
      id: newId,
      date: now.toISOString(),
      status: 'placed',
      trackingNumber: trackingCode,
      timeline: [
        {
          status: 'placed',
          label: 'Order Placed',
          timestamp: `${now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          description: 'Demo order successfully registered in warehouse queue',
          completed: true,
          current: true,
        },
        {
          status: 'confirmed',
          label: 'Payment Verified',
          timestamp: 'Pending verification',
          description: 'Authorized via demo payment gateway',
          completed: false,
        },
        {
          status: 'processing',
          label: 'Packing',
          timestamp: 'Expected within 24h',
          description: 'Eco-conscious packaging with biodegradable protective wrap',
          completed: false,
        },
        {
          status: 'shipped',
          label: 'Shipped',
          timestamp: 'Expected in 1-2 days',
          description: 'Handed over to carrier',
          completed: false,
        },
        {
          status: 'delivered',
          label: 'Delivered',
          timestamp: orderData.deliveryMethod.id === 'express' ? 'Expected in 2 days' : 'Expected in 3-5 days',
          description: 'Delivery at doorstep',
          completed: false,
        }
      ]
    };

    const updated = [newOrder, ...orders];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));

    // 1. Immediately deduct purchased stock from product inventory (Local + Cloud)
    if (orderData.items && orderData.items.length > 0) {
      productService.reduceStockForOrder(orderData.items);
    }

    // 2. Async save order to Supabase if configured
    if (isSupabaseConfigured() && supabase) {
      supabase
        .from('orders')
        .insert({
          id: newOrder.id,
          date: newOrder.date,
          items: newOrder.items,
          shipping_address: newOrder.shippingAddress,
          delivery_method: newOrder.deliveryMethod,
          payment_method: newOrder.paymentMethod,
          payment_status: newOrder.paymentStatus,
          subtotal: newOrder.subtotal,
          discount: newOrder.discount,
          shipping_fee: newOrder.shippingFee,
          total: newOrder.total,
          status: newOrder.status,
          timeline: newOrder.timeline,
          tracking_number: newOrder.trackingNumber,
          notes: newOrder.notes,
        })
        .then(({ error }) => {
          if (error) console.warn('Supabase order insert note:', error.message);
        });
    }

    return newOrder;
  },

  updateOrderStatus: (orderId: string, newStatus: OrderStatus): Order => {
    const orders = orderService.getAllOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index === -1) {
      throw new Error(`Order ${orderId} not found`);
    }

    const order = orders[index];
    const statuses: OrderStatus[] = ['placed', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered'];
    const newStatusIdx = statuses.indexOf(newStatus);

    const updatedTimeline = order.timeline.map((event) => {
      const eventIdx = statuses.indexOf(event.status);
      if (newStatus === 'cancelled') {
        return {
          ...event,
          completed: event.status === 'placed',
          current: false,
        };
      }
      return {
        ...event,
        completed: eventIdx <= newStatusIdx,
        current: eventIdx === newStatusIdx,
      };
    });

    const updatedOrder: Order = {
      ...order,
      status: newStatus,
      timeline: updatedTimeline,
    };

    orders[index] = updatedOrder;
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return updatedOrder;
  }
};
