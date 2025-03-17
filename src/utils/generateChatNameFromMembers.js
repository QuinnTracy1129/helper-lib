import { formatFullname } from './formatFullname.js';

export function generateChatNameFromMembers(creator, members, auth) {
  // if we only have 1 member, this is just a PM
  if (members.length === 1) {
    if (creator?._id === auth?._id) return formatFullname(members[0]?.details?.fullName);

    return formatFullname(creator?.fullName);
  }

  // if you are the creator, generate name from members
  if (creator?._id === auth?._id)
    return members.map(({ details }) => details?.fullName?.fname).join(', ');

  const filteredMembers = members
    .filter(({ details }) => details?._id !== auth?._id)
    .map(({ details }) => details?.fullName?.fname);

  return [creator?.fullName?.fname, ...filteredMembers].join(', ');
}
