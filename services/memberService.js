var models  = require('../models/db');
const moment = require('moment');

const addMember = async (member_name, account, hash, phone, address) => {
    await models.member.create({
        member_name: member_name,
        account: account,
        password: hash,
        phone: phone,
        address: address,
        role_id: 1,
        discount_id: null,
        create_datetime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        picture: null
    });
}

const hasMember = async (account) => {
    return await models.member.count({
        where: {
          account: account
        }
    });
}

const findMember = async (account) => {
    return await models.member.findOne({
        where: {
          account: account
        }
    });
}

const findMemberById = async (id) => {
    return await models.member.findOne({
        attributes: { exclude: ['password'] },
        where: {
          member_id: id
        }
    });
}


const updateMemberInfo = async (id, memberInfo) => {
    let member = await findMemberById(id); 
    member.set({
      member_name: memberInfo.member_name,
      account: memberInfo.account,
      phone: memberInfo.phone,
      address: memberInfo.address      
    });

    await member.save();
    return await findMemberById(id);
}

const deleteMember = async (id) => {
    return await models.member.destroy({ where: { member_id: id } }); 
}

const updatePassword = async (id, newPassword) => {
    await models.member.update({ password: newPassword },{ 
        where: { 
            member_id: id } 
        }
    )
}

module.exports = {
    addMember,
    hasMember,
    findMember,
    updateMemberInfo,
    deleteMember,
    findMemberById,
    updatePassword
};
