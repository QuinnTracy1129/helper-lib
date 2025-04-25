import { mongoError } from './mongoError.js';
import { isEmpty } from './isEmpty.js';

const buildCriteria = (criteria = {}) => {
  const { createdStart, createdEnd, ...rest } = criteria;

  const _criteria = { ...rest };

  // initialize createdAt
  if (createdStart || createdEnd) _criteria.createdAt = {};
  // attach gte and lte if it exists
  if (createdStart) _criteria.createdAt['$gte'] = new Date(createdStart);
  if (createdEnd) _criteria.createdAt['$lte'] = new Date(createdEnd);

  return _criteria;
};

const filter = async (Model, criteria = {}, options = {}) => {
  try {
    const {
      select = '',
      remove = '-password',
      sort = { createdAt: -1 },
      limit = 0,
      page = 0,
    } = options;

    const payload = await Model.find(buildCriteria(criteria))
      .select(select || remove)
      .sort(sort)
      .skip(page)
      .limit(limit)
      .lean();

    return {
      code: 200,
      payload,
    };
  } catch (error) {
    return mongoError(error);
  }
};

const find = async (Model, criteria, options = {}) => {
  try {
    const { select = '', remove = '-password' } = options;

    const payload = await Model.findOne(buildCriteria(criteria))
      .select(select || remove)
      .lean();

    if (!payload) return mongoError({ code: 404 });

    return {
      code: 200,
      payload: { ...payload?._doc },
    };
  } catch (error) {
    return mongoError(error);
  }
};

const create = async (Model, data, audit) => {
  try {
    const payload = await Model.create({
      ...data,
      ...(!isEmpty(audit) && { createdBy: audit?._id }),
    });

    return {
      code: 201,
      payload: { ...payload._doc, password: undefined },
    };
  } catch (error) {
    return mongoError(error);
  }
};

// based on research, there are risks on using push along set and unset, so be careful.
const update = async (Model, data, audit, unset = {}, push = {}, criteria = {}) => {
  try {
    const filter = {
      _id: data?._id,
      ...criteria,
    };

    await Model.updateOne(filter, {
      $set: {
        ...data,
        updatedBy: audit?._id,
      },
      ...(!isEmpty(unset) && { $unset: unset }),
      ...(!isEmpty(push) && { $push: push }),
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

const destroy = async (Model, criteria, audit, options = {}) => {
  try {
    const { softDelete = true } = options;

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
