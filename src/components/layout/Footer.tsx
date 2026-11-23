import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface FooterProps {
  onOpenSizeGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSizeGuide }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Mock newsletter subscription
    setIsSubmitted(true);
    showToast('Subscribed to FORME Editorial', 'success', 'You will receive seasonal drops and private previews.');
    setEmail('');
  };

  return (
    <footer className="bg-brand-soft border-t border-brand-border text-brand-text pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="pb-16 border-b border-neutral-200">
          <div className="max-w-xl">
            <span className="text-[11px] uppercase tracking-widest text-brand-muted block mb-2">Editorial Club</span>
            <h3 className="text-xl md:text-2xl font-light tracking-wide uppercase text-brand-text mb-2">
              Stay in the Realm of Modern Essentials
            </h3>
            <p className="text-xs text-brand-muted mb-6 leading-relaxed">
              Subscribe to receive private preview access to seasonal releases, editorial features, and exclusive members-only offers.
            </p>

            {isSubmitted ? (
              <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Thank you. Your email has been added to the FORME seasonal roster.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-black placeholder-neutral-400"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-black text-white text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {error && <p className="text-xs text-rose-600">{error}</p>}
                <p className="text-[11px] text-neutral-400">
                  By subscribing, you agree to our Privacy Policy and Terms of Use.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-neutral-200 text-xs">
          {/* Column 1: Shop */}
          <div>
            <h4 className="uppercase tracking-widest font-medium text-black mb-4">Shop Collections</h4>
            <ul className="space-y-2.5 text-brand-muted">
              <li>
                <Link to="/category/t-shirts" className="hover:text-black transition-colors">
                  T-Shirts & Tanks
                </Link>
              </li>
              <li>
                <Link to="/category/shirts" className="hover:text-black transition-colors">
                  Linen & Oxford Shirts
                </Link>
              </li>
              <li>
                <Link to="/category/pants" className="hover:text-black transition-colors">
                  Pleated Pants & Chinos
                </Link>
              </li>
              <li>
                <Link to="/category/hoodies" className="hover:text-black transition-colors">
                  450 GSM Heavy Hoodies
                </Link>
              </li>
              <li>
                <Link to="/search?q=new" className="hover:text-black transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/search?q=bestseller" className="hover:text-black transition-colors">
                  Curated Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h4 className="uppercase tracking-widest font-medium text-black mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-brand-muted">
              <li>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="hover:text-black transition-colors text-left"
                >
                  Size & Fit Guide
                </button>
              </li>
              <li>
                <Link to="/account" className="hover:text-black transition-colors">
                  Track Demo Order
                </Link>
              </li>
              <li>
                <span className="cursor-default">Shipping & Delivery (India)</span>
              </li>
              <li>
                <span className="cursor-default">Complimentary 15-Day Returns</span>
              </li>
              <li>
                <span className="cursor-default">Garment Care & Longevity</span>
              </li>
              <li>
                <span className="cursor-default">support@forme-brand.com</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Brand */}
          <div>
            <h4 className="uppercase tracking-widest font-medium text-black mb-4">The Brand</h4>
            <ul className="space-y-2.5 text-brand-muted">
              <li>
                <span className="cursor-default">Design Philosophy</span>
              </li>
              <li>
                <span className="cursor-default">Sustainable Combed Fibers</span>
              </li>
              <li>
                <span className="cursor-default">Flagship Studios: Mumbai / Bengaluru</span>
              </li>
              <li>
                <Link to="/admin" className="text-black font-semibold hover:underline flex items-center gap-1.5 mt-2">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Prototype Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Currency */}
          <div>
            <h4 className="uppercase tracking-widest font-medium text-black mb-4">Legal & Region</h4>
            <ul className="space-y-2.5 text-brand-muted">
              <li>
                <span className="cursor-default">Privacy Policy</span>
              </li>
              <li>
                <span className="cursor-default">Terms & Conditions</span>
              </li>
              <li>
                <span className="cursor-default">Cookie Preferences</span>
              </li>
              <li className="pt-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-neutral-300 text-neutral-800 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>India (INR ₹)</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} FORME APPAREL STUDIO. ALL RIGHTS RESERVED.</p>
          <p className="text-center md:text-right">
            Inspired by European & international minimalist fashion architecture. Built with clean code for production readiness.
          </p>
        </div>
      </div>
    </footer>
  );
};
