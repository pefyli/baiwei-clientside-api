module.exports = (sequelize, DataTypes) => {
    const cart = sequelize.define('cart', {
      cart_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      member_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      create_datetime: {
        type: DataTypes.STRING,
        allowNull: false
      },
      update_datetime: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'cart'
    });
    
  cart.associate = models => {
    cart.belongsTo(models.product, { foreignKey: 'product_id' });
    cart.belongsTo(models.member, { foreignKey: 'member_id' });
    cart.belongsTo(models.item, { foreignKey: 'item_id' });
  };

  return cart; 
};