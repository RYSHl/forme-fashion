export type ProductCategory = 't-shirts' | 'shirts' | 'pants' | 'hoodies';

export type ProductFit = 'Slim' | 'Regular' | 'Relaxed' | 'Oversized' | 'Wide-Leg' | 'Straight' | 'Boxy';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  composition: string;
  careInstructions: string[];
  fit: ProductFit;
  colors: ProductColor[];
  sizes: ProductSize[];
  images: string[];
  stock: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isTrending?: boolean;
  createdAt: string;
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  slug: string;
  description: string;
  editorialSubtitle: string;
  heroImage: string;
  cardImage: string;
}

export interface ProductFilters {
  category?: ProductCategory;
  subcategories?: string[];
  sizes?: ProductSize[];
  colors?: string[];
  fits?: ProductFit[];
  minPrice?: number;
  maxPrice?: number;
  onlyNew?: boolean;
  onlyBestseller?: boolean;
  searchQuery?: string;
}

export type ProductSortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc';
