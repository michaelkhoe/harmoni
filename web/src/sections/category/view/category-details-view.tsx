'use client';

import type { ICategoryItem } from 'src/types/category';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

type Props = {
  category?: ICategoryItem;
};

export function CategoryDetailsView({ category }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Details"
        backHref={paths.dashboard.category.root}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Category', href: paths.dashboard.category.root },
          { name: category?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid size={{ xs: 12, md: 6, lg: 7 }}>
          <Card>
            <CardContent>
              {category?.coverUrl && (
                <Box sx={{ mb: 3, position: 'relative' }}>
                  <Image
                    src={category.coverUrl}
                    sx={{
                      borderRadius: 2,
                      width: '100%',
                      height: 320,
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              )}

              <Typography variant="h4" sx={{ mb: 2 }}>
                {category?.name}
              </Typography>

              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                {category?.description}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Label
                  variant="soft"
                  color={category?.publish === 'published' ? 'success' : 'warning'}
                >
                  {category?.publish}
                </Label>
                <Label variant="soft" color={category?.isActive ? 'success' : 'error'}>
                  {category?.isActive ? 'Active' : 'Inactive'}
                </Label>
              </Box>

              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Slug: {category?.slug}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 5 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Category Information
              </Typography>

              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon="solar:calendar-bold" width={20} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Created: {new Date(category?.createdAt || '').toLocaleDateString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon="solar:calendar-bold" width={20} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Updated: {new Date(category?.updatedAt || '').toLocaleDateString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon="solar:box-bold" width={20} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Total Products: {category?.totalProducts || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
} 