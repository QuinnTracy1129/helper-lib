// import { isEmpty } from './isEmpty.js';

const filter = async (Model, criteria, options = { sort: { createdAt: -1 }, select: '' }) => {
  try {
    const { select, sort } = options;

    const payload = await Model.find(criteria).select(`${select} -password`).sort(sort).lean();

    return {
      //   code: isEmpty(payload) ? 204 : 200,
      code: 200,
      payload,
    };
  } catch (message) {
    return {
      code: 500,
      payload: {
        error: 'INTERNAL_SERVER_ERROR',
        message,
      },
    };
  }
};

export const mongoKit = {
  filter,
};
