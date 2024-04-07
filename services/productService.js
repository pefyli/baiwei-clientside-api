var models  = require('../models/db');
const { Op } = require('sequelize');

const getProduct = async () => {
  return await models.product.findAll();
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
  getProduct,
  searchProduct
};
