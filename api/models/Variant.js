const Sequelize = require('sequelize');

const sequelize = require('../../config/database');


const tableName = 'variants';

const Variant = sequelize.define('Variant', {
  // ex: model_type, pack_size, coffee_flavor
  variant: {
    type: Sequelize.STRING(50),
  },
}, { tableName });


module.exports = Variant;
