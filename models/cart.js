'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userid: DataTypes.INTEGER,
    productid: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});

  Cart.associate = function (models) {
    console.log(models)

    Cart.belongsTo(models.User, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    })

    Cart.belongsTo(models.Product, {
      foreignKey: 'productid',
      onDelete: 'CASCADE'
    })

    Cart.hasMany(models.Orders, {
      foreignKey: 'cartid',
      onDelete: 'CASCADE'
    })

  }
  return Cart;
};