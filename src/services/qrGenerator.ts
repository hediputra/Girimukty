/**
 * QR Code Generator for Document Verification and Tracking
 */
import QRCode from 'qrcode';

export async function generateQrCodeDataUrl(data: string): Promise<string> {
  try {
    return await QRCode.toDataURL(data, {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 200,
      color: {
        dark: '#0B3D6E',
        light: '#FFFFFF'
      }
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    // Return empty string on fallback
    return '';
  }
}
