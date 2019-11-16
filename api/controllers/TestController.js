const product = require('../models/Product');
const ProductVariant = require('../models/ProductVariant');
// const Variant = require('../models/Variant');
// const VariantValue = require('../models/VariantValue');

const TestController = () => {
  const test = (req, res) => {
    try {
      return res.json('Test Structure Pattern Completed');
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error', err });
    }
  };

  return {
    test,
  };
};

module.exports = TestController;
