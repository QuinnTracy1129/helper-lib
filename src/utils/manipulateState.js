// used to manipulate redux state when updating or deleting
export function manipulateState(state, payload, shouldDelete = false) {
  const statesToBeManipulated = ['storage', 'collection'];

  if (shouldDelete) {
    for (const key of statesToBeManipulated) {
      const index = state[key].findIndex(({ _id }) => _id === payload?._id);

      if (index > -1) state[key].splice(index, 1);
    }
  } else {
    for (const key of statesToBeManipulated) {
      const index = state[key].findIndex(({ _id }) => _id === payload?._id);

      if (index > -1) state[key][index] = payload;
    }
  }
}
