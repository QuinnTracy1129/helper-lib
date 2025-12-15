import html2canvas from 'html2canvas';
import { toast } from './toast.js';

/**
 * Downloads a DOM element (via ref) as an image.
 *
 * @param {{ current: HTMLElement | null }} ref
 * @param {Object} options
 * @param {string} [options.filename]
 * @param {number} [options.scale]
 * @param {string} [options.backgroundColor]
 */
export async function downloadElementAsImage(
  ref,
  { filename = 'download.png', scale = 2, backgroundColor = '#ffffff' } = {},
) {
  try {
    // SSR / environment guard
    if (typeof window === 'undefined') {
      toast({
        icon: 'error',
        text: '[downloadElementAsImage] Window is undefined',
      });
      return;
    }

    if (!ref || !ref.current) {
      toast({
        icon: 'error',
        text: '[downloadElementAsImage] Invalid or empty ref',
      });
      console.warn('[downloadElementAsImage]', ref);
      return;
    }

    if (!(ref.current instanceof HTMLElement)) {
      toast({
        icon: 'error',
        text: '[downloadElementAsImage] ref.current is not an HTMLElement',
      });
      console.warn('[downloadElementAsImage]', ref.current);
      return;
    }

    const canvas = await html2canvas(ref.current, {
      scale,
      backgroundColor,
      useCORS: true,
    });

    const dataUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      icon: 'success',
      text: '[downloadElementAsImage] Download successful',
    });
    console.info('[downloadElementAsImage]', filename);
  } catch (error) {
    toast({
      icon: 'error',
      text: '[downloadElementAsImage] Failed to download element as image',
    });
    console.error('[downloadElementAsImage] Failed to download element as image', error);
  }
}
