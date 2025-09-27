var models  = require('../models/db');

const findCategoryById = async (id) => {
    return await models.category.findOne({
        where: {
          category_id: id
        }
    });
}

const findCategoryByName = async (name) => {
    return await models.category.findOne({
        where: {
            category_name: name
        }
    });
}

const getAllCategory = async () => {
    return await models.category.findAll();
}

module.exports = {
    findCategoryById,
    findCategoryByName,
    getAllCategory
};
