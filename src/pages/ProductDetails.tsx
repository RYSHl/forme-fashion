import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useOutletContext } from 'react-router-dom';
import { 
  Heart, 
  Plus, 
  Minus, 
  ChevronRight, 
  ChevronDown, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Ruler, 
  Share2, 
  Check 
} from 'lucide-react';
import { productService } from '../services/productService';
import { Product, ProductSize, ProductColor } from '../types/product';
import { formatINR } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { ProductCard } from '../components/product/ProductCard';

const RECENTLY_VIEWED_KEY = 'forme_recently_viewed_ids';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { onOpenSizeGuide } = useOutletContext<{ onOpenSizeGuide: () => void }>();

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [sizeError, setSizeError] = useState<boolean>(false);

  // Accordion open states
  const [openAccordion, setOpenAccordion] = useState<'details' | 'shipping' | 'care' | null>('details');

  // Load product
  useEffect(() => {
    if (id) {
      const found = productService.getProductById(id);
      setProduct(found);
      if (found) {
        setSelectedImage(found.images[0]);
        setSelectedColor(found.colors[0]);
        setSelectedSize(null);
        setQuantity(1);
        setSizeError(false);

        // Track recently viewed
        try {
          const viewed = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
          const updated = [id, ...viewed.filter((item: string) => item !== id)].slice(0, 6);
          localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-xl font-light uppercase tracking-widest mb-4">Garment Not Found</h2>
        <p className="text-xs text-neutral-500 mb-6">The product you are looking for does not exist or may have been archived.</p>
        <Link to="/category/t-shirts" className="px-6 py-3 bg-black text-white text-xs uppercase tracking-widest">
          Explore All Categories
        </Link>
      </div>
    );
  }

  const isLiked = isInWishlist(product.id);
  const isOutOfStock = (Number(product.stock) || 0) <= 0;
  const relatedProducts = productService.getRelatedProducts(product.id, product.category, 4);

  // Recently viewed
  const recentlyViewedIds: string[] = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]')
    .filter((vId: string) => vId !== product.id);
  const recentlyViewedProducts = recentlyViewedIds
    .map(vId => productService.getProductById(vId))
    .filter(Boolean) as Product[];

  const handleAddToCart = (shouldRedirectToCheckout: boolean = false) => {
    if (isOutOfStock) {
      showToast('Out of Stock', 'error', 'This garment is currently sold out.');
      return;
    }

    if (!selectedSize) {
      setSizeError(true);
      showToast('Please select a size', 'error', 'Choose your preferred size before adding to bag.');
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      size: selectedSize,
      color: selectedColor || product.colors[0],
      image: selectedImage,
      quantity,
      stock: product.stock,
      product,
    });

    if (shouldRedirectToCheckout) {
      navigate('/checkout');
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link Copied to Clipboard', 'info');
  };

  return (
    <div className="pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-neutral-500">
          <Link to="/" className="hover:text-black">Home</Link>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <Link to={`/category/${product.category}`} className="hover:text-black">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <span className="text-black font-medium line-clamp-1">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Image Gallery (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 items-start">
            {/* Thumbnail Rail */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[600px] shrink-0 w-full md:w-20">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-[3/4] w-16 md:w-full overflow-hidden border transition-all ${
                      selectedImage === img ? 'border-black opacity-100' : 'border-neutral-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Primary View */}
            <div className="flex-1 w-full aspect-[3/4] bg-neutral-100 relative overflow-hidden">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isNew && (
                  <span className="bg-white text-black text-[10px] uppercase tracking-widest font-medium px-2.5 py-1 shadow-xs">
                    New Season
                  </span>
                )}
                {product.isBestseller && (
                  <span className="bg-black text-white text-[10px] uppercase tracking-widest font-medium px-2.5 py-1 shadow-xs">
                    Bestseller
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details & Purchase Controls (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            {/* Header info */}
            <div className="border-b border-neutral-200 pb-5">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-brand-muted mb-1.5">
                <span>SKU: {product.sku}</span>
                <span className="font-medium text-black">{product.fit} Fit</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-light uppercase tracking-tight text-brand-text mb-3">
                {product.name}
              </h1>

              {/* Price & Taxes */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-xl font-medium text-brand-text">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-brand-muted line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-brand-muted">
                Price inclusive of all taxes. Free delivery on orders above ₹1,999.
              </p>
            </div>

            {/* Color Swatches */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="uppercase tracking-wider text-neutral-600 font-medium">
                  Color: <strong className="text-black">{selectedColor?.name}</strong>
                </span>
              </div>
              <div className="flex gap-2.5">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full p-0.5 border transition-all ${
                      selectedColor?.name === color.name ? 'border-black scale-110' : 'border-transparent hover:scale-105'
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

            {/* Size Selector & Size Guide */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2.5">
                <span className="uppercase tracking-wider text-neutral-600 font-medium">
                  Select Size: {selectedSize && <strong className="text-black">{selectedSize}</strong>}
                </span>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="text-[11px] text-brand-muted underline hover:text-black uppercase tracking-wider flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size & Fit Guide</span>
                </button>
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
                    className={`py-3 text-xs uppercase tracking-wider font-medium border transition-colors ${
                      isOutOfStock
                        ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed line-through'
                        : selectedSize === size
                        ? 'bg-black text-white border-black shadow-xs'
                        : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && !isOutOfStock && (
                <p className="text-xs text-rose-600 mt-2 font-medium flex items-center gap-1">
                  * Please choose a size to add this garment to your bag.
                </p>
              )}
            </div>

            {/* Stock Availability Indicator */}
            <div className="text-xs">
              {isOutOfStock ? (
                <div className="bg-rose-50 border border-rose-200 py-2.5 px-3.5 text-xs text-rose-900 flex items-center justify-between">
                  <span className="font-semibold uppercase tracking-wider">Out of Stock</span>
                  <span className="text-[11px] text-rose-700">This garment is currently sold out.</span>
                </div>
              ) : product.stock <= 4 ? (
                <p className="text-amber-800 font-medium bg-amber-50 border border-amber-200 py-1.5 px-3">
                  Low Stock — Only {product.stock} items remaining in our central fulfillment center.
                </p>
              ) : (
                <p className="text-neutral-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  <span>In Stock — Ready to dispatch within 24 hours</span>
                </p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs uppercase tracking-wider text-neutral-600 font-medium">Quantity:</span>
              <div className={`flex items-center border border-neutral-300 bg-white ${isOutOfStock ? 'opacity-40 cursor-not-allowed' : ''}`}>
                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-neutral-500 hover:text-black disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-4 text-xs font-medium">{isOutOfStock ? 0 : quantity}</span>
                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-1.5 text-neutral-500 hover:text-black disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Cart, Buy Now, Wishlist */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {isOutOfStock ? (
                  <button
                    type="button"
                    disabled
                    className="flex-1 py-3.5 bg-neutral-200 text-neutral-400 text-xs uppercase tracking-widest font-semibold cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <span>Sold Out</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleAddToCart(false)}
                    className="flex-1 py-3.5 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`px-4 border transition-colors flex items-center justify-center ${
                    isLiked ? 'border-black bg-neutral-100 text-rose-600' : 'border-neutral-300 text-neutral-700 hover:border-black'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="px-3 border border-neutral-300 text-neutral-600 hover:border-black transition-colors"
                  title="Share item"
                  aria-label="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Buy Now (Starts checkout flow immediately) */}
              {!isOutOfStock && (
                <button
                  type="button"
                  onClick={() => handleAddToCart(true)}
                  className="w-full py-3.5 border border-black bg-brand-soft text-black text-xs uppercase tracking-widest font-semibold hover:bg-neutral-100 transition-colors"
                >
                  Buy Now (Proceed to Checkout)
                </button>
              )}
            </div>

            {/* Accordions: Product Details, Shipping & Returns, Materials & Care */}
            <div className="pt-4 border-t border-neutral-200 divide-y divide-neutral-200 text-xs">
              {/* Accordion 1: Details */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'details' ? null : 'details')}
                  className="w-full flex justify-between items-center text-left uppercase tracking-wider font-medium text-black"
                >
                  <span>Composition & Specifications</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'details' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'details' && (
                  <div className="pt-3 space-y-2 text-brand-muted leading-relaxed">
                    <p>{product.description}</p>
                    <p><strong>Composition:</strong> {product.composition}</p>
                    <ul className="list-disc pl-4 space-y-1 pt-1">
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Care Instructions */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
                  className="w-full flex justify-between items-center text-left uppercase tracking-wider font-medium text-black"
                >
                  <span>Materials & Care Guide</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'care' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'care' && (
                  <div className="pt-3 space-y-2 text-brand-muted leading-relaxed">
                    <p>To preserve the structure and tactile hand feel of your FORME garment:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {product.careInstructions.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping & Returns */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full flex justify-between items-center text-left uppercase tracking-wider font-medium text-black"
                >
                  <span>Shipping & 15-Day Returns</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pt-3 space-y-3 text-brand-muted leading-relaxed">
                    <div className="flex items-start gap-2">
                      <Truck className="w-4 h-4 text-black mt-0.5 shrink-0" />
                      <p>Complimentary standard shipping on all Indian domestic orders over ₹1,999. Delivered in 3–5 business days.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <RotateCcw className="w-4 h-4 text-black mt-0.5 shrink-0" />
                      <p>Complimentary 15-day return and exchange window. Free doorstep pick-up across all major PIN codes.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-black mt-0.5 shrink-0" />
                      <p>100% genuine guaranteed organic textiles. Plastic-free biodegradable shipping mailers.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-neutral-200">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-brand-muted">Complete the Look</span>
                <h3 className="text-xl sm:text-2xl font-light uppercase tracking-tight text-black mt-1">
                  Pairs Well With
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(rel => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

        {/* RECENTLY VIEWED PRODUCTS */}
        {recentlyViewedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-neutral-200">
            <h3 className="text-lg font-light uppercase tracking-widest text-black mb-6">
              Recently Viewed
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recentlyViewedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
