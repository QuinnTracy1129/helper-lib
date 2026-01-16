// used to manipulate redux state when updating or deleting
export function manipulateState(state, payload, options = {}) {
  const statesToBeManipulated = ['storage', 'collection'];

  const { shouldDelete = false, shouldPush = false, shouldUnshift = false } = options;

  if (shouldDelete) {
    for (const key of statesToBeManipulated) {
      const index = state[key].findIndex(({ _id }) => _id === payload?._id);

      if (index > -1) state[key].splice(index, 1);
    }
  } else {
    for (const key of statesToBeManipulated) {
      const index = state[key].findIndex(({ _id }) => _id === payload?._id);

      if (shouldPush || shouldUnshift) {
        if (index > -1) {
          state[key].splice(index, 1);

          if (shouldPush) state[key].push(payload);
          if (shouldUnshift) state[key].unshift(payload);
        }
      } else {
        if (index > -1) state[key][index] = payload;
      }
    }
  }
}
