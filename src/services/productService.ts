import { Product, ProductCategory, ProductFilters, ProductSortOption } from '../types/product';
import { INITIAL_PRODUCTS } from '../data/products';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_KEY = 'forme_products_catalog';

// Helper to map DB row to Product interface
const mapRowToProduct = (d: any): Product => ({
  id: d.id,
  sku: d.sku,
  name: d.name,
  category: d.category,
  subcategory: d.subcategory,
  price: Number(d.price),
  originalPrice: d.original_price ? Number(d.original_price) : undefined,
  description: d.description || '',
  details: Array.isArray(d.details) ? d.details : [],
  composition: d.composition || '',
  careInstructions: Array.isArray(d.care_instructions) ? d.care_instructions : [],
  fit: d.fit || 'Regular',
  colors: Array.isArray(d.colors) ? d.colors : [],
  sizes: Array.isArray(d.sizes) ? d.sizes : [],
  images: Array.isArray(d.images) ? d.images : [],
  stock: Number(d.stock || 10),
  isNew: !!d.is_new,
  isBestseller: !!d.is_bestseller,
  isTrending: !!d.is_trending,
  createdAt: d.created_at || new Date().toISOString(),
});

export const productService = {
  // Sync background catalog with Supabase if configured
  syncWithSupabase: async (): Promise<Product[]> => {
    if (!isSupabaseConfigured() || !supabase) {
      return productService.getAllProducts();
    }
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.warn('Supabase fetch notice (using cached catalog):', error.message);
        return productService.getAllProducts();
      }
      if (data && data.length > 0) {
        const mapped = data.map(mapRowToProduct);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
        return mapped;
      }
    } catch (e) {
      console.warn('Supabase sync skipped, fallback to local', e);
    }
    return productService.getAllProducts();
  },

  getAllProducts: (): Product[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to read products from localStorage, using initial', e);
    }
    // initialize storage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  },

  getProductById: (id: string): Product | undefined => {
    const products = productService.getAllProducts();
    return products.find(p => p.id === id);
  },

  getProductsByCategory: (
    category?: ProductCategory,
    filters?: ProductFilters,
    sort: ProductSortOption = 'featured'
  ): Product[] => {
    let list = productService.getAllProducts();

    if (category) {
      list = list.filter(p => p.category === category);
    }

    if (filters) {
      if (filters.subcategories && filters.subcategories.length > 0) {
        list = list.filter(p => p.subcategory && filters.subcategories!.includes(p.subcategory));
      }

      if (filters.sizes && filters.sizes.length > 0) {
        list = list.filter(p => p.sizes.some(s => filters.sizes!.includes(s)));
      }

      if (filters.colors && filters.colors.length > 0) {
        list = list.filter(p => p.colors.some(c => filters.colors!.includes(c.name)));
      }

      if (filters.fits && filters.fits.length > 0) {
        list = list.filter(p => filters.fits!.includes(p.fit));
      }

      if (filters.minPrice !== undefined) {
        list = list.filter(p => p.price >= filters.minPrice!);
      }

      if (filters.maxPrice !== undefined) {
        list = list.filter(p => p.price <= filters.maxPrice!);
      }

      if (filters.onlyNew) {
        list = list.filter(p => p.isNew);
      }

      if (filters.onlyBestseller) {
        list = list.filter(p => p.isBestseller);
      }

      if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
        const q = filters.searchQuery.toLowerCase().trim();
        list = list.filter(p => 
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.composition.toLowerCase().includes(q) ||
          p.fit.toLowerCase().includes(q) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q))
        );
      }
    }

    // Sorting
    switch (sort) {
      case 'newest':
        return [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'price-asc':
        return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...list].sort((a, b) => b.price - a.price);
      case 'featured':
      default:
        return [...list].sort((a, b) => {
          if (a.isBestseller && !b.isBestseller) return -1;
          if (!a.isBestseller && b.isBestseller) return 1;
          return 0;
        });
    }
  },

  searchProducts: (query: string): Product[] => {
    if (!query || query.trim().length === 0) return [];
    const q = query.toLowerCase().trim();
    const products = productService.getAllProducts();
    return products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.composition.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(q))
    );
  },

  getNewArrivals: (limit: number = 8): Product[] => {
    const products = productService.getAllProducts();
    const filtered = products.filter(p => p.isNew);
    return (filtered.length >= limit ? filtered : products).slice(0, limit);
  },

  getTrendingProducts: (limit: number = 6): Product[] => {
    const products = productService.getAllProducts();
    const trending = products.filter(p => p.isTrending || p.isBestseller);
    return trending.slice(0, limit);
  },

  getBestSellers: (limit: number = 4): Product[] => {
    const products = productService.getAllProducts();
    const best = products.filter(p => p.isBestseller);
    return best.slice(0, limit);
  },

  getRelatedProducts: (productId: string, category: ProductCategory, limit: number = 4): Product[] => {
    const products = productService.getAllProducts();
    return products
      .filter(p => p.category === category && p.id !== productId)
      .slice(0, limit);
  },

  createProduct: (productData: Omit<Product, 'id' | 'createdAt'>): Product => {
    const products = productService.getAllProducts();
    const newId = `prod-${productData.category.slice(0, 2)}-${Date.now().toString().slice(-4)}`;
    const newProduct: Product = {
      ...productData,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    const updated = [newProduct, ...products];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Async write to Supabase if available
    if (isSupabaseConfigured() && supabase) {
      supabase
        .from('products')
        .insert({
          id: newProduct.id,
          sku: newProduct.sku,
          name: newProduct.name,
          category: newProduct.category,
          subcategory: newProduct.subcategory,
          price: newProduct.price,
          original_price: newProduct.originalPrice,
          description: newProduct.description,
          details: newProduct.details,
          composition: newProduct.composition,
          care_instructions: newProduct.careInstructions,
          fit: newProduct.fit,
          colors: newProduct.colors,
          sizes: newProduct.sizes,
          images: newProduct.images,
          stock: newProduct.stock,
          is_new: newProduct.isNew,
          is_bestseller: newProduct.isBestseller,
          is_trending: newProduct.isTrending,
          created_at: newProduct.createdAt,
        })
        .then(({ error }) => {
          if (error) console.error('Supabase product insert notice:', error.message);
        });
    }

    return newProduct;
  },

  updateProduct: (product: Product): Product => {
    const products = productService.getAllProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index === -1) {
      throw new Error(`Product with ID ${product.id} not found`);
    }
    const updated = [...products];
    updated[index] = product;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Async update to Supabase if available
    if (isSupabaseConfigured() && supabase) {
      supabase
        .from('products')
        .update({
          sku: product.sku,
          name: product.name,
          category: product.category,
          subcategory: product.subcategory,
          price: product.price,
          original_price: product.originalPrice,
          description: product.description,
          details: product.details,
          composition: product.composition,
          care_instructions: product.careInstructions,
          fit: product.fit,
          colors: product.colors,
          sizes: product.sizes,
          images: product.images,
          stock: product.stock,
          is_new: product.isNew,
          is_bestseller: product.isBestseller,
          is_trending: product.isTrending,
        })
        .eq('id', product.id)
        .then(({ error }) => {
          if (error) console.error('Supabase product update notice:', error.message);
        });
    }

    return product;
  },

  deleteProduct: (id: string): void => {
    const products = productService.getAllProducts();
    const updated = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Async delete from Supabase if available
    if (isSupabaseConfigured() && supabase) {
      supabase
        .from('products')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) console.error('Supabase product delete notice:', error.message);
        });
    }
  },

  resetToDefaultCatalog: (): Product[] => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
};
