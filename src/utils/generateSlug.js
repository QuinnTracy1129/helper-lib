export function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/[^a-z0-9_]/g, ''); // Remove special characters except underscore
}
