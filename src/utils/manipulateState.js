// used to manipulate redux state when updating or deleting
export function manipulateState(state, payload) {
  const statesToBeManipulated = ['storage', 'collection'];

  // string type is for deletion
  if (typeof payload === 'string') {
    for (const key of statesToBeManipulated) {
      const index = state[key].findIndex(({ _id }) => _id === payload?._id);

      if (index > -1) state[key].splice(index, 1);
    }
  } else {
    // object type is for update
    for (const key of statesToBeManipulated) {
      const index = state[key].findIndex(({ _id }) => _id === payload?._id);

      if (index > -1) state[key][index] = payload;
    }
  }
}
