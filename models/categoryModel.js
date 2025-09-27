module.exports = (sequelize, DataTypes) => {
    return sequelize.define('category', {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      category_name: {
        type: DataTypes.STRING,
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
      tableName: 'category'
    });
  };