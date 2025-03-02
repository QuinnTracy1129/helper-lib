// MongoDB Error handler
export function mongoError({ name, message, code, keyValue }) {
  if (name === 'MongoServerError' && code === 11000) {
    return {
      code: 409,
      payload: {
        error: 'DUPLICATE_ENTRY',
        // this is how the mongo formats its error
        message: Object.keys(keyValue).map((key) => `[${key.toUpperCase()}] Is already taken.`),
      },
    };
  }

  if (code === 400)
    return {
      code,
      payload: {
        error: 'INVALID_PARAMETERS',
        // this is a custom keyValue, we can manipulate the output before sending it back
        // convert keyValue to entries, filter with only the keys without a value
        // send it back to the user, telling them that it is required
        message: Object.entries(keyValue)
          .filter(([key, val]) => key && !val)
          .map(([key]) => `[${key}] Is required.`),
      },
    };

  return {
    code: 500,
    payload: {
      error: 'INTERNAL_SERVER_ERROR',
      message,
    },
  };
}
