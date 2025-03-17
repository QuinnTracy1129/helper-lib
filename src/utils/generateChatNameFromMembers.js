import { formatFullname } from './formatFullname.js';

export function generateChatNameFromMembers(creator, members, auth) {
  // if we only have 2 members, this is just a PM
  if (members.length === 2) {
    // return the member that is NOT the user
    const member = members.filter(({ details }) => details?._id !== auth?._id);

    return formatFullname(member[0]?.details?.fullName);
  }

  // if there are more than 2 members
  if (creator?._id === auth?._id)
    return members.map(({ details }) => details?.fullName?.fname).join(', ');

  const filteredMembers = members
    .filter(({ details }) => details?._id !== auth?._id)
    .map(({ details }) => details?.fullName?.fname);

  return [creator?.fullName?.fname, ...filteredMembers].join(', ');
}
