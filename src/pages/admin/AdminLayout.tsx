import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, ArrowLeft, Shield } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col text-neutral-900 font-sans">
      {/* Admin Top Header */}
      <header className="bg-neutral-900 text-white px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-neutral-800">
        <div className="flex items-center space-x-3">
          <Link to="/" className="text-lg font-light tracking-[0.2em] uppercase font-sans">
            FORME
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-widest bg-neutral-800 text-amber-400 px-2 py-0.5 border border-neutral-700 flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Admin Console (Prototype)</span>
          </span>
        </div>

        <Link
          to="/"
          className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Storefront</span>
        </Link>
      </header>

      {/* Admin Navigation Bar */}
      <div className="bg-white border-b border-neutral-200 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex space-x-8">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `py-3.5 text-xs uppercase tracking-wider font-semibold border-b-2 flex items-center gap-2 transition-colors ${
                isActive
                  ? 'border-black text-black'
                  : 'border-transparent text-neutral-500 hover:text-black'
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview & Metrics</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `py-3.5 text-xs uppercase tracking-wider font-semibold border-b-2 flex items-center gap-2 transition-colors ${
                isActive
                  ? 'border-black text-black'
                  : 'border-transparent text-neutral-500 hover:text-black'
              }`
            }
          >
            <Package className="w-4 h-4" />
            <span>Product Catalog CRUD</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `py-3.5 text-xs uppercase tracking-wider font-semibold border-b-2 flex items-center gap-2 transition-colors ${
                isActive
                  ? 'border-black text-black'
                  : 'border-transparent text-neutral-500 hover:text-black'
              }`
            }
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Order Management</span>
          </NavLink>
        </div>
      </div>

      {/* Main Admin Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        <Outlet />
      </main>
    </div>
  );
};
