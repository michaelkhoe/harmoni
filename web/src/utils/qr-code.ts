import QRCode from 'qrcode';

// Generate a unique QR code ID based on product information
export function generateQRCodeId(productCode: string, sku: string): string {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  // Format: PRODUCTCODE-SKU-TIMESTAMP-RANDOM
  return `${productCode}-${sku}-${timestamp}-${randomSuffix}`;
}

// Generate QR code data URL
export async function generateQRCodeDataURL(qrCodeId: string): Promise<string> {
  try {
    // You can customize the QR code data format here
    // This could include product URL, product info, or just the unique ID
    const qrData = JSON.stringify({
      id: qrCodeId,
      type: 'product',
      timestamp: new Date().toISOString(),
      // You could add more data like product URL, etc.
      // url: `${window.location.origin}/product/${qrCodeId}`
    });

    const qrCodeDataURL = await QRCode.toDataURL(qrData, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    });

    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

// Parse QR code data
export function parseQRCodeData(qrData: string): { id: string; type: string; timestamp: string } | null {
  try {
    const parsed = JSON.parse(qrData);
    if (parsed.type === 'product' && parsed.id) {
      return parsed;
    }
    return null;
  } catch (error) {
    console.error('Error parsing QR code data:', error);
    return null;
  }
}

// Validate QR code ID format
export function isValidQRCodeId(qrCodeId: string): boolean {
  // Format: PRODUCTCODE-SKU-TIMESTAMP-RANDOM
  const pattern = /^[A-Z0-9]+-[A-Z0-9]+-\d{13}-[A-Z0-9]{6}$/;
  return pattern.test(qrCodeId);
} 