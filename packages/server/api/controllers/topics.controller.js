/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');

/* Get all topics */
const getTopics = async () => {
  try {
    const topics = await knex('topics').select(
      'topics.id as id',
      'topics.title as title',
      'topics.meta_title as meta_title',
      'topics.meta_description as description',
    );
    return topics;
  } catch (error) {
    return error.message;
  }
};

// Get topics by Category
const getTopicsByCategory = async (category) => {
  try {
    const topics = await knex('topics').where({ category_id: category });
    return topics;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getTopics,
  getTopicsByCategory,
};
