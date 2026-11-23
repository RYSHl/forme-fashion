import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { ProductFilters, ProductSize, ProductFit } from '../../types/product';
import { formatINR } from '../../utils/formatters';

interface ProductFilterProps {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  onClear: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  totalCount: number;
}

const AVAILABLE_SIZES: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const AVAILABLE_FITS: ProductFit[] = ['Boxy', 'Relaxed', 'Regular', 'Slim', 'Straight', 'Wide-Leg'];

const AVAILABLE_COLORS = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#111111' },
  { name: 'Grey', hex: '#888888' },
  { name: 'Oatmeal', hex: '#DED7C6' },
  { name: 'Olive', hex: '#525547' },
  { name: 'Navy', hex: '#1F2A38' },
  { name: 'Sand', hex: '#D4C4AE' },
  { name: 'Clay', hex: '#875F4B' },
];

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  onChange,
  onClear,
  isOpenMobile,
  onCloseMobile,
  totalCount,
}) => {
  const toggleSize = (size: ProductSize) => {
    const current = filters.sizes || [];
    const updated = current.includes(size)
      ? current.filter(s => s !== size)
      : [...current, size];
    onChange({ ...filters, sizes: updated });
  };

  const toggleFit = (fit: ProductFit) => {
    const current = filters.fits || [];
    const updated = current.includes(fit)
      ? current.filter(f => f !== fit)
      : [...current, fit];
    onChange({ ...filters, fits: updated });
  };

  const toggleColor = (colorName: string) => {
    const current = filters.colors || [];
    const updated = current.includes(colorName)
      ? current.filter(c => c !== colorName)
      : [...current, colorName];
    onChange({ ...filters, colors: updated });
  };

  const hasActiveFilters = 
    (filters.sizes && filters.sizes.length > 0) ||
    (filters.fits && filters.fits.length > 0) ||
    (filters.colors && filters.colors.length > 0) ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.onlyNew ||
    filters.onlyBestseller;

  const content = (
    <div className="space-y-6 text-xs">
      {/* Filter Header with count and reset */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
        <span className="text-xs uppercase tracking-widest font-semibold text-black">
          Filter ({totalCount} Styles)
        </span>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-[11px] text-neutral-500 hover:text-black flex items-center gap-1 uppercase tracking-wider"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Quick Toggles */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={!!filters.onlyNew}
            onChange={(e) => onChange({ ...filters, onlyNew: e.target.checked || undefined })}
            className="w-3.5 h-3.5 accent-black rounded-none"
          />
          <span className="uppercase tracking-wider text-[11px] font-medium">New Arrivals Only</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={!!filters.onlyBestseller}
            onChange={(e) => onChange({ ...filters, onlyBestseller: e.target.checked || undefined })}
            className="w-3.5 h-3.5 accent-black rounded-none"
          />
          <span className="uppercase tracking-wider text-[11px] font-medium">Best Sellers Only</span>
        </label>
      </div>

      {/* Size Filter */}
      <div className="pt-4 border-t border-neutral-200">
        <h4 className="uppercase tracking-widest font-medium text-black mb-3">Size</h4>
        <div className="grid grid-cols-3 gap-1.5">
          {AVAILABLE_SIZES.map(size => {
            const isSelected = filters.sizes?.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`py-2 text-[11px] uppercase tracking-wider font-medium border transition-colors ${
                  isSelected
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-black'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fit Filter */}
      <div className="pt-4 border-t border-neutral-200">
        <h4 className="uppercase tracking-widest font-medium text-black mb-3">Fit / Cut</h4>
        <div className="flex flex-wrap gap-1.5">
          {AVAILABLE_FITS.map(fit => {
            const isSelected = filters.fits?.includes(fit);
            return (
              <button
                key={fit}
                type="button"
                onClick={() => toggleFit(fit)}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium border transition-colors ${
                  isSelected
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-black'
                }`}
              >
                {fit}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Filter */}
      <div className="pt-4 border-t border-neutral-200">
        <h4 className="uppercase tracking-widest font-medium text-black mb-3">Color Tone</h4>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_COLORS.map(c => {
            const isSelected = filters.colors?.some(col => col.toLowerCase().includes(c.name.toLowerCase()));
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => toggleColor(c.name)}
                className={`flex items-center gap-1.5 px-2.5 py-1 border transition-colors text-[11px] ${
                  isSelected ? 'border-black bg-neutral-100 font-semibold' : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                  style={{ backgroundColor: c.hex }}
                />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="pt-4 border-t border-neutral-200">
        <div className="flex justify-between items-center mb-3">
          <h4 className="uppercase tracking-widest font-medium text-black">Maximum Price</h4>
          <span className="text-[11px] font-semibold text-black">
            {formatINR(filters.maxPrice || 5000)}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="5000"
          step="250"
          value={filters.maxPrice || 5000}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-black cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
          <span>₹1,000</span>
          <span>₹5,000</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 pr-8">
        {content}
      </aside>

      {/* Mobile Filter Slide-out Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={onCloseMobile} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200">
                  <h3 className="text-sm uppercase tracking-widest font-medium">Filter Products</h3>
                  <button onClick={onCloseMobile} className="p-1 text-neutral-400 hover:text-black">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {content}
              </div>

              <div className="pt-6 border-t border-neutral-200 mt-6">
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="w-full py-3 bg-black text-white text-xs uppercase tracking-widest font-medium hover:bg-neutral-800"
                >
                  Show Results ({totalCount})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
