import fs from 'fs';
import path from 'path';

/**
 * Konvertiert das Logo in Base64 für E-Mail-Einbettung
 */
export function getLogoBase64(): string {
  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  const logoBuffer = fs.readFileSync(logoPath);
  return `data:image/png;base64,${logoBuffer.toString('base64')}`;
}
