import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';

import { generateQRCodeId, generateQRCodeDataURL } from 'src/utils/qr-code';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type ProductQRCodeProps = {
  productCode: string;
  sku: string;
  isPublished?: boolean;
  existingQRCode?: string;
  existingQRCodeId?: string;
  onQRCodeGenerated?: (qrCode: string, qrCodeId: string) => void;
};

export function ProductQRCode({
  productCode,
  sku,
  isPublished = false,
  existingQRCode,
  existingQRCodeId,
  onQRCodeGenerated,
}: ProductQRCodeProps) {
  const [qrCode, setQRCode] = useState<string>(existingQRCode || '');
  const [qrCodeId, setQRCodeId] = useState<string>(existingQRCodeId || '');
  const [isGenerating, setIsGenerating] = useState(false);

  // Auto-generate QR code when product is published and doesn't have one
  useEffect(() => {
    if (isPublished && !existingQRCode && productCode && sku) {
      handleGenerateQRCode();
    }
  }, [isPublished, existingQRCode, productCode, sku]);

  const handleGenerateQRCode = async () => {
    if (!productCode || !sku) {
      toast.error('Product code and SKU are required to generate QR code');
      return;
    }

    setIsGenerating(true);
    try {
      const newQRCodeId = generateQRCodeId(productCode, sku);
      const newQRCode = await generateQRCodeDataURL(newQRCodeId);
      
      setQRCode(newQRCode);
      setQRCodeId(newQRCodeId);
      
      // Notify parent component
      onQRCodeGenerated?.(newQRCode, newQRCodeId);
      
      toast.success('QR code generated successfully!');
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error('Failed to generate QR code');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadQRCode = () => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.download = `qr-code-${qrCodeId}.png`;
    link.href = qrCode;
    link.click();
  };

  const handleCopyQRCodeId = async () => {
    if (!qrCodeId) return;
    
    try {
      await navigator.clipboard.writeText(qrCodeId);
      toast.success('QR code ID copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error('Failed to copy QR code ID');
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Product QR Code
        </Typography>
        
        {qrCode ? (
          <Box>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <img
                src={qrCode}
                alt="Product QR Code"
                style={{
                  maxWidth: '200px',
                  height: 'auto',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                }}
              />
            </Box>
            
            <Typography variant="body2" color="text.secondary" gutterBottom>
              QR Code ID: {qrCodeId}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<Iconify icon="eva:download-outline" />}
                onClick={handleDownloadQRCode}
              >
                Download
              </Button>
              
              <Button
                size="small"
                variant="outlined"
                startIcon={<Iconify icon="eva:copy-outline" />}
                onClick={handleCopyQRCodeId}
              >
                Copy ID
              </Button>
              
              <Button
                size="small"
                variant="outlined"
                startIcon={<Iconify icon="eva:refresh-outline" />}
                onClick={handleGenerateQRCode}
                disabled={isGenerating}
              >
                Regenerate
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            {isGenerating ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <CircularProgress />
                <Typography variant="body2" color="text.secondary">
                  Generating QR code...
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Iconify icon="material-symbols:qr-code-2" sx={{ fontSize: 48, color: 'text.disabled' }} />
                <Typography variant="body2" color="text.secondary">
                  {!isPublished 
                    ? 'QR code will be generated when product is published'
                    : 'No QR code generated yet'
                  }
                </Typography>
                {isPublished && (
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="material-symbols:qr-code-2" />}
                    onClick={handleGenerateQRCode}
                    disabled={!productCode || !sku}
                  >
                    Generate QR Code
                  </Button>
                )}
              </Box>
            )}
          </Box>
        )}
        
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
          This QR code contains unique product information and can be used for inventory tracking, 
          product verification, and customer engagement.
        </Typography>
      </CardContent>
    </Card>
  );
} 