import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { ProductDetailsView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Product details | Dashboard - ${CONFIG.appName}` };

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = params;

  const { product } = await getProduct(id);

  return <ProductDetailsView product={product} />;
}

// ----------------------------------------------------------------------

async function getProduct(id: string) {
  // Mock implementation for development
  try {
    // Import both the mock API and the raw products data
    const [{ productMockAPI }, { _products }] = await Promise.all([
      import('src/actions/product-mock'),
      import('src/_mock/product')
    ]);
    
    // Try to get products from mock API first
    let products = productMockAPI.getAll();
    
    // Fallback to raw products if mock API returns empty (server-side issue)
    if (!products || products.length === 0) {
      products = _products;
    }
    
    const product = products.find((prod) => prod.id === id);
    
    console.log(`[Server] Looking for product ID: ${id}`);
    console.log(`[Server] Total products available: ${products.length}`);
    console.log(`[Server] Found product: ${product ? product.name : 'Not found'}`);
    
    return { product };
  } catch (error) {
    console.error('[Server] Error fetching product:', error);
    
    // Fallback to direct import of products
    const { _products } = await import('src/_mock/product');
    const product = _products.find((prod) => prod.id === id);
    
    return { product };
  }
}

/**
 * [1] Default
 * Remove [1] and [2] if not using [2]
 * Will remove in Next.js v15
 */
const dynamic = CONFIG.isStaticExport ? 'auto' : 'force-dynamic';
export { dynamic };

/**
 * [2] Static exports
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
export async function generateStaticParams() {
  if (CONFIG.isStaticExport) {
    // Mock implementation for development
    const { productMockAPI } = await import('src/actions/product-mock');
    const products = productMockAPI.getAll();

    return products.map((product: { id: string }) => ({ id: product.id }));
  }
  return [];
}
