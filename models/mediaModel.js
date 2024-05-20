module.exports = (sequelize, DataTypes) => {
    return sequelize.define('product_media', {
      product_media_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      product_media: {
        type: DataTypes.BLOB('long'), // Storing the file as a BLOB
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      media_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      display_location: {
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
      tableName: 'product_media'
    });
  };