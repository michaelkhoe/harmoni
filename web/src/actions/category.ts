import type { SWRConfiguration } from 'swr';
import type { ICategoryItem } from 'src/types/category';

import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

const swrOptions: SWRConfiguration = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

type CategoriesData = {
  categories: ICategoryItem[];
};

export function useGetCategories() {
  const url = endpoints.category.list;

  const { data, isLoading, error, isValidating } = useSWR<CategoriesData>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      categories: data?.categories || [],
      categoriesLoading: isLoading,
      categoriesError: error,
      categoriesValidating: isValidating,
      categoriesEmpty: !isLoading && !isValidating && !data?.categories.length,
    }),
    [data?.categories, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type CategoryData = {
  category: ICategoryItem;
};

export function useGetCategory(categoryId: string) {
  const url = categoryId ? [endpoints.category.details, { params: { categoryId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR<CategoryData>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      category: data?.category,
      categoryLoading: isLoading,
      categoryError: error,
      categoryValidating: isValidating,
    }),
    [data?.category, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type SearchResultsData = {
  results: ICategoryItem[];
};

export function useSearchCategories(query: string) {
  const url = query ? [endpoints.category.search, { params: { query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR<SearchResultsData>(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
} 