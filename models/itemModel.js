module.exports = (sequelize, DataTypes) => {
    const item = sequelize.define('item', {
      item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      spec: {
        type: DataTypes.STRING,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
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
      tableName: 'item'
    });
    
  item.associate = models => {
    item.hasMany(models.cart, { foreignKey: 'item_id' });
    item.belongsTo(models.product, { foreignKey: 'product_id' });
  };

  return item; 
};