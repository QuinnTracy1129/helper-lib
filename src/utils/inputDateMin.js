export function inputDateMin(year) {
  const today = new Date();

  const minAdultDate = new Date(today.getFullYear() - year, today.getMonth(), today.getDate());
  return minAdultDate.toISOString().split('T')[0];
}
