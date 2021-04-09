'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    PName: DataTypes.STRING,
    price: DataTypes.INTEGER,
    Image: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER
  }, {});

  Product.associate = function (models) {

    Product.belongsTo(models.Category, {
      foreignKey: 'CategoryId',
      onDelete: 'CASCADE'
    })

    Product.belongsTo(models.Cart, {
      foreignKey: 'productid',
      onDelete: 'CASCADE'
    })




  }
  return Product;
};

