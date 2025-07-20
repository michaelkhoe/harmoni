import type { IProductItem } from 'src/types/product';

import { useMemo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { fCurrency } from 'src/utils/format-number';
import { generateQRCodeDataURL } from 'src/utils/qr-code';

// ----------------------------------------------------------------------

type Props = {
  product: IProductItem;
};

export function ProductDetailsSummary({
  product,
  ...other
}: Props) {
  const {
    name,
    size: productSize,
    costPrice,
    salePrice,
    color: productColor,
    available,
    inventoryType,
    subDescription,
  } = product;

  const [qrCode, setQRCode] = useState<string>(product.qrCode || '');
  const [qrCodeId, setQRCodeId] = useState<string>(product.qrCodeId || '');
  const [isLoadingQRCode, setIsLoadingQRCode] = useState<boolean>(false);

  // Generate QR code image if we have ID but no image
  useEffect(() => {
    if (qrCodeId && !qrCode) {
      const generateMissingQRCode = async () => {
        setIsLoadingQRCode(true);
        try {
          const generatedQRCode = await generateQRCodeDataURL(qrCodeId);
          setQRCode(generatedQRCode);
        } catch (error) {
          console.error('Error generating QR code for display:', error);
        } finally {
          setIsLoadingQRCode(false);
        }
      };
      generateMissingQRCode();
    }
  }, [qrCodeId, qrCode]);



  const renderPrice = () => (
    <Box>
      <Box sx={{ typography: 'h5', color: 'primary.main' }}>
        {fCurrency(salePrice)}
      </Box>
      <Box sx={{ 
        typography: 'body2', 
        color: 'text.secondary',
        mt: 0.5
      }}>
        Cost: {fCurrency(costPrice)} • Profit: {fCurrency(salePrice - costPrice)}
      </Box>
    </Box>
  );



  const renderColorOptions = () => (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Color
      </Typography>

      <Typography 
        variant="body2" 
        sx={{ 
          p: 1.5, 
          color: 'text.secondary',
          backgroundColor: 'grey.50',
          borderRadius: 1,
          minHeight: 40,
          display: 'flex',
          alignItems: 'center',
          maxWidth: 200
        }}
      >
        {productColor || 'Color not specified'}
      </Typography>
    </Box>
  );

  const renderSizeOptions = () => (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Size
      </Typography>

      <Box>
        <Typography 
          variant="body2" 
          sx={{ 
            p: 1.5, 
            color: 'text.secondary',
            backgroundColor: 'grey.50',
            borderRadius: 1,
            minHeight: 40,
            display: 'flex',
            alignItems: 'center',
            maxWidth: 200
          }}
        >
          {productSize || 'Size not specified'}
        </Typography>
      </Box>
    </Box>
  );

  const renderQuantity = () => (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Quantity
      </Typography>

      <Box>
        <Typography
          variant="body2"
          sx={{ 
            p: 1.5, 
            color: 'text.secondary',
            backgroundColor: 'grey.50',
            borderRadius: 1,
            minHeight: 40,
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'medium'
          }}
        >
          Available: {available}
        </Typography>
      </Box>
    </Box>
  );



  const renderSubDescription = () => (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {subDescription}
    </Typography>
  );





  const renderInventoryType = () => (
    <Box
      component="span"
      sx={{
        typography: 'overline',
        color:
          (inventoryType === 'out of stock' && 'error.main') ||
          (inventoryType === 'low stock' && 'warning.main') ||
          'success.main',
      }}
    >
      {inventoryType}
    </Box>
  );

  const renderQRCodeSection = () => {
    if (!qrCodeId) {
      return (
        <Box>
          <Typography variant="h6" gutterBottom>
            Product QR Code
          </Typography>
          <Box sx={{ 
            textAlign: 'center', 
            py: 4,
            backgroundColor: 'grey.50',
            borderRadius: 2,
            border: '1px dashed',
            borderColor: 'grey.300'
          }}>
            <Typography variant="body2" color="text.secondary">
              QR code will be generated when the product is published during creation or editing.
            </Typography>
          </Box>
        </Box>
      );
    }

    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Product QR Code
        </Typography>
        
        <Box sx={{ 
          p: 3,
          backgroundColor: 'grey.50',
          borderRadius: 2,
                     border: '1px solid',
           borderColor: 'grey.200'
         }}>
           <Box sx={{ textAlign: 'center', mb: 3 }}>
             {isLoadingQRCode ? (
               <Box sx={{ py: 4 }}>
                 <CircularProgress />
                 <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                   Generating QR code...
                 </Typography>
               </Box>
             ) : qrCode ? (
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
             ) : (
               <Typography variant="body2" color="text.secondary">
                 QR code could not be generated
               </Typography>
             )}
           </Box>
          
          <Box sx={{ 
            backgroundColor: 'white',
            p: 2, 
            borderRadius: 1, 
            mb: 2,
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

          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
            This QR code was generated during product creation and is permanent for this product.
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Stack spacing={3} sx={{ pt: 3 }} {...other}>
        <Stack spacing={2} alignItems="flex-start">
          {renderInventoryType()}

          <Typography variant="h5">{name}</Typography>

          {renderPrice()}
          {renderSubDescription()}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderColorOptions()}
        {renderSizeOptions()}
        {renderQuantity()}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderQRCodeSection()}
      </Stack>
    );
  }
