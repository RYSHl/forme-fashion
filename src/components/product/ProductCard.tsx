import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { Product } from '../../types/product';
import { formatINR } from '../../utils/formatters';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isLiked = isInWishlist(product.id);
  const primaryImage = product.images[activeImageIndex] || product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div
      className="group relative flex flex-col transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={isHovered && product.images.length > 1 ? secondaryImage : primaryImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="bg-white text-black text-[9px] md:text-[10px] uppercase tracking-widest font-medium px-2 py-0.5 shadow-xs">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-black text-white text-[9px] md:text-[10px] uppercase tracking-widest font-medium px-2 py-0.5 shadow-xs">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-neutral-800 hover:text-black hover:scale-110 shadow-xs transition-all"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-600 text-rose-600' : 'text-neutral-700'}`} />
        </button>

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
            <button
              onClick={handleQuickViewClick}
              className="w-full py-2 bg-white/95 hover:bg-black hover:text-white text-black text-[11px] uppercase tracking-widest font-medium backdrop-blur-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="pt-3 pb-2 flex flex-col flex-1">
        {/* Color Swatches */}
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 mb-1.5">
            {product.colors.map((c, i) => (
              <span
                key={c.name}
                onMouseEnter={() => {
                  if (product.images[i]) setActiveImageIndex(i);
                }}
                className="w-2.5 h-2.5 rounded-full border border-neutral-300 inline-block hover:scale-125 transition-transform"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[10px] text-neutral-400 ml-1">+{product.colors.length}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xs md:text-sm font-normal text-brand-text hover:underline tracking-tight line-clamp-1">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Price and Fit */}
        <div className="mt-1 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xs md:text-sm font-medium text-brand-text">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-brand-muted line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-brand-muted uppercase tracking-wider">{product.fit}</span>
        </div>
      </div>
    </div>
  );
};
