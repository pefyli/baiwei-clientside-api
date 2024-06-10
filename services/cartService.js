var models  = require('../models/db');
const moment = require('moment');

const addProductToCart = async (member_id, product_id, item_id, amount) => {
    await models.cart.create({
        member_id: member_id,
        product_id: product_id,
        item_id: item_id,
        amount: amount,
        create_datetime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        update_datetime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    });
    return findCartProductItemByMember(item_id, member_id);
}

const findCartByMember = async (member_id) => {
    return await models.cart.findAll({
        where: {
          member_id: member_id
        },
        include: [
          {
            model: models.item,
            attributes: ['item_id', 'product_id', 'quantity', 'spec', 'price', 'color'], // Adjust attributes as needed
          }
        ],
        attributes: ['member_id', 'cart_id', 'amount', 'create_datetime', 'update_datetime'] // Select specific attributes from Cart model
    });
}

const findMemberCartByItemId = async (member_id, item_id) => {
    return await models.cart.findAll({
        where: {
            member_id: member_id,
            item_id: item_id
          },
          include: [{
            model: models.product,
            attributes: ['product_id', 'category_id', 'product_name'], // Select specific attributes from Product model
            required: false, // Use false for left join behavior    
          }],
        attributes: ['member_id', 'cart_id', 'amount', 'create_datetime', 'update_datetime'] // Select specific attributes from Cart model
    });
}

const findCartProductItemByMember = async (item_id, member_id) => {
    return await models.cart.findOne({
        where: {
          member_id: member_id,
          item_id: item_id
        }
    });
}

const findCartById = async (cart_id) => {
    return await models.cart.findOne({
        where: {
          cart_id: cart_id,
        }
    });
}

const updateCartByMember = async (item_id, member_id, amount) => {
    let cart = await findCartProductItemByMember(item_id, member_id); 
    cart.set({
        amount: amount,
        update_datetime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')   
    });

    await cart.save();
    return await findCartProductItemByMember(item_id, member_id);
}

const deleteCart = async (cart_id) => {
    return await models.cart.destroy({ 
        where: { 
            cart_id: cart_id,
        } 
    }); 
}

const deleteAllCartProduct = async (member_id) => {
    return await models.cart.destroy({ 
        where: { 
            member_id: member_id,
        } 
    }); 
}

module.exports = {
    addProductToCart,
    findCartByMember,
    findCartProductItemByMember,
    findMemberCartByItemId,
    updateCartByMember,
    deleteCart,
    deleteAllCartProduct,
    findCartById
};
