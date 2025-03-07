import { formatString } from './formatString.js';

export function formatFullname(name, options = {}) {
  if (typeof name !== 'object') return '-';

  let { fname = '', mname = '', lname = '', suffix = '' } = name;

  if (!fname || !lname) return '---';

  const { useMiddleInitial = true, capitalizeAll = true, direction = 'FML' } = options;

  fname = formatString(fname, { capitalizeAll });
  lname = formatString(lname, { capitalizeAll });

  if (suffix) suffix = ` ${formatString(suffix, { capitalizeAll })}`;

  if (mname) {
    if (useMiddleInitial) {
      mname = String(mname)
        .split(' ')
        .map((word) => `${word.charAt(0).toUpperCase()}.`)
        .join(' ');
    } else {
      mname = formatString(mname, { capitalizeAll });
    }

    // once the mname is processed, attach a space to it.
    mname = `${mname} `;
  }

  // Initially generate a Last, First, Middle direction
  let parsedString = `${lname}, ${fname} ${mname}${suffix}`;

  // Override the value with First, Middle, Last
  if (direction === 'FML') parsedString = `${fname}, ${mname}${lname}${suffix}`;

  // clean the string before returning
  return parsedString.replace(/\s+/g, ' ').trim();
}
