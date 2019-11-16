const Sequelize = require('sequelize');

const sequelize = require('../../config/database');


const tableName = 'products';

const Product = sequelize.define('Product', {
  name: {
    type: Sequelize.STRING(20),
  },
}, { tableName });


// module export is here for a problem in sequalize
// so we need to load tag after export or else the compiler will compile
// will enter Tag before it even finishes post
// there is a better solution but i did this for simplicity
module.exports = Product;
