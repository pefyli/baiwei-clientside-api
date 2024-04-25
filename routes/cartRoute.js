var express = require('express');
var router = express.Router();
const cartService = require('../services/cartService');
const { StatusCode } = require('status-code-enum');

//get Member cart product
router.get('/', async (req, res, next) => {
    try {
      const cart = await cartService.findCartByMember(req.query.member_id); 
      res.status(StatusCode.SuccessOK).json({data: cart});
    } catch (error) {
      next(error);
    }
});

//add product to cart
router.post('/', async (req, res, next) => {
    try {
        //we should identify if there are any duplicate products in cart
        //if yes, accumulate the amount, if no, add to the cart.
        let cart = await cartService.findCartProductByMember(req.body.product_id, req.body.member_id);
        if(cart == null) {
          let response = await cartService.addProductToCart(req.body.member_id, req.body.product_id, req.body.amount);
          res.status(StatusCode.SuccessCreated).json({data: response});
        } else {
          let updAmount = parseInt(cart.amount) + parseInt(req.body.amount);
          let response = await cartService.updateProductByMember(req.body.product_id, req.body.member_id, updAmount);
          res.status(StatusCode.SuccessOK).json({data: response});
        }
    } catch (error) {
        next(error);
    }
});

//clean up cart
router.delete('/', async (req, res, next) => {
    try {
      const cart = await cartService.findCartByMember(req.body.member_id); 
      if(cart) {
        const deleted = await cartService.deleteAllCartProduct(req.body.member_id);
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
router.delete('/:cart_id', async (req, res, next) => {
    try {
      const cart = await cartService.findCartById(req.params.cart_id); 
      if(cart) {
        const deleted = await cartService.deleteCart(req.params.cart_id);
        if(deleted) {
          res.status(StatusCode.SuccessOK).send("cart removed");
        }
      } else {
        res.status(StatusCode.ServerErrorInternal).send("No cart")
      }
    } catch (error) {
      next(error);
    }
});

//update cart info for single product
router.put('/:cart_id', async (req, res, next) => {
    try {
      const cart = await cartService.updateProductByMember(req.body.product_id, req.body.member_id, req.body.amount); 
      const memberProductCart = await cartService.findCartByMemberAndProduct(req.body.member_id, cart.product_id); 
      res.status(StatusCode.SuccessOK).json({data: memberProductCart});
    } catch (error) {
      next(error);
    }
});

module.exports = router;