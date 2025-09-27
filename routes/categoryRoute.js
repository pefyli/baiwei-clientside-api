var express = require('express');
var router = express.Router();
const categoryService = require('../services/categoryService');
const { StatusCode } = require('status-code-enum');

//get category info
router.get('/:category_id', async function(req, res, next) {
    try {
      const category = await categoryService.findCategoryById(req.params.category_id);
      res.status(StatusCode.SuccessCreated).json({data: category});
    } catch (error) {
      next(error);
    }
});

//get category
router.get('/', async function(req, res, next) {
    try {
      const category = await categoryService.getAllCategory();
      res.status(StatusCode.SuccessOK).json({data: category});
    } catch (error) {
      next(error);
    }
});
  
  module.exports = router;