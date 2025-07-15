import type { ICategoryItem } from 'src/types/category';

import { useMemo } from 'react';

import { _categories } from 'src/_mock/category';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'mock-categories';

// FIXED: Create a stable categories cache to prevent infinite loops
let categoriesCache: ICategoryItem[] | null = null;
let cacheInitialized = false;

// Helper functions for localStorage
const getStoredCategories = (): ICategoryItem[] => {
  if (typeof window === 'undefined') return _categories;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : _categories;
  } catch {
    return _categories;
  }
};

const setStoredCategories = (categories: ICategoryItem[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Failed to store categories:', error);
  }
};

// Initialize with mock data if localStorage is empty
const initializeCategories = (): void => {
  if (typeof window === 'undefined') return;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    setStoredCategories(_categories);
  }
};

const getCategoriesStable = (): ICategoryItem[] => {
  if (!cacheInitialized) {
    initializeCategories();
    categoriesCache = getStoredCategories();
    cacheInitialized = true;
  }
  return categoriesCache || _categories;
};

// Clear cache when categories change
const clearCategoriesCache = (): void => {
  categoriesCache = null;
  cacheInitialized = false;
};

// ----------------------------------------------------------------------

export function useGetCategories() {
  const categories = getCategoriesStable();

  const memoizedValue = useMemo(
    () => ({
      categories,
      categoriesLoading: false,
      categoriesError: null,
      categoriesValidating: false,
      categoriesEmpty: !categories.length,
    }),
    [categories]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetCategory(categoryId: string) {
  const categories = getCategoriesStable();
  const category = categories.find((cat) => cat.id === categoryId);

  const memoizedValue = useMemo(
    () => ({
      category,
      categoryLoading: false,
      categoryError: category ? null : new Error('Category not found'),
      categoryValidating: false,
    }),
    [category]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchCategories(query: string) {
  const categories = getCategoriesStable();
  
  const searchResults = categories.filter((category) =>
    category.name.toLowerCase().includes(query.toLowerCase()) ||
    category.description.toLowerCase().includes(query.toLowerCase()) ||
    category.slug.toLowerCase().includes(query.toLowerCase())
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
export const categoryMockAPI = {
  // Create new category
  create: (data: Partial<ICategoryItem>): ICategoryItem => {
    const categories = getStoredCategories();
    const newCategory: ICategoryItem = {
      id: Date.now().toString(),
      name: data.name || '',
      description: data.description || '',
      slug: data.slug || '',
      publish: data.publish || 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      coverUrl: data.coverUrl || '',
      totalProducts: 0,
      parentId: data.parentId || null,
      isActive: data.isActive ?? true,
    };

    const updatedCategories = [newCategory, ...categories];
    setStoredCategories(updatedCategories);
    clearCategoriesCache(); // Clear cache to refresh data
    return newCategory;
  },

  // Update existing category
  update: (id: string, data: Partial<ICategoryItem>): ICategoryItem | null => {
    const categories = getStoredCategories();
    const index = categories.findIndex((cat) => cat.id === id);
    
    if (index === -1) return null;

    const updatedCategory: ICategoryItem = {
      ...categories[index],
      ...data,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };

    const updatedCategories = [...categories];
    updatedCategories[index] = updatedCategory;
    setStoredCategories(updatedCategories);
    clearCategoriesCache(); // Clear cache to refresh data
    return updatedCategory;
  },

  // Delete category
  delete: (id: string): boolean => {
    const categories = getStoredCategories();
    const filteredCategories = categories.filter((cat) => cat.id !== id);
    
    if (filteredCategories.length === categories.length) return false; // Not found
    
    setStoredCategories(filteredCategories);
    clearCategoriesCache(); // Clear cache to refresh data
    return true;
  },

  // Delete multiple categories
  deleteMany: (ids: string[]): number => {
    const categories = getStoredCategories();
    const filteredCategories = categories.filter((cat) => !ids.includes(cat.id));
    const deletedCount = categories.length - filteredCategories.length;
    
    setStoredCategories(filteredCategories);
    clearCategoriesCache(); // Clear cache to refresh data
    return deletedCount;
  },

  // Clear all data (reset to defaults)
  reset: (): void => {
    setStoredCategories(_categories);
    clearCategoriesCache(); // Clear cache to refresh data
  },

  // Get all categories (for direct access)
  getAll: (): ICategoryItem[] => getStoredCategories(),
}; 