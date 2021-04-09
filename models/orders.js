'use strict';

module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    location: DataTypes.STRING,
    userid: DataTypes.INTEGER,
    status: DataTypes.STRING,
    cartid: DataTypes.ARRAY(DataTypes.INTEGER)

  }, {});

  Orders.associate = function (models) {
    Orders.belongsTo(models.User, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    })

    Orders.belongsTo(models.Cart, {
      foreignKey: 'cartid',
      onDelete: 'CASCADE'
    })
  }
  return Orders;
};