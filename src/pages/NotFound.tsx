import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 md:py-32 text-center">
      <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-medium">Error 404</span>
      <h1 className="text-5xl md:text-7xl font-light uppercase tracking-tight text-black mt-3 mb-4">
        Page Not Found
      </h1>
      <p className="text-xs md:text-sm text-brand-muted max-w-md mx-auto mb-10 leading-relaxed font-light">
        The silhouette or editorial look you are requesting does not exist or has been relocated to another gallery.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="px-6 py-3 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/category/t-shirts"
          className="px-6 py-3 border border-neutral-300 text-black text-xs uppercase tracking-widest font-semibold hover:bg-neutral-50 transition-colors"
        >
          Shop T-Shirts
        </Link>
        <Link
          to="/category/shirts"
          className="px-6 py-3 border border-neutral-300 text-black text-xs uppercase tracking-widest font-semibold hover:bg-neutral-50 transition-colors"
        >
          Shop Shirts
        </Link>
      </div>
    </div>
  );
};
