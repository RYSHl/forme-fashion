import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { SizeGuideModal } from '../product/SizeGuideModal';

export const Layout: React.FC = () => {
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-brand-text">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet context={{ onOpenSizeGuide: () => setIsSizeGuideOpen(true) }} />
      </main>
      <Footer onOpenSizeGuide={() => setIsSizeGuideOpen(true)} />
      
      {/* Global Drawers & Modals */}
      <CartDrawer />
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
};
