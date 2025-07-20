import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { generateQRCodeDataURL } from 'src/utils/qr-code';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type QRCodePopupProps = {
  open: boolean;
  onClose: () => void;
  productName: string;
  qrCodeId?: string;
  qrCode?: string;
};

export function QRCodePopup({ 
  open, 
  onClose, 
  productName, 
  qrCodeId, 
  qrCode: existingQRCode 
}: QRCodePopupProps) {
  const [qrCode, setQRCode] = useState<string>(existingQRCode || '');
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate QR code if we have an ID but no QR code image
  useEffect(() => {
    if (open && qrCodeId && !existingQRCode) {
      const generateCode = async () => {
        setIsGenerating(true);
        try {
          const generatedQRCode = await generateQRCodeDataURL(qrCodeId);
          setQRCode(generatedQRCode);
        } catch (error) {
          console.error('Error generating QR code:', error);
          toast.error('Failed to generate QR code');
        } finally {
          setIsGenerating(false);
        }
      };
      generateCode();
    }
  }, [open, qrCodeId, existingQRCode]);

  const handleDownloadQRCode = () => {
    if (!qrCode || !qrCodeId) return;
    
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
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6">Product QR Code</Typography>
            <Typography variant="body2" color="text.secondary">
              {productName}
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {qrCodeId ? (
          <Box>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              {isGenerating ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 4 }}>
                  <CircularProgress />
                  <Typography variant="body2" color="text.secondary">
                    Generating QR code...
                  </Typography>
                </Box>
              ) : qrCode ? (
                <img
                  src={qrCode}
                  alt="Product QR Code"
                  style={{
                    maxWidth: '300px',
                    width: '100%',
                    height: 'auto',
                    border: '1px solid #e0e0e0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                />
              ) : (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Iconify 
                    icon="material-symbols:qr-code-2" 
                    sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} 
                  />
                  <Typography variant="body2" color="text.secondary">
                    QR code not available
                  </Typography>
                </Box>
              )}
            </Box>
            
            <Box sx={{ 
              backgroundColor: 'grey.50', 
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
              This QR code contains unique product information for inventory tracking and verification.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Iconify 
              icon="material-symbols:qr-code-2-outline" 
              sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} 
            />
            <Typography variant="body2" color="text.secondary">
              No QR code available for this product
            </Typography>
          </Box>
        )}
      </DialogContent>

      {qrCodeId && qrCode && (
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="eva:copy-outline" />}
            onClick={handleCopyQRCodeId}
            size="small"
          >
            Copy ID
          </Button>
          
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:download-outline" />}
            onClick={handleDownloadQRCode}
            size="small"
          >
            Download
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
} 