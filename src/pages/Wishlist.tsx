import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/formatters';
import { Product } from '../types/product';
import { QuickViewModal } from '../components/product/QuickViewModal';

export const Wishlist: React.FC = () => {
  const { wishlistProducts, removeFromWishlist } = useWishlist();

  const [selectedProductForCart, setSelectedProductForCart] = useState<Product | null>(null);

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 border border-neutral-300 mx-auto flex items-center justify-center mb-6 text-neutral-400">
          <Heart className="w-8 h-8 stroke-[1.25]" />
        </div>
        <h1 className="text-2xl font-light uppercase tracking-widest text-black mb-3">
          Your Saved Wishlist is Empty
        </h1>
        <p className="text-xs text-brand-muted max-w-md mx-auto mb-8 leading-relaxed">
          Save your favourite pieces to curate your seasonal capsule wardrobe or revisit them when you are ready to shop.
        </p>
        <Link
          to="/category/t-shirts"
          className="inline-block px-8 py-3.5 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="flex items-end justify-between pb-4 border-b border-neutral-200 mb-8">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-brand-muted">Private Curation</span>
          <h1 className="text-2xl sm:text-3xl font-light uppercase tracking-tight text-black mt-1">
            Saved Items ({wishlistProducts.length})
          </h1>
        </div>
        <Link
          to="/category/t-shirts"
          className="text-xs uppercase tracking-wider underline hover:text-neutral-600 hidden sm:inline"
        >
          Continue Browsing
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <div key={product.id} className="group flex flex-col justify-between border border-neutral-200 bg-white p-3">
            <div>
              {/* Product Image */}
              <div className="aspect-[3/4] overflow-hidden bg-neutral-100 relative mb-3">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-neutral-600 hover:text-black transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Product Info */}
              <h3 className="text-xs font-medium text-black line-clamp-1 hover:underline">
                <Link to={`/product/${product.id}`}>{product.name}</Link>
              </h3>
              <p className="text-xs text-brand-muted mt-0.5">{formatINR(product.price)}</p>
            </div>

            {/* Move to Cart button (triggers size selection) */}
            <div className="pt-4 border-t border-neutral-100 mt-4">
              <button
                type="button"
                onClick={() => setSelectedProductForCart(product)}
                className="w-full py-2 bg-black text-white text-[11px] uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move to Bag</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Modal to select size before moving to cart */}
      <QuickViewModal
        product={selectedProductForCart}
        isOpen={!!selectedProductForCart}
        onClose={() => setSelectedProductForCart(null)}
      />
    </div>
  );
};
