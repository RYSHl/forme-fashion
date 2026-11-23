import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, Shield } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { SearchOverlay } from '../search/SearchOverlay';

export const Header: React.FC = () => {
  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'T-Shirts', path: '/category/t-shirts' },
    { label: 'Shirts', path: '/category/shirts' },
    { label: 'Pants', path: '/category/pants' },
    { label: 'Hoodies', path: '/category/hoodies' },
  ];

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-300 border-b ${
          isScrolled ? 'border-brand-border py-3 shadow-xs' : 'border-neutral-200 py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 text-brand-text hover:text-black transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.25em] text-black font-sans uppercase select-none hover:opacity-80 transition-opacity"
              >
                FORME
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs uppercase tracking-widest font-medium transition-colors relative py-1 ${
                      isActive
                        ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-black'
                        : 'text-neutral-600 hover:text-black'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right Header Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-neutral-700 hover:text-black transition-colors"
                aria-label="Open search"
              >
                <Search className="w-4 h-4 md:w-4.5 md:h-4.5 stroke-[1.75]" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="p-2 text-neutral-700 hover:text-black transition-colors relative"
                aria-label={`Wishlist (${wishlistCount} items)`}
              >
                <Heart className="w-4 h-4 md:w-4.5 md:h-4.5 stroke-[1.75]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-[9px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Trigger */}
              <button
                onClick={openCart}
                className="p-2 text-neutral-700 hover:text-black transition-colors relative"
                aria-label={`Shopping bag (${itemCount} items)`}
              >
                <ShoppingBag className="w-4 h-4 md:w-4.5 md:h-4.5 stroke-[1.75]" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-[9px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 text-neutral-700 hover:text-black transition-colors flex items-center gap-1"
                  aria-label="User account menu"
                >
                  <User className="w-4 h-4 md:w-4.5 md:h-4.5 stroke-[1.75]" />
                </button>

                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-brand-border shadow-xl z-40 py-2 divide-y divide-neutral-100">
                      {isAuthenticated ? (
                        <>
                          <div className="px-4 py-2">
                            <p className="text-xs font-medium text-black line-clamp-1">{user?.name}</p>
                            <p className="text-[11px] text-brand-muted line-clamp-1">{user?.email}</p>
                            {isAdmin && (
                              <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-neutral-100 text-neutral-800">
                                Admin Mode
                              </span>
                            )}
                          </div>
                          <div className="py-1">
                            <Link
                              to="/account"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-black"
                            >
                              My Account & Orders
                            </Link>
                            <Link
                              to="/wishlist"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 hover:text-black"
                            >
                              Saved Items ({wishlistCount})
                            </Link>
                            <Link
                              to="/admin"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 text-xs text-black font-semibold hover:bg-neutral-50 flex items-center gap-1.5"
                            >
                              <Shield className="w-3.5 h-3.5 text-neutral-700" />
                              <span>Admin Dashboard</span>
                            </Link>
                          </div>
                          <div className="py-1">
                            <button
                              onClick={() => {
                                setIsUserMenuOpen(false);
                                logout();
                              }}
                              className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-neutral-50"
                            >
                              Sign Out
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="py-1">
                          <Link
                            to="/login"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="block px-4 py-2 text-xs text-black font-medium hover:bg-neutral-50"
                          >
                            Sign In
                          </Link>
                          <Link
                            to="/register"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="block px-4 py-2 text-xs text-neutral-600 hover:bg-neutral-50"
                          >
                            Create Account
                          </Link>
                          <div className="border-t border-neutral-100 my-1 pt-1">
                            <Link
                              to="/admin"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-4 py-2 text-xs text-neutral-800 hover:bg-neutral-50 flex items-center gap-1.5"
                            >
                              <Shield className="w-3.5 h-3.5" />
                              <span>Admin Demo</span>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-brand-border bg-white px-4 pt-3 pb-6 space-y-3">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={handleMobileNavClick}
                  className={({ isActive }) =>
                    `block py-2 text-sm uppercase tracking-wider ${
                      isActive ? 'font-semibold text-black' : 'text-neutral-600'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-100 space-y-2 text-xs">
              <Link
                to="/account"
                onClick={handleMobileNavClick}
                className="block py-1.5 text-neutral-700"
              >
                My Account
              </Link>
              <Link
                to="/wishlist"
                onClick={handleMobileNavClick}
                className="block py-1.5 text-neutral-700"
              >
                Wishlist ({wishlistCount})
              </Link>
              <Link
                to="/admin"
                onClick={handleMobileNavClick}
                className="block py-1.5 text-black font-semibold flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
