import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import { productService } from '../services/productService';
import { Product, ProductSortOption } from '../types/product';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductSort } from '../components/product/ProductSort';
import { QuickViewModal } from '../components/product/QuickViewModal';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<ProductSortOption>('featured');
  const [results, setResults] = useState<Product[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
    if (q.trim()) {
      let hits = productService.searchProducts(q);
      // apply sorting
      if (sort === 'price-asc') hits = [...hits].sort((a, b) => a.price - b.price);
      else if (sort === 'price-desc') hits = [...hits].sort((a, b) => b.price - a.price);
      else if (sort === 'newest') hits = [...hits].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setResults(hits);
    } else {
      setResults([]);
    }
  }, [searchParams, sort]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Search Input Banner */}
      <div className="max-w-2xl mx-auto mb-12 text-center">
        <h1 className="text-2xl sm:text-3xl font-light uppercase tracking-tight text-black mb-4">
          Search the Collection
        </h1>
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <SearchIcon className="w-5 h-5 text-neutral-400 absolute left-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by silhouette, material, or style (e.g. linen, boxy, pleated)..."
            className="w-full pl-11 pr-24 py-3.5 text-sm bg-brand-soft border border-neutral-300 focus:outline-none focus:border-black placeholder-neutral-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSearchParams({});
              }}
              className="absolute right-16 text-neutral-400 hover:text-black p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 px-4 py-2 bg-black text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-neutral-500">
          <span>Popular searches:</span>
          {['Heavyweight', 'Linen', 'Straight Pants', 'Trousers', 'Hoodies'].map(term => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setQuery(term);
                setSearchParams({ q: term });
              }}
              className="underline hover:text-black"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      {initialQuery && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 mb-8 gap-4">
          <p className="text-xs uppercase tracking-wider text-brand-muted">
            Found <strong>{results.length}</strong> results for "<strong>{initialQuery}</strong>"
          </p>
          {results.length > 0 && (
            <ProductSort currentSort={sort} onSortChange={setSort} />
          )}
        </div>
      )}

      {/* Products Grid or Empty State */}
      {initialQuery ? (
        <ProductGrid
          products={results}
          onQuickView={(p) => setQuickViewProduct(p)}
          emptyTitle={`No results found for "${initialQuery}"`}
          emptyMessage="Try adjusting your keywords, searching for broader terms like 'cotton' or 'shirt', or explore our main category galleries."
        />
      ) : (
        <div className="text-center py-16 text-brand-muted text-xs">
          Enter a search query above to browse the FORME catalog.
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
