import type { IDateValue } from './common';

// ----------------------------------------------------------------------

export type ICategoryFilters = {
  publish: string[];
  name: string;
};

export type ICategoryTableFilters = {
  publish: string[];
};

export type ICategoryItem = {
  id: string;
  name: string;
  description: string;
  slug: string;
  publish: string;
  createdAt: IDateValue;
  updatedAt: IDateValue;
  coverUrl?: string;
  totalProducts?: number;
  parentId?: string | null;
  children?: ICategoryItem[];
  isActive: boolean;
}; 