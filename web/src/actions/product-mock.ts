import type { IProductItem } from 'src/types/product';

import { useMemo } from 'react';

import { _products } from 'src/_mock/product';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'mock-products';

// Helper functions for localStorage
const getStoredProducts = (): IProductItem[] => {
  if (typeof window === 'undefined') return _products;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : _products;
  } catch {
    return _products;
  }
};

const saveToStorage = (products: IProductItem[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    // Handle storage errors silently
  }
};

const initializeProducts = (): void => {
  if (typeof window === 'undefined') return;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    saveToStorage(_products);
  }
};

// FIXED: Create a stable products cache to prevent infinite loops
let productsCache: IProductItem[] | null = null;
let cacheInitialized = false;

const getProductsStable = (): IProductItem[] => {
  if (!cacheInitialized) {
    initializeProducts();
    productsCache = getStoredProducts();
    cacheInitialized = true;
  }
  return productsCache || _products;
};

// Clear cache when products change
const clearProductsCache = (): void => {
  productsCache = null;
  cacheInitialized = false;
};

// ----------------------------------------------------------------------

export function useGetProducts() {
  const products = getProductsStable();

  const memoizedValue = useMemo(
    () => ({
      products,
      productsLoading: false,
      productsError: null,
      productsValidating: false,
      productsEmpty: !products.length,
    }),
    [products]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetProduct(productId: string) {
  const products = getProductsStable();
  const product = products.find((prod) => prod.id === productId);

  const memoizedValue = useMemo(
    () => ({
      product,
      productLoading: false,
      productError: product ? null : new Error('Product not found'),
      productValidating: false,
    }),
    [product]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchProducts(query: string) {
  const products = getProductsStable();
  
  const searchResults = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase()) ||
    product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  const memoizedValue = useMemo(
    () => ({
      searchResults,
      searchLoading: false,
      searchError: null,
      searchValidating: false,
      searchEmpty: !searchResults.length,
    }),
    [searchResults]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

// CRUD Operations
export const productMockAPI = {
  // Create new product
  create: (data: Partial<IProductItem>): IProductItem => {
    const products = getStoredProducts();
    const newProduct: IProductItem = {
      id: Date.now().toString(),
      sku: data.sku || '',
      name: data.name || '',
      code: data.code || '',
      price: data.price || 0,
      taxes: data.taxes || 0,
      tags: data.tags || [],
      size: data.size || '',
      publish: data.publish || 'draft',
      coverUrl: data.coverUrl || '',
      images: data.images || [],
      colors: data.colors || [],
      quantity: data.quantity || 0,
      category: data.category || '',
      available: data.available || data.quantity || 0,
      totalSold: 0,
      description: data.description || '',
      totalRatings: 0,
      totalReviews: 0,
      createdAt: new Date().toISOString(),
      inventoryType: data.inventoryType || 'in_stock',
      subDescription: data.subDescription || '',
      priceSale: data.priceSale || null,
      reviews: [],
      newLabel: data.newLabel || { content: '', enabled: false },
      saleLabel: data.saleLabel || { content: '', enabled: false },
      ratings: [],
    };

    const updatedProducts = [newProduct, ...products]; // New items at top
    saveToStorage(updatedProducts);
    clearProductsCache(); // Clear cache to refresh data
    return newProduct;
  },

  // Update existing product
  update: (id: string, data: Partial<IProductItem>): IProductItem | null => {
    const products = getStoredProducts();
    const index = products.findIndex((prod) => prod.id === id);
    
    if (index === -1) return null;

    const updatedProduct: IProductItem = {
      ...products[index],
      ...data,
      id, // Ensure ID doesn't change
    };

    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;
    saveToStorage(updatedProducts);
    clearProductsCache(); // Clear cache to refresh data
    return updatedProduct;
  },

  // Delete product
  delete: (id: string): boolean => {
    const products = getStoredProducts();
    const filteredProducts = products.filter((prod) => prod.id !== id);
    
    if (filteredProducts.length === products.length) return false; // Not found
    
    saveToStorage(filteredProducts);
    clearProductsCache(); // Clear cache to refresh data
    return true;
  },

  // Delete multiple products
  deleteMany: (ids: string[]): number => {
    const products = getStoredProducts();
    const filteredProducts = products.filter((prod) => !ids.includes(prod.id));
    const deletedCount = products.length - filteredProducts.length;
    
    saveToStorage(filteredProducts);
    clearProductsCache(); // Clear cache to refresh data
    return deletedCount;
  },

  // Clear all data (reset to defaults)
  reset: (): void => {
    saveToStorage(_products);
    clearProductsCache(); // Clear cache to refresh data
  },

  // Get all products (for direct access)
  getAll: (): IProductItem[] => getStoredProducts(),

  // Filter by category
  getByCategory: (category: string): IProductItem[] => {
    const products = getStoredProducts();
    return products.filter((product) => product.category === category);
  },
}; 