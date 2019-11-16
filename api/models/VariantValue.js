const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const Variant = require('./Variant');

const tableName = 'variant_values';

const VariantValue = sequelize.define('VariantValue', {
  // values (1 ,'red'),(1 ,'blue'),(1 ,'green'), where 1 is variant => Color
  value: {
    type: Sequelize.STRING(50),
  },
}, { tableName });

VariantValue.belongsTo(Variant); // puts foreign key VariantId in Variant Table

module.exports = VariantValue;

const ProductVariant = require('./ProductVariant');

VariantValue.belongsToMany(ProductVariant, {
  as: 'productsDetails',
  through: 'product_details',
});


