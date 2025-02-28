import { mongoError } from './mongoError.js';

const filter = async (Model, criteria = {}, options = { sort: { createdAt: -1 }, select: '' }) => {
  try {
    const { select, sort } = options;

    const payload = await Model.find(criteria).select(`${select} -password`).sort(sort).lean();

    return {
      code: 200,
      payload,
    };
  } catch (error) {
    return mongoError(error);
  }
};

const create = async (Model, data) => {
  try {
    const payload = await Model.create(data);

    return {
      code: 201,
      payload: { ...payload._doc, password: undefined },
    };
  } catch (error) {
    return mongoError(error);
  }
};

export const mongoKit = {
  filter,
  create,
};
