import { mongoError } from './mongoError.js';

const filter = async (
  Model,
  criteria = {},
  options = { sort: { createdAt: -1 }, select: '', remove: '-password' },
) => {
  try {
    const { select, remove, sort } = options;

    const payload = await Model.find(criteria)
      .select(select || remove)
      .sort(sort)
      .lean();

    return {
      code: 200,
      payload,
    };
  } catch (error) {
    return mongoError(error);
  }
};

const find = async (Model, criteria, options = { select: '', remove: '-password' }) => {
  try {
    const { select, remove } = options;

    const payload = await Model.findOne(criteria).select(select || remove);

    if (!payload) return mongoError({ code: 404 });

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

const update = async (Model, data) => {
  // increment __v
  // improve populate, better if we can pass object, must create sample of nested objectIds
};

export const mongoKit = {
  filter,
  find,
  create,
  update,
};
