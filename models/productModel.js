module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false
      },
      product_description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      inventory_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      create_datetime: {
        type: DataTypes.STRING
      },
      update_datetime: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
      tableName: 'product'
    });

  return product;
};