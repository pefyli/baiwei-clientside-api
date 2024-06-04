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
      product_description: {
        type: DataTypes.STRING,
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

  product.associate = models => {
    models.product.hasMany(models.cart, { foreignKey: 'product_id' });
    models.product.hasMany(models.item, { foreignKey: 'product_id' });
  };  
  return product;
};