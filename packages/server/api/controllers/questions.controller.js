/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

const getOppositeOrderDirection = (direction) => {
  let lastItemDirection;
  if (direction === 'asc') {
    lastItemDirection = 'desc';
  } else if (direction === 'desc') {
    lastItemDirection = 'asc';
  }
  return lastItemDirection;
};

const getQuestionsAll = async () => {
  try {
    const questions = knex('questions')
      .select('questions.*', 'topics.title as topicTitle')
      .join('topics', 'questions.topic_id', '=', 'topics.id');
    return questions;
  } catch (error) {
    return error.message;
  }
};

const getQuestions = async (page, column, direction) => {
  const lastItemDirection = getOppositeOrderDirection(direction);
  try {
    const getModel = () =>
      knex('questions')
        .select('questions.*', 'topics.title as topicTitle')
        .join('topics', 'questions.topic_id', '=', 'topics.id');
    const lastItem = await getModel()
      .orderBy(column, lastItemDirection)
      .limit(1);
    const data = await getModel()
      .orderBy(column, direction)
      .offset(page * 10)
      .limit(10)
      .select();
    return {
      lastItem: lastItem[0],
      data,
    };
  } catch (error) {
    return error.message;
  }
};

const getQuestionsPagination = async (column, direction, page, size) => {
  try {
    const getModel = () =>
      knex('questions')
        .select('questions.*', 'topics.title as topicTitle')
        .join('topics', 'questions.topic_id', '=', 'topics.id')
        .orderBy(column, direction);
    const totalCount = await getModel()
      .count('questions.id', { as: 'rows' })
      .groupBy('questions.id');
    const data = await getModel()
      .offset(page * size)
      .limit(size)
      .select();
    const dataExport = await getModel().select();

    return {
      totalCount: totalCount.length,
      data,
      dataExport,
    };
  } catch (error) {
    return error.message;
  }
};

const getQuestionsSearch = async (search, column, direction, page, size) => {
  try {
    const getModel = () =>
      knex('questions')
        .select(
          'questions.*',
          'topics.title as topicTitle',
          'topics.category_id as category_id',
          'categories.title as categoryTitle',
        )
        .join('topics', 'questions.topic_id', '=', 'topics.id')
        .join('categories', 'topics.category_id', '=', 'categories.id')
        .orderBy(column, direction)
        .where('questions.title', 'like', `%${search}%`);
    const totalCount = await getModel()
      .count('questions.id', { as: 'rows' })
      .groupBy('questions.id');
    const data = await getModel()
      .offset(page * size)
      .limit(size)
      .select();
    const dataExport = await getModel().select();

    return {
      totalCount: totalCount.length,
      data,
      dataExport,
    };
  } catch (error) {
    return error.message;
  }
};

const getQuestionsByCategoriesSearch = async (
  search,
  categories,
  column,
  direction,
  page,
  size,
) => {
  try {
    const getModel = () =>
      knex('questions')
        .select(
          'questions.*',
          'topics.title as topicTitle',
          'topics.category_id as category_id',
          'categories.title as categoryTitle',
        )
        .join('topics', 'questions.topic_id', '=', 'topics.id')
        .join('categories', 'topics.category_id', '=', 'categories.id')
        .whereIn('category_id', categories)
        .where('questions.title', 'like', `%${search}%`)
        .orderBy(column, direction);
    const totalCount = await getModel()
      .count('questions.id', { as: 'rows' })
      .groupBy('questions.id');
    const data = await getModel()
      .offset(page * size)
      .limit(size)
      .select();
    const dataExport = await getModel().select();
    return {
      totalCount: totalCount.length,
      data,
      dataExport,
    };
  } catch (error) {
    return error.message;
  }
};

const getQuestionsByCategory = async (category, page, column, direction) => {
  const lastItemDirection = getOppositeOrderDirection(direction);
  try {
    const getModel = () =>
      knex('questions')
        .select(
          'questions.*',
          'topics.title as topicTitle',
          'topics.category_id as category_id',
          'categories.title as categoryTitle',
        )
        .join('topics', 'questions.topic_id', '=', 'topics.id')
        .join('categories', 'topics.category_id', '=', 'categories.id')
        .where({
          'topics.category_id': category,
        });

    const lastItem = await getModel()
      .orderBy(column, lastItemDirection)
      .limit(1);
    const data = await getModel()
      .orderBy(column, direction)
      .offset(page * 10)
      .limit(10)
      .select();
    return {
      lastItem: lastItem[0],
      data,
    };
  } catch (error) {
    return error.message;
  }
};

