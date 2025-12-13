import { toast } from './toast.js';

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);

    toast({ icon: 'success', text: 'Copied to clipboard.' });
  } catch (err) {
    toast({
      icon: 'error',
      text: err,
    });
    return false;
  }
}
