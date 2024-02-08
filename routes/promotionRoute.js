var express = require('express');
var router = express.Router();
const promotionService = require('../services/promotionService');
const { StatusCode } = require('status-code-enum');

//get member coupon
router.get('/coupon/:member_id', async (req, res, next) => {
    try {
      const coupon = await promotionService.findMemberCoupon(req.params.member_id); 
      res.status(StatusCode.SuccessOK).json({data: coupon});
    } catch (error) {
      next(error);
    }
});

//get member discount
router.get('/discount/:member_id', async (req, res, next) => {
    try {
      const discount = await promotionService.findMemberDiscount(req.params.member_id); 
      res.status(StatusCode.SuccessOK).json({data: discount});
    } catch (error) {
      next(error);
    }
});

//disable member coupon
router.put('/coupon/:member_id', async (req, res, next) => {
    try {
      let updated = promotionService.disableMemberCoupon(req.params.member_id, req.body.promotion_id); 
      if(updated) {
        res.status(StatusCode.SuccessOK).send("Coupon disabled");
      }
    } catch (error) {
      next(error);
    }
});

//member coupon deletion
router.delete('/coupon/:member_id', async (req, res, next) => {
    try {
        const deleted = await promotionService.deleteMemberCoupon(req.params.member_id, req.body.promotion_id);
        if(deleted) {
            res.status(StatusCode.SuccessOK).send("Coupon deleted");
        }
    } catch (error) {
      next(error);
    }
})

module.exports = router;