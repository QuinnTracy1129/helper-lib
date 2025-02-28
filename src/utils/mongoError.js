// MongoDB Error handler
export function mongoError({ name, message, code, keyValue }) {
  if (name === 'MongoServerError' && code === 11000) {
    return {
      code: 409,
      payload: {
        error: 'DUPLICATE_ENTRY',
        message: Object.keys(keyValue).map((key) => `[${key.toUpperCase()}] Is already taken.`),
      },
    };
  }

  return {
    code: 500,
    payload: {
      error: 'INTERNAL_SERVER_ERROR',
      message,
    },
  };
}
