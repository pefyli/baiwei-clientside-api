var express = require('express');
var router = express.Router();
const { StatusCode } = require('status-code-enum');
const productService = require('../services/productService');

router.get('/:item_id', async (req, res, next) => {
    try {
      const item = await productService.findItem(req.params.item_id); 
      res.status(StatusCode.SuccessOK).json({data: item});
    } catch (error) {
      next(error);
    }
});

module.exports = router;