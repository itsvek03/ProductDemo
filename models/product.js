'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.hasMany(models.Category, {
        as: 'category',
        foreignKey: 'id'
      })
    }
  };

  Product.init({
    PName: DataTypes.STRING,
    price: DataTypes.INTEGER,
    Image: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};

