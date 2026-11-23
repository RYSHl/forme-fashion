import { Product, ProductCategory, ProductFilters, ProductSortOption } from '../types/product';
import { INITIAL_PRODUCTS } from '../data/products';

const STORAGE_KEY = 'forme_products_catalog';

export const productService = {
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
        // sort by isBestseller/isNew first, then by date
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
    return product;
  },

  deleteProduct: (id: string): void => {
    const products = productService.getAllProducts();
    const updated = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  resetToDefaultCatalog: (): Product[] => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
};
