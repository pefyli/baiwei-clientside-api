var models  = require('../models/db');

const findMemberCoupon = async (member_id) => {
    return await models.promotion.findAll({
        where: {
            member_id: member_id,
            type: 'coupon', 
        }
    });
}

const findMemberDiscount = async (member_id) => {
    return await models.promotion.findOne({
        where: {
            member_id: member_id,
            type: 'discount', 
        }
    });
}

const deleteMemberCoupon = async (member_id, promotion_id) => {
    return await models.promotion.destroy({ 
        where: { 
            member_id: member_id,
            promotion_id: promotion_id,
            type: 'coupon'
        } 
    }); 
}

const disableMemberCoupon  = async (member_id, promotion_id) => {
    return await models.promotion.update({ status: 0 },{ 
        where: { 
            member_id: member_id,
            promotion_id: promotion_id,
            type: 'coupon'
        } 
    }); 
}

module.exports = {
    findMemberCoupon,
    findMemberDiscount,
    deleteMemberCoupon,
    disableMemberCoupon
};
