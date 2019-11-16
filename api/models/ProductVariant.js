const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const Product = require('./Product');

const tableName = 'product_variants';

const ProductVariant = sequelize.define('ProductVariant', {
  productVariantName: {
    type: Sequelize.STRING(50),
  },
  sku: {
    type: Sequelize.STRING(50),
  },
  // for task requirement wont implement it ...
  // price: {
  //   type: Sequelize.FLOAT(),
  // },
}, { tableName });


ProductVariant.belongsTo(Product); // puts foreign key ProductId in Product Table


module.exports = ProductVariant;
const VariantValue = require('./VariantValue');


/**
 * Creates a "product_details table with IDs for productId and variantValueId
 * ex: red-wool , red  ///
 */
ProductVariant.belongsToMany(VariantValue, {
  as: 'variants',
  through: 'product_details',
});
