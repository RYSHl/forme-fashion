import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SlidersHorizontal, Search as SearchIcon, X, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { productService } from '../services/productService';
import { ProductFilters, ProductSortOption, ProductCategory, Product } from '../types/product';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductFilter } from '../components/product/ProductFilter';
import { ProductSort } from '../components/product/ProductSort';
import { QuickViewModal } from '../components/product/QuickViewModal';

export const Collection: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find category metadata
  const categoryInfo = CATEGORIES.find(c => c.slug === slug) || {
    id: (slug as ProductCategory) || 't-shirts',
    name: slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ') : 'Collection',
    slug: slug || 't-shirts',
    description: 'Curated modern essentials tailored for international contemporary style.',
    editorialSubtitle: 'FORME SEASONAL COLLECTION',
    heroImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80',
    cardImage: '',
  };

  const [filters, setFilters] = useState<ProductFilters>({});
  const [sort, setSort] = useState<ProductSortOption>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [inCategorySearch, setInCategorySearch] = useState('');

  // Fetch filtered & sorted products
  const products = useMemo(() => {
    const combinedFilters: ProductFilters = {
      ...filters,
      searchQuery: inCategorySearch || filters.searchQuery,
    };
    return productService.getProductsByCategory(
      categoryInfo.id as ProductCategory,
      combinedFilters,
      sort
    );
  }, [categoryInfo.id, filters, sort, inCategorySearch]);

  const handleClearFilters = () => {
    setFilters({});
    setInCategorySearch('');
  };

  return (
    <div className="pb-20">
      {/* Category Hero / Editorial Header */}
      <div className="relative bg-neutral-900 text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 mb-8 overflow-hidden">
        <img
          src={categoryInfo.heroImage}
          alt={categoryInfo.name}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
        />
        <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-[11px] uppercase tracking-widest text-neutral-300 mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-white font-medium">{categoryInfo.name}</span>
          </nav>

          <span className="text-xs uppercase tracking-[0.25em] text-neutral-300 mb-2 font-medium">
            {categoryInfo.editorialSubtitle}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-tight mb-4">
            {categoryInfo.name}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl font-light leading-relaxed">
            {categoryInfo.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls Bar: In-collection Search, Filter Trigger, Sort, Count */}
        <div className="py-4 border-b border-neutral-200 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Mobile filter button & In-category search */}
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 border border-neutral-300 text-xs uppercase tracking-wider font-medium text-black hover:border-black"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* In-Collection Search Input */}
            <div className="relative max-w-xs w-full">
              <SearchIcon className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inCategorySearch}
                onChange={(e) => setInCategorySearch(e.target.value)}
                placeholder={`Search within ${categoryInfo.name}...`}
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-brand-soft border border-neutral-200 focus:outline-none focus:border-black placeholder-neutral-400"
              />
              {inCategorySearch && (
                <button
                  onClick={() => setInCategorySearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Right: Count & Sort */}
          <div className="flex items-center justify-between md:justify-end gap-6">
            <span className="text-xs uppercase tracking-wider text-neutral-500">
              Showing <strong>{products.length}</strong> styles
            </span>
            <ProductSort currentSort={sort} onSortChange={setSort} />
          </div>
        </div>

        {/* Content Area: Sidebar Filter + Product Grid */}
        <div className="flex items-start">
          <ProductFilter
            filters={filters}
            onChange={setFilters}
            onClear={handleClearFilters}
            isOpenMobile={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
            totalCount={products.length}
          />

          <main className="flex-1 min-w-0">
            <ProductGrid
              products={products}
              onQuickView={(p) => setQuickViewProduct(p)}
              onResetFilters={handleClearFilters}
              emptyTitle={`No ${categoryInfo.name} matched`}
              emptyMessage="We couldn't find any garments matching your exact filter criteria. Try resetting the filters or modifying your search query."
            />
          </main>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
