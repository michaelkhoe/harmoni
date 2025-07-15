import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import axios, { endpoints } from 'src/lib/axios';

import { CategoryEditView } from 'src/sections/category/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Category edit | Dashboard - ${CONFIG.appName}` };

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = params;

  const { category } = await getCategory(id);

  return <CategoryEditView category={category} />;
}

// ----------------------------------------------------------------------

async function getCategory(id: string) {
  // Mock implementation for development
  const { categoryMockAPI } = await import('src/actions/category-mock');
  const categories = categoryMockAPI.getAll();
  const category = categories.find((cat) => cat.id === id);
  
  return { category };
}

/**
 * [2] Static exports
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
export async function generateStaticParams() {
  if (CONFIG.isStaticExport) {
    // Mock implementation for development
    const { categoryMockAPI } = await import('src/actions/category-mock');
    const categories = categoryMockAPI.getAll();

    return categories.map((category: { id: string }) => ({ id: category.id }));
  }
  return [];
} 