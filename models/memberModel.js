module.exports = (sequelize, DataTypes) => {
  const member = sequelize.define('member', {
    member_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    member_name: {
      type: DataTypes.STRING
    },
    account: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    create_datetime: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'member'
  });
  
  member.associate = models => {
    member.hasOne(models.cart, { foreignKey: 'member_id' });
  };

  return member;
};