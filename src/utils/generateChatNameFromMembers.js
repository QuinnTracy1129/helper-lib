import { formatFullname } from './formatFullname.js';

export function generateChatNameFromMembers(members, auth) {
  const filteredMembers = members.filter(({ details }) => details?._id !== auth?._id);

  // if we only have 2 members, this is just a PM
  if (members.length === 2)
    // return the member that is NOT the user
    return formatFullname(filteredMembers[0]?.details?.fullName);

  return filteredMembers.map(({ details }) => details?.fullName?.fname).join(', ');
}
