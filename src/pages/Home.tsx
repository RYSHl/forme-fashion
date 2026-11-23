import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { productService } from '../services/productService';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/product/QuickViewModal';
import { Product } from '../types/product';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const newArrivals = productService.getNewArrivals(8);
  const trendingProducts = productService.getTrendingProducts(4);
  const bestSellers = productService.getBestSellers(4);

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden bg-neutral-900">
        <img
          src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=2000&q=85"
          alt="FORME Seasonal Campaign"
          className="w-full h-full object-cover object-top opacity-85 scale-100 hover:scale-102 transition-transform duration-1000 ease-out"
        />
        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 md:p-16 max-w-7xl mx-auto">
          <div className="max-w-2xl text-white space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Autumn / Winter 2026 Collection
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-light uppercase tracking-tight leading-[1.05]">
              Everyday, <br />
              <span className="font-semibold italic font-serif">Redefined.</span>
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 font-light max-w-lg leading-relaxed">
              Modern essentials crafted in heavyweight combed cotton, European linen, and structured tailoring. Designed for effortless longevity.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/category/t-shirts"
                className="px-8 py-3.5 bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-colors shadow-lg"
              >
                Shop Essentials
              </Link>
              <Link
                to="/category/shirts"
                className="px-8 py-3.5 bg-black/40 backdrop-blur-sm border border-white text-white text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-colors"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY (4 Visually Distinct Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-200">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-brand-muted">Seasonal Categories</span>
            <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-tight text-black mt-1">
              Shop by Silhouette
            </h2>
          </div>
          <span className="text-xs text-brand-muted mt-2 sm:mt-0">
            Four foundational pillars of modern menswear
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate(`/category/${category.slug}`)}
              className="group cursor-pointer relative flex flex-col bg-neutral-100 overflow-hidden"
            >
              <div className="aspect-[3/4] w-full overflow-hidden relative">
                <img
                  src={category.cardImage}
                  alt={category.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white flex flex-col justify-end">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-300 mb-1">
                    Collection
                  </span>
                  <h3 className="text-xl font-normal uppercase tracking-wide mb-2">
                    {category.name}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold group-hover:underline">
                    <span>Shop Now</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. NEW ARRIVALS (8 Products Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-neutral-200">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-brand-muted">Just Landed</span>
            <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-tight text-black mt-1">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/category/t-shirts"
            className="text-xs uppercase tracking-widest font-medium text-black hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 4. EDITORIAL CAMPAIGN BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-neutral-900 text-white overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="p-8 sm:p-12 md:p-16 lg:p-20 space-y-6">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
              Editorial Feature
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-tight leading-tight">
              Form, Space & Heavy Cotton.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              We engineered our 450 GSM loopback French Terry and 260 GSM combed jersey with zero compromises. Substantial weight, sculpted drapes, and raw architectural cuts that hold their posture from morning to midnight.
            </p>
            <div className="pt-2 flex gap-4">
              <Link
                to="/category/hoodies"
                className="px-6 py-3 bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-colors"
              >
                Discover Hoodies
              </Link>
              <Link
                to="/category/pants"
                className="px-6 py-3 border border-white text-white text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-colors"
              >
                Tailored Trousers
              </Link>
            </div>
          </div>
          <div className="relative h-80 sm:h-96 lg:h-full min-h-[420px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1400&q=80"
              alt="Editorial campaign model"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* 5. TRENDING NOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-neutral-200">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-brand-muted">Seasonal Highlights</span>
            <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-tight text-black mt-1">
              Trending Now
            </h2>
          </div>
          <span className="text-xs text-brand-muted">Curated by our Mumbai design studio</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
          {trendingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 6. BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-neutral-200">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-brand-muted">Hall of Fame</span>
            <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-tight text-black mt-1">
              Core Best Sellers
            </h2>
          </div>
          <Link
            to="/category/shirts"
            className="text-xs uppercase tracking-widest font-medium text-black hover:underline flex items-center gap-1"
          >
            <span>Explore All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
