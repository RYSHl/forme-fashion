import React, { useState } from 'react';
import { 
  Search, 
  Eye, 
  X 
} from 'lucide-react';
import { orderService } from '../../services/orderService';
import { Order, OrderStatus } from '../../types/order';
import { formatINR, formatDate } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

const ALL_STATUSES: OrderStatus[] = [
  'placed',
  'confirmed',
  'processing',
  'shipped',
  'out_for_delivery',
  'delivered',
  'cancelled'
];

export const AdminOrders: React.FC = () => {
  const { showToast } = useToast();
  const [orders, setOrders] = useState<Order[]>(() => orderService.getAllOrders());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.shippingAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.shippingAddress.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updated = orderService.updateOrderStatus(orderId, newStatus);
    setOrders(orderService.getAllOrders());
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(updated);
    }
    showToast(`Order Status Updated`, 'success', `Order ${orderId} marked as ${newStatus}.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 border border-neutral-200">
        <h1 className="text-xl font-light uppercase tracking-tight text-black">
          Order Fulfillment & Status Lifecycle
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Monitor incoming customer orders, dispatch timelines, and advance mock shipment stages.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 border border-neutral-200 flex flex-col sm:flex-row gap-4 justify-between items-center text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order ID, customer name, email..."
            className="w-full pl-9 pr-3 py-2 border border-neutral-300 focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="uppercase tracking-wider text-neutral-500 text-[11px]">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-neutral-300 bg-white uppercase tracking-wider font-medium cursor-pointer"
          >
            <option value="all">All Orders ({orders.length})</option>
            {ALL_STATUSES.map(s => (
              <option key={s} value={s}>{s.replace('_', ' ')}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-neutral-200 overflow-x-auto shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase tracking-wider">
              <th className="py-3 px-4 font-semibold">Order Ref</th>
              <th className="py-3 px-4 font-semibold">Customer Details</th>
              <th className="py-3 px-4 font-semibold">City & State</th>
              <th className="py-3 px-4 font-semibold">Order Date</th>
              <th className="py-3 px-4 font-semibold">Total Amount</th>
              <th className="py-3 px-4 font-semibold">Status Stage</th>
              <th className="py-3 px-4 font-semibold text-right">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                <td className="py-3.5 px-4 font-mono font-semibold text-black">
                  {order.id}
                </td>
                <td className="py-3.5 px-4">
                  <p className="font-semibold text-black">{order.shippingAddress.fullName}</p>
                  <p className="text-[11px] text-neutral-500">{order.shippingAddress.email}</p>
                </td>
                <td className="py-3.5 px-4 text-neutral-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </td>
                <td className="py-3.5 px-4 text-neutral-500">
                  {formatDate(order.date)}
                </td>
                <td className="py-3.5 px-4 font-semibold text-black">
                  {formatINR(order.total)}
                </td>
                <td className="py-3.5 px-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                    className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-bold border cursor-pointer ${
                      order.status === 'delivered' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                      order.status === 'shipped' ? 'bg-sky-50 text-sky-800 border-sky-300' :
                      order.status === 'cancelled' ? 'bg-rose-50 text-rose-800 border-rose-300' :
                      'bg-amber-50 text-amber-800 border-amber-300'
                    }`}
                  >
                    {ALL_STATUSES.map(st => (
                      <option key={st} value={st}>{st.replace('_', ' ')}</option>
                    ))}
                  </select>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                    title="View order details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="p-12 text-center text-brand-muted text-xs">
            No customer orders found matching your search.
          </div>
        )}
      </div>

      {/* ORDER INSPECTOR MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white p-6 md:p-8 max-w-2xl w-full border border-neutral-300 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400">Order Inspection</span>
                <h2 className="text-base font-semibold text-black font-mono">
                  {selectedOrder.id}
                </h2>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-neutral-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-xs">
              {/* Status Update Control */}
              <div className="p-4 bg-brand-soft border border-neutral-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">Current Status</span>
                  <span className="font-bold text-sm uppercase text-black">{selectedOrder.status.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-600">Advance Stage:</span>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                    className="px-3 py-1.5 border border-black bg-white uppercase font-bold text-xs"
                  >
                    {ALL_STATUSES.map(st => (
                      <option key={st} value={st}>{st.replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Customer & Address Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-neutral-200 space-y-1">
                  <h4 className="font-semibold uppercase tracking-wider text-black pb-1 border-b mb-1">
                    Customer Information
                  </h4>
                  <p><strong>Name:</strong> {selectedOrder.shippingAddress.fullName}</p>
                  <p><strong>Email:</strong> {selectedOrder.shippingAddress.email}</p>
                  <p><strong>Phone:</strong> {selectedOrder.shippingAddress.phone}</p>
                </div>

                <div className="p-4 border border-neutral-200 space-y-1">
                  <h4 className="font-semibold uppercase tracking-wider text-black pb-1 border-b mb-1">
                    Shipping Destination
                  </h4>
                  <p>{selectedOrder.shippingAddress.addressLine1}</p>
                  {selectedOrder.shippingAddress.addressLine2 && <p>{selectedOrder.shippingAddress.addressLine2}</p>}
                  <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}</p>
                  <p><strong>Carrier Tracking:</strong> {selectedOrder.trackingNumber}</p>
                </div>
              </div>

              {/* Items Table */}
              <div>
                <h4 className="font-semibold uppercase tracking-widest text-black mb-3">
                  Garments in Package ({selectedOrder.items.length})
                </h4>
                <div className="divide-y divide-neutral-200 border border-neutral-200">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-14 object-cover bg-neutral-100" />
                        <div>
                          <p className="font-medium text-black">{item.name}</p>
                          <p className="text-[11px] text-neutral-500">
                            Size: {item.size} • Color: {item.color.name} • Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-black">
                        {formatINR(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="space-y-1 text-right border-t border-neutral-200 pt-3">
                <p>Subtotal: <strong className="text-black">{formatINR(selectedOrder.subtotal)}</strong></p>
                {selectedOrder.discount > 0 && <p className="text-emerald-700">Discount: -{formatINR(selectedOrder.discount)}</p>}
                <p>Shipping: <strong className="text-black">{selectedOrder.shippingFee === 0 ? 'Free' : formatINR(selectedOrder.shippingFee)}</strong></p>
                <p className="text-sm font-bold text-black pt-1">Total: {formatINR(selectedOrder.total)}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-wider font-semibold"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
