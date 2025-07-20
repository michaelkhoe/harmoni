import type { IProductItem } from 'src/types/product';

import { z as zod } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useCallback, useMemo } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import {
  _tags,
} from 'src/_mock';
import { productMockAPI } from 'src/actions/product-mock';
import { useGetCategories } from 'src/actions/category-mock';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  description: schemaHelper
    .editor({ message: 'Description is required!' })
    .min(100, { message: 'Description must be at least 100 characters' })
    .max(500, { message: 'Description must be less than 500 characters' }),
  images: schemaHelper.files({ message: 'Images is required!' }),
  code: zod.string().min(1, { message: 'Product code is required!' }),
  sku: zod.string().min(1, { message: 'Product sku is required!' }),
  quantity: schemaHelper.nullableInput(
    zod.number({ coerce: true }).min(1, { message: 'Quantity is required!' }),
    {
      message: 'Quantity is required!',
    }
  ),
  color: zod.string().min(1, { message: 'Color is required!' }),
  size: zod.string().min(1, { message: 'Size is required!' }),
  tags: zod.string().array().min(2, { message: 'Must have at least 2 items!' }),
  costPrice: schemaHelper.nullableInput(
    zod.number({ coerce: true }).min(1, { message: 'Cost price is required!' }),
    {
      message: 'Cost price is required!',
    }
  ),
  salePrice: schemaHelper.nullableInput(
    zod.number({ coerce: true }).min(1, { message: 'Sale price is required!' }),
    {
      message: 'Sale price is required!',
    }
  ),
  category: zod.string().min(1, { message: 'Category is required!' }),
  subDescription: zod.string(),
  taxes: zod.number({ coerce: true }).nullable(),
  publish: zod.string().optional(),
});

// ----------------------------------------------------------------------

type Props = {
  currentProduct?: IProductItem;
};

