'use strict';

module.exports = (sequelize, DataTypes) => {

  const Category = sequelize.define('Category', {
    CategoryName: DataTypes.STRING,
    createdAt: DataTypes.DATE
  }, {});

  Category.associate = function (models) {
    Category.hasMany(models.Product, {
      foreignKey: 'CategoryId',
      onDelete: 'CASCADE'
    })
  }
  return Category;
};