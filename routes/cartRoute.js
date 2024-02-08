var express = require('express');
var router = express.Router();
const cartService = require('../services/cartService');
const { StatusCode } = require('status-code-enum');

//get Member cart product
router.get('/:member_id', async (req, res, next) => {
    try {
      const cart = await cartService.findCartByMember(req.params.member_id); 
      res.status(StatusCode.SuccessOK).json({data: cart});
    } catch (error) {
      next(error);
    }
});

//add product to cart
router.post('/:member_id', async (req, res, next) => {
    try {
        //we should identify if there are any duplicate products in cart
        //if yes, accumulate the amount, if no, add to the cart.
        let cart = await cartService.findCartProductByMember(req.body.product_id, req.params.member_id);
        if(cart == null) {
          let response = await cartService.addProductToCart(req.params.member_id, req.body.product_id, req.body.amount);
          res.status(StatusCode.SuccessCreated).json({data: response});
        } else {
          let updAmount = parseInt(cart.amount) + parseInt(req.body.amount);
          let response = await cartService.updateCartInfoForSingleProduct(req.body.product_id, req.params.member_id, updAmount);
          res.status(StatusCode.SuccessOK).json({data: response});
        }
    } catch (error) {
        next(error);
    }
});

//clean up cart
router.delete('/:member_id', async (req, res, next) => {
    try {
      const cart = await cartService.findCartByMember(req.params.member_id); 
      if(cart) {
        const deleted = await cartService.deleteAllCartProduct(req.params.member_id);
        if(deleted) {
          res.status(StatusCode.SuccessOK).send("Cart cleanup");
        }
      } else {
        res.status(StatusCode.ServerErrorInternal).send("No items in cart")
      }
    } catch (error) {
      next(error);
    }
});

//remove single product from cart
router.delete('/:member_id/:product_id', async (req, res, next) => {
    try {
      const cart = await cartService.findCartProductByMember(req.params.product_id, req.params.member_id); 
      if(cart) {
        const deleted = await cartService.deleteCartProduct(req.params.product_id, req.params.member_id);
        if(deleted) {
          res.status(StatusCode.SuccessOK).send("Product removed");
        }
      } else {
        res.status(StatusCode.ServerErrorInternal).send("No product in cart")
      }
    } catch (error) {
      next(error);
    }
});

//update cart info for single product
router.put('/:member_id/:product_id', async (req, res, next) => {
    try {
      const cart = await cartService.updateCartInfoForSingleProduct(req.params.product_id, req.params.member_id, req.body.amount); 
      res.status(StatusCode.SuccessOK).json({data: cart});
    } catch (error) {
      next(error);
    }
});

module.exports = router;