export function ProductNewEditForm({ currentProduct }: Props) {
  const router = useRouter();
  const { categories } = useGetCategories();

  const [includeTaxes, setIncludeTaxes] = useState(false);
  const [qrCode, setQRCode] = useState<string>(currentProduct?.qrCode || '');
  const [qrCodeId, setQRCodeId] = useState<string>(currentProduct?.qrCodeId || '');

  const defaultValues: NewProductSchemaType = useMemo(() => ({
    name: '',
    description: '',
    subDescription: '',
    images: [],
    /********/
    code: '',
    sku: '',
    costPrice: null,
    salePrice: null,
    taxes: null,
    quantity: null,
    tags: [],
    category: categories?.[0]?.name || '',
    color: '',
    size: '',
    publish: 'draft',
  }), [categories]);

  const methods = useForm<NewProductSchemaType>({
    resolver: zodResolver(NewProductSchema),
    defaultValues,
    values: currentProduct,
  });

  const {
    reset,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Handle file upload - convert File to URL string for images
      const processedImages = data.images && Array.isArray(data.images) 
        ? data.images.map((file: any) => 
            file instanceof File ? URL.createObjectURL(file) : file
          )
        : data.images || [];
      
      // Generate QR code if product code and SKU are provided and it's a published product
      let finalQRCode = qrCode;
      let finalQRCodeId = qrCodeId;
      
      if (data.code && data.sku && data.publish === 'published' && !qrCodeId) {
        try {
          const { generateQRCodeId, generateQRCodeDataURL } = await import('src/utils/qr-code');
          finalQRCodeId = generateQRCodeId(data.code, data.sku);
          finalQRCode = await generateQRCodeDataURL(finalQRCodeId);
          setQRCode(finalQRCode);
          setQRCodeId(finalQRCodeId);
          toast.success('QR code generated for product!');
        } catch (error) {
          console.error('Error generating QR code:', error);
          toast.warning('Product saved, but QR code generation failed');
        }
      }
      
      const processedData = {
        ...data,
        images: processedImages as string[],
        coverUrl: (processedImages && processedImages.length > 0 ? processedImages[0] : '') as string,
        costPrice: data.costPrice || 0,
        salePrice: data.salePrice || 0,
        quantity: data.quantity || 0,
        taxes: data.taxes || 0,
        qrCode: finalQRCode || undefined,
        qrCodeId: finalQRCodeId || undefined,
      };
      
      if (currentProduct) {
        // Update existing product
        productMockAPI.update(currentProduct.id, processedData);
        toast.success('Product updated successfully!');
      } else {
        // Create new product
        productMockAPI.create(processedData);
        toast.success('Product created successfully!');
      }
      
      reset();
      router.push(paths.dashboard.product.root);
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    }
  });

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const currentImages = getValues('images') || [];
      const filtered = currentImages.filter((file) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, getValues]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', [], { shouldValidate: true });
  }, [setValue]);

  const handleChangeIncludeTaxes = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setIncludeTaxes(event.target.checked);
  }, []);

  const renderDetails = () => (
    <Card>
      <CardHeader title="Details" subheader="Title, short description, image..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="name" label="Product name" />

        <Field.Text name="subDescription" label="Sub description" multiline rows={4} />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Content</Typography>
          <Field.Editor name="description" sx={{ maxHeight: 480 }} />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Images</Typography>
          <Field.Upload
            multiple
            thumbnail
            name="images"
            maxSize={3145728}
            onRemove={handleRemoveFile}
            onRemoveAll={handleRemoveAllFiles}
            onUpload={() => console.info('ON UPLOAD')}
          />
        </Stack>
      </Stack>
    </Card>
  );

  const renderProperties = () => (
    <Card>
      <CardHeader
        title="Properties"
        subheader="Additional functions and attributes..."
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Box
          sx={{
            rowGap: 3,
            columnGap: 2,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
          }}
        >
          <Field.Text name="code" label="Product code" />

          <Field.Text name="sku" label="Product SKU" />

          <Field.Text
            name="quantity"
            label="Quantity"
            placeholder="0"
            type="number"
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <Field.Select
            name="category"
            label="Category"
            slotProps={{
              select: { native: true },
              inputLabel: { shrink: true },
            }}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Field.Select>

          <Field.Text 
            name="color" 
            label="Color/Finish" 
            placeholder="e.g., Matte Black, Brushed Aluminum, Wood Grain, Gradient Blue"
            helperText="Enter color, finish, material appearance, or pattern description"
          />

          <Field.Text 
            name="size" 
            label="Size/Dimensions" 
            placeholder="e.g., 15.6-inch, 120x80x75cm, 256GB, Large"
            helperText="Enter size, dimensions, capacity, or any relevant specifications"
          />
        </Box>

        <Field.Autocomplete
          name="tags"
          label="Tags"
          placeholder="+ Tags"
          multiple
          freeSolo
          disableCloseOnSelect
          options={_tags.map((option) => option)}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        />


      </Stack>
    </Card>
  );

  const renderPricing = () => (
    <Card>
      <CardHeader title="Pricing" subheader="Price related inputs" sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text
          name="costPrice"
          label="Cost Price"
          placeholder="0.00"
          type="number"
          helperText="Your base cost to acquire this product (harga modal)"
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 0.75 }}>
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    $
                  </Box>
                </InputAdornment>
              ),
            },
          }}
        />

        <Field.Text
          name="salePrice"
          label="Sale Price"
          placeholder="0.00"
          type="number"
          helperText="The price you sell to customers (profit = sale price - cost price)"
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 0.75 }}>
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    $
                  </Box>
                </InputAdornment>
              ),
            },
          }}
        />

        <FormControlLabel
          control={
            <Switch id="toggle-taxes" checked={includeTaxes} onChange={handleChangeIncludeTaxes} />
          }
          label="Price includes taxes"
        />

        {!includeTaxes && (
          <Field.Text
            name="taxes"
            label="Tax (%)"
            placeholder="0.00"
            type="number"
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                startAdornment: (
                  <InputAdornment position="start" sx={{ mr: 0.75 }}>
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      %
                    </Box>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      </Stack>
    </Card>
  );

  const renderQRCode = () => {
    if (!qrCodeId) {
      return (
        <Card>
          <CardHeader
            title="Product QR Code"
            subheader="QR code will be generated when you publish this product"
            sx={{ mb: 3 }}
          />
          <Divider />
          <Box sx={{ 
            p: 3,
            textAlign: 'center', 
            backgroundColor: 'grey.50',
            borderRadius: 2,
            border: '1px dashed',
            borderColor: 'grey.300',
            m: 3
          }}>
                         <Typography variant="body2" color="text.secondary">
               Make sure to fill in Product Code and SKU, then set status to &quot;Published&quot; to generate QR code.
             </Typography>
          </Box>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader
          title="Product QR Code"
          subheader="Generated QR code for this product"
          sx={{ mb: 3 }}
        />
        <Divider />
        <Box sx={{ p: 3 }}>
          {qrCode && (
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <img
                src={qrCode}
                alt="Product QR Code"
                style={{
                  maxWidth: '200px',
                  width: '100%',
                  height: 'auto',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              />
            </Box>
          )}
          
          <Box sx={{ 
            backgroundColor: 'grey.50',
            p: 2, 
            borderRadius: 1, 
            border: '1px solid',
            borderColor: 'grey.200'
          }}>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              QR Code ID:
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
              {qrCodeId}
            </Typography>
          </Box>
        </Box>
      </Card>
    );
  };

  const renderActions = () => (
    <Box
      sx={{
        gap: 3,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <FormControlLabel
        label="Publish"
        control={<Switch defaultChecked inputProps={{ id: 'publish-switch' }} />}
        sx={{ pl: 3, flexGrow: 1 }}
      />

      <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
        {!currentProduct ? 'Create product' : 'Save changes'}
      </LoadingButton>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails()}
        {renderProperties()}
        {renderPricing()}
        {renderQRCode()}
        {renderActions()}
      </Stack>
    </Form>
  );
}
