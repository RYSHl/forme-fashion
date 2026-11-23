import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react';
import { productService } from '../../services/productService';
import { Product } from '../../types/product';
import { formatINR } from '../../utils/formatters';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Live search
  useEffect(() => {
    if (query.trim().length > 1) {
      const hits = productService.searchProducts(query);
      setResults(hits.slice(0, 6));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectProduct = (productId: string) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleSuggestedClick = (term: string) => {
    setQuery(term);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-start transition-opacity">
      <div className="bg-white border-b border-brand-border shadow-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between pb-4">
            <span className="text-xs uppercase tracking-widest text-brand-muted">Search The Collection</span>
            <button
              onClick={onClose}
              className="p-2 text-neutral-500 hover:text-black transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="relative flex items-center">
            <SearchIcon className="w-5 h-5 text-neutral-400 absolute left-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for linen shirts, heavyweight tees, pleated trousers..."
              className="w-full pl-8 pr-12 py-3 text-lg md:text-xl font-light text-brand-text placeholder-neutral-400 border-b border-neutral-300 focus:border-black focus:outline-none bg-transparent"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-8 text-neutral-400 hover:text-black p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-0 text-neutral-900 hover:opacity-70 p-1"
              aria-label="Submit search"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Quick suggestions when query is short */}
          {query.trim().length <= 1 && (
            <div className="pt-4 flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 mr-2">Popular:</span>
              {['Heavyweight Boxy', 'European Linen', 'Pleated Trousers', 'French Terry', 'Raw Denim'].map(term => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleSuggestedClick(term)}
                  className="text-xs px-3 py-1 bg-neutral-100 hover:bg-black hover:text-white transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          )}

          {/* Live Search Results */}
          {results.length > 0 && (
            <div className="pt-6 border-t border-neutral-100 mt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-brand-muted">
                  Suggested Products ({results.length})
                </span>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-xs uppercase tracking-wider underline hover:text-neutral-600"
                >
                  View All Matching Products
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {results.map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.id)}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[3/4] bg-neutral-100 overflow-hidden mb-2 relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p className="text-xs font-normal line-clamp-1 group-hover:underline">{product.name}</p>
                    <p className="text-xs text-brand-muted mt-0.5">{formatINR(product.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query.trim().length > 1 && results.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-sm text-neutral-500">No products found matching "{query}".</p>
              <button
                type="button"
                onClick={handleSubmit}
                className="mt-2 text-xs uppercase tracking-wider underline hover:text-black"
              >
                Search all collections for "{query}"
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1" onClick={onClose}></div>
    </div>
  );
};
