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

const create = async (Model, data, audit) => {
  try {
    const payload = await Model.create({
      ...data,
      createdBy: audit?._id,
    });

    return {
      code: 201,
      payload: { ...payload._doc, password: undefined },
    };
  } catch (error) {
    return mongoError(error);
  }
};

const update = async (Model, data, audit, options = { criteria: {} }) => {
  try {
    const filter = {
      _id: data?._id,
      ...options.criteria,
    };

    await Model.updateOne(filter, {
      $set: {
        ...data,
        updatedBy: audit?._id,
      },
      $inc: { __v: 1 },
    });

    // fetch the item to trigger basePopulates
    const payload = await Model.findOne(filter);

    return {
      code: 200,
      payload: { ...payload._doc, password: undefined },
    };
  } catch (error) {
    mongoError(error);
  }
};

const destroy = async (Model, criteria, audit, options = { softDelete: true }) => {
  try {
    const { softDelete } = options;

    if (softDelete) {
      await Model.updateOne(criteria, {
        $set: {
          deletedAt: new Date(),
          deletedBy: audit?._id,
        },
        $inc: { __v: 1 },
      });
    } else {
      await Model.deleteOne(criteria);
    }

    return {
      code: 200,
      payload: criteria,
    };
  } catch (error) {
    mongoError(error);
  }
};

export const mongoKit = {
  filter,
  find,
  create,
  update,
  destroy,
};
