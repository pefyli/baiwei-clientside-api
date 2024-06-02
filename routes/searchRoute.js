var express = require('express');
var router = express.Router();
const productService = require('../services/productService');
const { StatusCode } = require('status-code-enum');

//ambiguously search product with product name
router.get('/', async (req, res, next) => {
  try {
    const productList = await productService.searchProduct(req.query.search_term)
    res.status(StatusCode.SuccessOK).json({data: productList});
  } catch (error) {
    next(error);
  }
});
  
module.exports = router;