const getQuestionsByTopic = async (topic, page, column, direction) => {
  const lastItemDirection = getOppositeOrderDirection(direction);
  try {
    const getModel = () =>
      knex('questions')
        .select(
          'questions.*',
          'topics.title as topicTitle',
          'topics.category_id as category_id',
          'categories.title as categoryTitle',
        )
        .join('topics', 'questions.topic_id', '=', 'topics.id')
        .join('categories', 'topics.category_id', '=', 'categories.id')
        .where({ topic_id: topic });
    const lastItem = await getModel()
      .orderBy(column, lastItemDirection)
      .limit(1);
    const data = await getModel()
      .orderBy(column, direction)
      .offset(page * 10)
      .limit(10)
      .select();
    return {
      lastItem: lastItem[0],
      data,
    };
  } catch (error) {
    return error.message;
  }
};

const getQuestionsBy = async ({
  page,
  column,
  direction,
  filteredTopics,
  filteredCategories,
  filteredPricing,
  filteredDetails,
}) => {
  const lastItemDirection = getOppositeOrderDirection(direction);
  try {
    const getModel = () =>
      knex('questions')
        .select('questions.*', 'topics.title as topicTitle')
        .join('topics', 'questions.topic_id', '=', 'topics.id')

        .modify((queryBuilder) => {
          if (filteredTopics !== undefined) {
            queryBuilder.where('topic_id', filteredTopics);
          }
          if (filteredCategories !== undefined) {
            queryBuilder.where('topics.category_id', filteredCategories);
          }
          if (filteredPricing !== undefined) {
            queryBuilder.whereIn('questions.pricing_type', filteredPricing);
          }
          if (
            filteredDetails !== undefined &&
            filteredDetails.includes('Browser extension')
          ) {
            queryBuilder.whereNotNull('questions.url_chrome_extension');
          }
          if (
            filteredDetails !== undefined &&
            filteredDetails.includes('iOS app available')
          ) {
            queryBuilder.whereNotNull('questions.url_app_store');
          }
          if (
            filteredDetails !== undefined &&
            filteredDetails.includes('Android app available')
          ) {
            queryBuilder.whereNotNull('questions.url_google_play_store');
          }

          if (
            filteredDetails !== undefined &&
            filteredDetails.includes('Social media contacts')
          ) {
            queryBuilder
              .whereNotNull('questions.url_x')
              .orWhereNotNull('questions.url_discord');
          }
        });
    const lastItem = await getModel()
      .orderBy(column, lastItemDirection)
      .limit(1);
    const data = await getModel()
      .orderBy(column, direction)
      .offset(page * 10)
      .limit(10)
      .select();
    return {
      lastItem: lastItem[0],
      data,
    };
  } catch (error) {
    return error.message;
  }
};

// Get questions by id
const getQuestionById = async (id) => {
  if (!id) {
    throw new HttpError('Id should be a number', 400);
  }
  try {
    const app = await knex('questions')
      .select(
        'questions.*',
        'topics.title as topicTitle',
        'topics.category_id as category_id',
        'categories.title as categoryTitle',
      )
      .join('topics', 'questions.topic_id', '=', 'topics.id')
      .join('categories', 'topics.category_id', '=', 'categories.id')
      .where({ 'questions.id': id });
    if (app.length === 0) {
      throw new HttpError(`incorrect entry with the id of ${id}`, 404);
    }
    return app;
  } catch (error) {
    return error.message;
  }
};

// post
const createQuestions = async (token, body) => {
  try {
    const userUid = token.split(' ')[1];
    const user = (await knex('users').where({ uid: userUid }))[0];
    if (!user) {
      throw new HttpError('User not found', 401);
    }
    await knex('questions').insert({
      title: body.title,
      description: body.description,
      topic_id: body.topic_id,
      user_id: user.id,
    });
    return {
      successful: true,
    };
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getQuestions,
  getQuestionsPagination,
  getQuestionsSearch,
  getQuestionsByCategoriesSearch,
  getQuestionsByTopic,
  getQuestionsBy,
  getQuestionsByCategory,
  getQuestionById,
  getQuestionsAll,
  createQuestions,
};
