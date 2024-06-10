var models  = require('../models/db');
const { Op } = require('sequelize');

const getAllProducts = async () => {
  return await models.product.findAll({
    include: [{
      model: models.item,
      attributes: ['item_id', 'quantity', 'spec', 'color', 'price'], // Select specific attributes from Item model
      required: false // Use false for left join behavior
    }],
    attributes: ['product_id', 'category_id', 'product_name', 'product_description', 'create_datetime', 'update_datetime'] // Select specific attributes from Product model
  });
}

const findProductById = async (product_id) => {
  let product = await models.product.findOne({
    where: {
      product_id: product_id
    }
  });
  return product;
}

const findProductMediaById = async (product_id) => {
  let mediaList = await models.product_media.findAll({
    where: {
      product_id: product_id
    }
  });
  return mediaList;
}

const searchProduct = async (searchTerm) => {
  let productList = await models.product.findAll({
    where: {
      product_name: {
        [Op.like]: `%${searchTerm}%`
      }
    }
  });
  return productList;
}

const findItemsByAssociateProductId = async (product_id) => {
  return await models.product.findOne({
    where: {
      product_id: product_id
    },
    include: [{
      model: models.item,
      attributes: ['item_id', 'quantity', 'spec', 'color', 'price', 'create_datetime', 'update_datetime'], // Select specific attributes from Item model
      required: false // Use false for left join behavior
    }],
    attributes: ['product_id', 'category_id', 'product_name', 'product_description', 'create_datetime', 'update_datetime'] // Select specific attributes from Product model
  });
}

const findItem = async (item_id) => {
  return await models.item.findOne({
    where: {
      item_id: item_id
    },
    attributes: ['item_id', 'product_id', 'quantity', 'spec', 'color', 'price', 'create_datetime', 'update_datetime'] // Select specific attributes from Product model
  });
}


module.exports = {
  getAllProducts,
  searchProduct,
  findProductById,
  findProductMediaById,
  findItemsByAssociateProductId,
  findItem
};
