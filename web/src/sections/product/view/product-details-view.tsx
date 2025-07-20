'use client';

import type { IProductItem } from 'src/types/product';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { PRODUCT_PUBLISH_OPTIONS } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { ProductDetailsSummary } from '../product-details-summary';
import { ProductDetailsToolbar } from '../product-details-toolbar';
import { ProductDetailsCarousel } from '../product-details-carousel';
import { ProductDetailsDescription } from '../product-details-description';

// ----------------------------------------------------------------------

type Props = {
  product?: IProductItem;
};

export function ProductDetailsView({ product }: Props) {
  const [publish, setPublish] = useState('');

  useEffect(() => {
    if (product) {
      setPublish(product?.publish);
    }
  }, [product]);

  const handleChangePublish = useCallback((newValue: string) => {
    setPublish(newValue);
  }, []);

  // Handle case when product is not found
  if (!product) {
    return (
      <DashboardContent>
        <Box
          sx={{
            py: 12,
            maxWidth: 480,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            Product Not Found
          </Typography>
          
          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            The product you&apos;re looking for doesn&apos;t exist or may have been removed.
          </Typography>

          <Box
            sx={{
              width: 260,
              height: 200,
              backgroundColor: 'grey.200',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              my: { xs: 5, sm: 10 },
            }}
          >
            <Typography variant="h1" sx={{ color: 'grey.400', fontSize: '4rem' }}>
              404
            </Typography>
          </Box>
        </Box>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <ProductDetailsToolbar
        backHref={paths.dashboard.product.root}
        editHref={paths.dashboard.product.edit(`${product?.id}`)}
        publish={publish}
        onChangePublish={handleChangePublish}
        publishOptions={PRODUCT_PUBLISH_OPTIONS}
      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid size={{ xs: 12, md: 6, lg: 7 }}>
          <ProductDetailsCarousel images={product?.images ?? []} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 5 }}>
          {product && <ProductDetailsSummary product={product} />}
        </Grid>
      </Grid>



      <Card>
        <ProductDetailsDescription description={product?.description ?? ''} />
      </Card>
    </DashboardContent>
  );
}
