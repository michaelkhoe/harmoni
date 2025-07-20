import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import axios, { endpoints } from 'src/lib/axios';

import { CategoryDetailsView } from 'src/sections/category/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Category details | Dashboard - ${CONFIG.appName}` };

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = params;

  const { category } = await getCategory(id);

  return <CategoryDetailsView category={category} />;
}

// ----------------------------------------------------------------------

async function getCategory(id: string) {
  // Mock implementation for development
  const { categoryMockAPI } = await import('src/actions/category-mock');
  const categories = categoryMockAPI.getAll();
  const category = categories.find((cat) => cat.id === id);
  
  return { category };
} 