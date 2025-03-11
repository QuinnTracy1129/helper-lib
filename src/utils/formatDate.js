export function formatDate(val, options = {}) {
  if (!val) return '-';

  const date = new Date(val);
  if (isNaN(date.getTime())) return '---';

  const { fullDate, shortDate, utc, time, fullDateTime } = options;

  // Tuesday, March 11, 2025
  if (fullDate)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  // 03/11/25
  if (shortDate)
    return date.toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    });

  // this should be used when fetching data in mongodb using dates
  // 2025-03-10T11:27:37.374Z
  if (utc) return date.toISOString();

  // 14:30:00
  if (time) return date.toTimeString().split(' ')[0];

  // Tuesday, March 11, 2025, 14:30:00
  if (fullDateTime)
    return `${formatDate(val, { fullDate: true })}, ${formatDate(val, { time: true })}`;

  // Tue March 11 2025
  return date.toDateString();
}
