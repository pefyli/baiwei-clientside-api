module.exports = (sequelize, DataTypes) => {
    return sequelize.define('promotion', {
      promotion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      member_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      infect_area: {
        type: DataTypes.STRING,
        allowNull: false
      },
      given_datetime: {
        type: DataTypes.STRING,
        allowNull: false
      },
      expire_datetime: {
        type: DataTypes.STRING
      },
      discount_percentage: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'promotion'
    });
  };