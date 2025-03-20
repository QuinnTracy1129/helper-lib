import { formatString } from './formatString.js';

export function outputCreator(creator, auth) {
  if (creator?._id === auth?._id) return 'You';

  return formatString(creator?.fullName?.fname, { capitalizeAll: true });
}
