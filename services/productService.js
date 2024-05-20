var models  = require('../models/db');
const { Op } = require('sequelize');

const getAllProducts = async () => {
  return await models.product.findAll();
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

module.exports = {
  getAllProducts,
  searchProduct,
  findProductById,
  findProductMediaById
};
