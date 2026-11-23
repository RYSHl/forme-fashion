import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  AlertTriangle, 
  ArrowUpRight, 
  RotateCcw, 
  ExternalLink 
} from 'lucide-react';
import { productService } from '../../services/productService';
import { orderService } from '../../services/orderService';
import { formatINR, formatDate } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

export const AdminDashboard: React.FC = () => {
  const { showToast } = useToast();
  const [products, setProducts] = useState(() => productService.getAllProducts());
  const [orders] = useState(() => orderService.getAllOrders());

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const lowStockCount = products.filter(p => p.stock <= 12).length;

  // Category counts
  const tshirtsCount = products.filter(p => p.category === 't-shirts').length;
  const shirtsCount = products.filter(p => p.category === 'shirts').length;
  const pantsCount = products.filter(p => p.category === 'pants').length;
  const hoodiesCount = products.filter(p => p.category === 'hoodies').length;

  const handleResetCatalog = () => {
    if (window.confirm('Reset catalog to the default 32 factory products? This will overwrite your custom changes.')) {
      const reset = productService.resetToDefaultCatalog();
      setProducts(reset);
      showToast('Catalog Reset', 'info', 'Restored default 32 product specifications.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-neutral-200">
        <div>
          <h1 className="text-xl font-light uppercase tracking-tight text-black">
            Store Performance & Catalog Overview
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Real-time mock metrics synchronized with your local browser environment.
          </p>
        </div>
        <button
          onClick={handleResetCatalog}
          className="px-4 py-2 border border-neutral-300 text-neutral-700 text-xs uppercase tracking-wider font-semibold hover:bg-neutral-50 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Catalog</span>
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Revenue */}
        <div className="bg-white p-5 border border-neutral-200">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-medium">Demo Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-semibold text-black">{formatINR(totalRevenue)}</p>
          <span className="text-[11px] text-emerald-700 mt-1 inline-block">From {totalOrders} demo orders</span>
        </div>

        {/* Metric 2: Total Orders */}
        <div className="bg-white p-5 border border-neutral-200">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-medium">Total Orders</span>
            <ShoppingCart className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-2xl font-semibold text-black">{totalOrders}</p>
          <Link to="/admin/orders" className="text-[11px] text-neutral-600 hover:text-black mt-1 inline-block underline">
            Manage order statuses
          </Link>
        </div>

        {/* Metric 3: Active Catalog */}
        <div className="bg-white p-5 border border-neutral-200">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-medium">Catalog Products</span>
            <Package className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-semibold text-black">{totalProducts}</p>
          <Link to="/admin/products" className="text-[11px] text-neutral-600 hover:text-black mt-1 inline-block underline">
            Manage product CRUD
          </Link>
        </div>

        {/* Metric 4: Low Stock Alert */}
        <div className="bg-white p-5 border border-neutral-200">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-medium">Low Stock Items</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-semibold text-black">{lowStockCount}</p>
          <span className="text-[11px] text-amber-700 mt-1 inline-block">Stock level ≤ 12 units</span>
        </div>
      </div>

      {/* Category Breakdown & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown (2 Cols) */}
        <div className="lg:col-span-2 bg-white p-6 border border-neutral-200">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-black mb-4 pb-2 border-b">
            Category Inventory Distribution
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-brand-soft border border-neutral-200 text-center">
              <span className="text-xs uppercase tracking-wider text-brand-muted block">T-Shirts</span>
              <span className="text-xl font-bold text-black mt-1 block">{tshirtsCount}</span>
              <span className="text-[10px] text-neutral-400">Styles active</span>
            </div>
            <div className="p-4 bg-brand-soft border border-neutral-200 text-center">
              <span className="text-xs uppercase tracking-wider text-brand-muted block">Shirts</span>
              <span className="text-xl font-bold text-black mt-1 block">{shirtsCount}</span>
              <span className="text-[10px] text-neutral-400">Styles active</span>
            </div>
            <div className="p-4 bg-brand-soft border border-neutral-200 text-center">
              <span className="text-xs uppercase tracking-wider text-brand-muted block">Pants</span>
              <span className="text-xl font-bold text-black mt-1 block">{pantsCount}</span>
              <span className="text-[10px] text-neutral-400">Styles active</span>
            </div>
            <div className="p-4 bg-brand-soft border border-neutral-200 text-center">
              <span className="text-xs uppercase tracking-wider text-brand-muted block">Hoodies</span>
              <span className="text-xl font-bold text-black mt-1 block">{hoodiesCount}</span>
              <span className="text-[10px] text-neutral-400">Styles active</span>
            </div>
          </div>
        </div>

        {/* Quick Admin Actions (1 Col) */}
        <div className="bg-white p-6 border border-neutral-200 space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-black mb-4 pb-2 border-b">
            Quick Actions
          </h2>
          <Link
            to="/admin/products"
            className="w-full py-2.5 px-4 bg-black text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 flex items-center justify-between"
          >
            <span>Add New Garment</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            to="/admin/orders"
            className="w-full py-2.5 px-4 border border-neutral-300 text-black text-xs uppercase tracking-wider font-semibold hover:bg-neutral-50 flex items-center justify-between"
          >
            <span>Update Order Statuses</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            to="/"
            target="_blank"
            className="w-full py-2.5 px-4 border border-neutral-300 text-neutral-700 text-xs uppercase tracking-wider font-semibold hover:bg-neutral-50 flex items-center justify-between"
          >
            <span>View Live Storefront</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Recent Orders Overview */}
      <div className="bg-white p-6 border border-neutral-200">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-black">
            Recent Orders Activity
          </h2>
          <Link to="/admin/orders" className="text-xs uppercase tracking-wider underline text-neutral-600 hover:text-black">
            View All ({orders.length})
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-500 uppercase tracking-wider">
                <th className="py-2.5 font-medium">Order ID</th>
                <th className="py-2.5 font-medium">Customer</th>
                <th className="py-2.5 font-medium">Date</th>
                <th className="py-2.5 font-medium">Items</th>
                <th className="py-2.5 font-medium">Amount</th>
                <th className="py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {orders.slice(0, 5).map(o => (
                <tr key={o.id} className="hover:bg-neutral-50">
                  <td className="py-3 font-semibold text-black font-mono">{o.id}</td>
                  <td className="py-3 text-neutral-700">{o.shippingAddress.fullName}</td>
                  <td className="py-3 text-neutral-500">{formatDate(o.date)}</td>
                  <td className="py-3 text-neutral-600">{o.items.length} items</td>
                  <td className="py-3 font-semibold text-black">{formatINR(o.total)}</td>
                  <td className="py-3">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 ${
                      o.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                      o.status === 'shipped' ? 'bg-sky-100 text-sky-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {o.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
