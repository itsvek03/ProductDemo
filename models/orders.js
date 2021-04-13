'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    location: DataTypes.STRING,
    cartid: DataTypes.ARRAY(DataTypes.DECIMAL),
    status: DataTypes.STRING,
    userid: DataTypes.INTEGER
  }, {});


  Orders.associate = function (models) {
    // Orders.belongsTo(models.Orders, {
    //   foreignKey: 'userid',
    //   onDelete: 'CASCADE'
    // })
  }
  return Orders;
};