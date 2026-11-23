import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, Plus, Minus, Check, ArrowRight } from 'lucide-react';
import { Product, ProductSize, ProductColor } from '../../types/product';
import { formatINR } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSizeGuide?: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onOpenSizeGuide,
}) => {
  if (!isOpen || !product) return null;

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [sizeError, setSizeError] = useState(false);

  const isLiked = isInWishlist(product.id);
  const isOutOfStock = (Number(product.stock) || 0) <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      size: selectedSize,
      color: selectedColor,
      image: selectedImage,
      quantity,
      stock: product.stock,
      product,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-white shadow-2xl p-6 md:p-8 border border-neutral-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* Image Preview */}
            <div className="space-y-3">
              <div className="aspect-[3/4] bg-neutral-100 overflow-hidden relative">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-white text-black text-[10px] font-medium tracking-widest uppercase px-2 py-1 shadow-xs">
                    New Season
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`w-14 h-18 border overflow-hidden transition-colors ${
                        selectedImage === img ? 'border-black' : 'border-neutral-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details & Selection */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-brand-muted mb-1">
                  {product.category} • {product.fit} Fit
                </p>
                <h2 className="text-lg md:text-xl font-normal text-brand-text mb-2 tracking-tight">
                  {product.name}
                </h2>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-base font-medium text-brand-text">
                    {formatINR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-brand-muted line-through">
                      {formatINR(product.originalPrice)}
                    </span>
                  )}
                  {isOutOfStock ? (
                    <span className="text-[11px] text-rose-700 font-semibold uppercase tracking-wider">
                      Sold Out
                    </span>
                  ) : product.stock <= 5 ? (
                    <span className="text-[11px] text-amber-700 font-medium">
                      Only {product.stock} left in stock
                    </span>
                  ) : null}
                </div>

                <p className="text-xs text-brand-muted mb-6 leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                {/* Color Selector */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs uppercase tracking-wider text-neutral-600 font-medium">
                      Color: <strong className="text-black">{selectedColor.name}</strong>
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {product.colors.map(color => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 rounded-full p-0.5 border transition-all ${
                          selectedColor.name === color.name ? 'border-black scale-110' : 'border-transparent hover:scale-105'
                        }`}
                        title={color.name}
                      >
                        <span
                          className="w-full h-full rounded-full block border border-neutral-300 shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs uppercase tracking-wider text-neutral-600 font-medium">
                      Select Size: {selectedSize && <strong className="text-black">{selectedSize}</strong>}
                    </span>
                    {onOpenSizeGuide && (
                      <button
                        type="button"
                        onClick={onOpenSizeGuide}
                        className="text-[11px] text-brand-muted underline hover:text-black uppercase tracking-wider"
                      >
                        Size Guide
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-6 gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        type="button"
                        disabled={isOutOfStock}
                        onClick={() => {
                          if (isOutOfStock) return;
                          setSelectedSize(size);
                          setSizeError(false);
                        }}
                        className={`py-2 text-xs uppercase tracking-wider font-medium border transition-colors ${
                          isOutOfStock
                            ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed line-through'
                            : selectedSize === size
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {sizeError && !isOutOfStock && (
                    <p className="text-xs text-rose-600 mt-1.5 font-medium">
                      Please select a size to proceed.
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs uppercase tracking-wider text-neutral-600 font-medium">Quantity:</span>
                  <div className={`flex items-center border border-neutral-300 ${isOutOfStock ? 'opacity-40 cursor-not-allowed' : ''}`}>
                    <button
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-neutral-500 hover:text-black disabled:cursor-not-allowed"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-medium">{isOutOfStock ? 0 : quantity}</span>
                    <button
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-2.5 py-1 text-neutral-500 hover:text-black disabled:cursor-not-allowed"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-neutral-100">
                <div className="flex gap-2">
                  {isOutOfStock ? (
                    <button
                      type="button"
                      disabled
                      className="flex-1 py-3 bg-neutral-200 text-neutral-400 text-xs uppercase tracking-widest font-medium cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <span>Sold Out</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="flex-1 py-3 bg-black text-white text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 border transition-colors ${
                      isLiked ? 'border-black bg-neutral-100 text-rose-600' : 'border-neutral-300 text-neutral-600 hover:border-black'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="w-full py-2.5 text-center text-xs uppercase tracking-widest text-neutral-600 hover:text-black flex items-center justify-center gap-1.5 group"
                >
                  <span>View Full Product Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
