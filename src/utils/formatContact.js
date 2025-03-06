export function formatContact(str, forSaving = true) {
  if (forSaving) {
    // Remove all hyphens for saving
    return str.replace(/-/g, '');
  }

  // Remove non-numeric characters first
  let cleaned = str.replace(/\D/g, '');

  // Format as xxx-xxx-xxxx
  return cleaned
    .slice(0, 10)
    .replace(/(\d{3})(\d{3})(\d{0,4})/, (match, p1, p2, p3) =>
      p3 ? `${p1}-${p2}-${p3}` : p2 ? `${p1}-${p2}` : p1,
    );
}
