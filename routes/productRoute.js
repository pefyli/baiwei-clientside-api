var express = require('express');
var router = express.Router();
const productService = require('../services/productService');
const { StatusCode } = require('status-code-enum');

router.get('/', async (req, res, next) => {
    try {
      const productList = await productService.getAllProducts(); 
      res.status(StatusCode.SuccessOK).json({data: productList});
    } catch (error) {
      next(error);
    }
});

router.get('/:product_id', async (req, res, next) => {
  try {
    const product = await productService.findProductById(req.params.product_id); 
    res.status(StatusCode.SuccessOK).json({data: product});
  } catch (error) {
    next(error);
  }
});

router.get('/:product_id/item', async (req, res, next) => {
  try {
    const items = await productService.findItemsByAssociateProductId(req.params.product_id); 
    res.status(StatusCode.SuccessOK).json({data: items});
  } catch (error) {
    next(error);
  }
});

router.get('/:product_id/media', async (req, res, next) => {
  try {
    const mediaList = await productService.findProductMediaById(req.params.product_id); 
    res.status(StatusCode.SuccessOK).json({data: mediaList});
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