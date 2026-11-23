import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Package, 
  Heart, 
  LogOut, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { orderService } from '../services/orderService';
import { formatINR, formatDate } from '../utils/formatters';
import { ShippingAddress } from '../types/order';

export const Account: React.FC = () => {
  const { user, isAuthenticated, logout, updateProfile, addAddress, removeAddress } = useAuth();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  // Edit profile states
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');

  // Add address modal state
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newAddress, setNewAddress] = useState<ShippingAddress>({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    isDefault: false,
  });

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <h2 className="text-xl font-light uppercase tracking-widest mb-3">Sign In Required</h2>
        <p className="text-xs text-brand-muted mb-6">Please log in to view your account dashboard and past orders.</p>
        <Link to="/login" className="px-8 py-3 bg-black text-white text-xs uppercase tracking-widest font-semibold">
          Sign In
        </Link>
      </div>
    );
  }

  const allOrders = orderService.getAllOrders();

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileName,
      phone: profilePhone,
    });
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(newAddress);
    setIsAddAddressOpen(false);
    setNewAddress({
      fullName: user.name,
      email: user.email,
      phone: user.phone || '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
      isDefault: false,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-neutral-200 mb-8 gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-brand-muted">Client Account</span>
          <h1 className="text-2xl sm:text-3xl font-light uppercase tracking-tight text-black mt-1">
            Welcome, {user.name}
          </h1>
          <p className="text-xs text-brand-muted mt-1">{user.email}</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/wishlist"
            className="px-4 py-2 border border-neutral-300 text-xs uppercase tracking-wider font-medium text-black hover:bg-neutral-50 flex items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 text-neutral-600" />
            <span>Wishlist ({wishlistCount})</span>
          </Link>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="px-4 py-2 border border-neutral-300 text-xs uppercase tracking-wider font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Demo notice banner */}
      <div className="mb-8 p-3.5 bg-brand-soft border border-neutral-200 flex items-center gap-2.5 text-xs text-neutral-600">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>
          <strong>Interactive Demo Session:</strong> Your order history and saved delivery addresses are stored in local storage and will update in real-time as you test the checkout flow.
        </span>
      </div>

      {/* Layout Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar (3 Cols) */}
        <div className="lg:col-span-3 space-y-1 border-b lg:border-b-0 lg:border-r border-neutral-200 pb-6 lg:pb-0 lg:pr-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider font-medium text-left transition-colors ${
              activeTab === 'orders' ? 'bg-black text-white' : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4" />
              <span>Order History ({allOrders.length})</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider font-medium text-left transition-colors ${
              activeTab === 'addresses' ? 'bg-black text-white' : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4" />
              <span>Address Book ({user.savedAddresses.length})</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider font-medium text-left transition-colors ${
              activeTab === 'profile' ? 'bg-black text-white' : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4" />
              <span>Personal Details</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tab Content (9 Cols) */}
        <div className="lg:col-span-9">
          {/* TAB 1: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-sm font-medium uppercase tracking-widest text-black pb-3 border-b border-neutral-200">
                Past Orders & Tracking
              </h2>

              {allOrders.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-neutral-200">
                  <p className="text-xs text-brand-muted mb-4">You have not placed any orders yet.</p>
                  <Link to="/category/t-shirts" className="px-6 py-2 bg-black text-white text-xs uppercase tracking-wider">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {allOrders.map((order) => (
                    <div key={order.id} className="border border-neutral-200 bg-white p-5 sm:p-6 space-y-4">
                      {/* Top order bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-2">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-black">{order.id}</span>
                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 ${
                              order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                              order.status === 'shipped' ? 'bg-sky-100 text-sky-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {order.status.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-[11px] text-brand-muted mt-1">
                            Placed on {formatDate(order.date)}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-black">
                            {formatINR(order.total)}
                          </span>
                          <Link
                            to={`/orders/${order.id}`}
                            className="px-3 py-1.5 bg-neutral-900 text-white text-[11px] uppercase tracking-wider font-semibold hover:bg-black flex items-center gap-1"
                          >
                            <span>Track Order</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>

                      {/* Items Preview */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-3 items-center bg-brand-soft p-2 border border-neutral-100">
                            <img src={item.image} alt={item.name} className="w-12 h-14 object-cover bg-neutral-200 shrink-0" />
                            <div className="min-w-0">
                              <p className="text-xs font-medium text-black truncate">{item.name}</p>
                              <p className="text-[11px] text-brand-muted">{item.size} • {item.color.name} (x{item.quantity})</p>
                              <p className="text-[11px] font-medium text-black">{formatINR(item.price * item.quantity)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Delivery Address summary */}
                      <div className="text-[11px] text-brand-muted pt-2 flex flex-col sm:flex-row justify-between border-t border-neutral-100">
                        <span>Delivering to: {order.shippingAddress.fullName}, {order.shippingAddress.city} - {order.shippingAddress.pincode}</span>
                        <span>Tracking: {order.trackingNumber}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ADDRESS BOOK */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <h2 className="text-sm font-medium uppercase tracking-widest text-black">
                  Saved Delivery Addresses
                </h2>
                <button
                  type="button"
                  onClick={() => setIsAddAddressOpen(true)}
                  className="px-3 py-1.5 bg-black text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              {user.savedAddresses.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-neutral-200 text-xs text-brand-muted">
                  No addresses saved yet. Click "Add New Address" above.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.savedAddresses.map((addr, idx) => (
                    <div key={idx} className="border border-neutral-200 p-5 bg-white relative flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-xs text-black">{addr.fullName}</span>
                          {addr.isDefault && (
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-neutral-100 text-neutral-800">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {addr.addressLine1}
                          {addr.addressLine2 && <><br />{addr.addressLine2}</>}
                          <br />{addr.city}, {addr.state} - {addr.pincode}
                          <br />{addr.country}
                        </p>
                        <p className="text-xs text-brand-muted mt-2">
                          Phone: {addr.phone}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-neutral-100 mt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeAddress(idx)}
                          className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Address Modal */}
              {isAddAddressOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                  <div className="bg-white p-6 md:p-8 max-w-lg w-full border border-neutral-200 shadow-2xl">
                    <h3 className="text-sm font-medium uppercase tracking-widest text-black mb-4 pb-2 border-b">
                      Add Delivery Address
                    </h3>
                    <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
                      <div>
                        <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Full Name</label>
                        <input
                          type="text"
                          required
                          value={newAddress.fullName}
                          onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                          className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-black"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Email</label>
                          <input
                            type="email"
                            required
                            value={newAddress.email}
                            onChange={(e) => setNewAddress({ ...newAddress, email: e.target.value })}
                            className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-black"
                          />
                        </div>
                        <div>
                          <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Phone</label>
                          <input
                            type="tel"
                            required
                            value={newAddress.phone}
                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-black"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Street Address</label>
                        <input
                          type="text"
                          required
                          value={newAddress.addressLine1}
                          onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                          placeholder="Building, street, apartment"
                          className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-black"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">City</label>
                          <input
                            type="text"
                            required
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-black"
                          />
                        </div>
                        <div>
                          <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">State</label>
                          <input
                            type="text"
                            required
                            value={newAddress.state}
                            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                            className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-black"
                          />
                        </div>
                        <div>
                          <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">PIN Code</label>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            value={newAddress.pincode}
                            onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                            className="w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:border-black"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setIsAddAddressOpen(false)}
                          className="flex-1 py-2.5 border border-neutral-300 uppercase tracking-wider font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2.5 bg-black text-white uppercase tracking-wider font-semibold hover:bg-neutral-800"
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PERSONAL DETAILS */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-lg">
              <h2 className="text-sm font-medium uppercase tracking-widest text-black pb-3 border-b border-neutral-200">
                Personal Information
              </h2>
              <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 border border-neutral-300 focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Email Address</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-2.5 border border-neutral-200 bg-neutral-100 text-neutral-500 cursor-not-allowed"
                  />
                  <p className="text-[10px] text-neutral-400 mt-1">Email is tied to your client ID.</p>
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-neutral-600 mb-1 font-medium">Mobile Phone</label>
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 border border-neutral-300 focus:outline-none focus:border-black"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
