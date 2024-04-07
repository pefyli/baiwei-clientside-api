var express = require('express');
var router = express.Router();
const productService = require('../services/productService');
const { StatusCode } = require('status-code-enum');

router.get('/', async (req, res, next) => {
    try {
      const productList = await productService.getProduct(); 
      res.status(StatusCode.SuccessOK).json({data: productList});
    } catch (error) {
      next(error);
    }
});

//ambiguously search product with product name
router.get('/search', async (req, res, next) => {
  try {
     const productList = await productService.searchProduct(req.query.search_term)
     res.status(StatusCode.SuccessOK).json({data: productList});
  } catch (error) {
    next(error);
  }
});

module.exports = router;