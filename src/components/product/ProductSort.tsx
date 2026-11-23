import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ProductSortOption } from '../../types/product';

interface ProductSortProps {
  currentSort: ProductSortOption;
  onSortChange: (sort: ProductSortOption) => void;
}

export const ProductSort: React.FC<ProductSortProps> = ({ currentSort, onSortChange }) => {
  return (
    <div className="relative inline-flex items-center">
      <span className="text-[11px] uppercase tracking-wider text-neutral-500 mr-2 hidden sm:inline">
        Sort By:
      </span>
      <div className="relative">
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value as ProductSortOption)}
          aria-label="Sort products"
          className="appearance-none bg-transparent pr-7 pl-2 py-1.5 text-xs uppercase tracking-wider font-medium text-black border border-neutral-300 focus:outline-none focus:border-black cursor-pointer"
        >
          <option value="featured">Featured Selection</option>
          <option value="newest">Newest Arrivals</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-neutral-600 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
};
