import type { ICategoryItem } from 'src/types/category';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { categoryMockAPI } from 'src/actions/category-mock';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type NewCategorySchemaType = zod.infer<typeof NewCategorySchema>;

export const NewCategorySchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  description: zod.string().min(1, { message: 'Description is required!' }),
  slug: zod.string().min(1, { message: 'Slug is required!' }),
  publish: zod.string(),
  isActive: zod.boolean(),
  coverUrl: zod.union([zod.string(), zod.any()]).optional(),
  parentId: zod.string().optional().nullable(),
});

// ----------------------------------------------------------------------

type Props = {
  currentCategory?: ICategoryItem;
};

export function CategoryNewEditForm({ currentCategory }: Props) {
  const router = useRouter();

  const defaultValues: NewCategorySchemaType = {
    name: '',
    description: '',
    slug: '',
    publish: 'published',
    isActive: true,
    coverUrl: '',
    parentId: null,
  };

  const methods = useForm<NewCategorySchemaType>({
    resolver: zodResolver(NewCategorySchema),
    defaultValues,
    values: currentCategory,
  });

  const {
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Handle file upload - convert File to URL string
      let coverUrl = data.coverUrl;
      if (data.coverUrl && typeof data.coverUrl === 'object' && data.coverUrl instanceof File) {
        // Convert File to object URL for preview (in real app, upload to server)
        coverUrl = URL.createObjectURL(data.coverUrl);
      } else if (Array.isArray(data.coverUrl) && data.coverUrl.length > 0) {
        // Handle array of files (take first file)
        const file = data.coverUrl[0];
        if (file instanceof File) {
          coverUrl = URL.createObjectURL(file);
        }
      }
      
      const processedData = {
        ...data,
        coverUrl: coverUrl as string,
      };
      
      if (currentCategory) {
        // Update existing category
        categoryMockAPI.update(currentCategory.id, processedData);
        toast.success('Category updated successfully!');
      } else {
        // Create new category
        categoryMockAPI.create(processedData);
        toast.success('Category created successfully!');
      }
      
      reset();
      router.push(paths.dashboard.category.root);
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Failed to save category');
    }
  });

  // Generate slug from name when name changes
  const handleNameChange = useCallback((name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setValue('slug', slug);
  }, [setValue]);

  const renderDetails = () => (
    <Card>
      <CardHeader title="Details" subheader="Title, short description, image..." sx={{ mb: 3 }} />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text 
          name="name" 
          label="Category name"
          onChange={(event) => handleNameChange(event.target.value)}
        />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Description</Typography>
          <Field.Text name="description" label="Description" multiline rows={4} />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Slug</Typography>
          <Field.Text name="slug" label="Slug" disabled />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Cover</Typography>
          <Field.Upload name="coverUrl" maxSize={3145728} />
        </Stack>
      </Stack>
    </Card>
  );

  const renderSettings = () => (
    <Card>
      <CardHeader title="Settings" subheader="Additional settings and configuration" sx={{ mb: 3 }} />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Select name="publish" label="Publish">
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </Field.Select>

        <Field.Switch name="isActive" label="Active" />
      </Stack>
    </Card>
  );

  const renderActions = () => (
    <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting}
        sx={{ ml: 'auto' }}
      >
        {!currentCategory ? 'Create category' : 'Save changes'}
      </LoadingButton>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={5}>
        {renderDetails()}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderSettings()}

        {renderActions()}
      </Stack>
    </Form>
  );
} 