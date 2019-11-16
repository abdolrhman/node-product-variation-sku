const sequelize = require('../../config/database');

const Product = require('../models/Product');
const Variant = require('../models/Variant');
const VariantValue = require('../models/VariantValue');
const ProductVariant = require('../models/ProductVariant');
// const ProductDetail = require('../models/ProductDetail');

const ProductController = () => {
  const seed = async (req, res) => {
    try {
      const product = await Product.findAll();
      if (product) {
      }
      const Products = [
        { name: 'Coffee machines' },
        { name: 'Coffee pods' },
      ];
      Product.bulkCreate(Products);

      const Variants = [
        // type as : large, medium , .. etc
        { variant: 'type' },
        // ex: true or false
        { variant: 'water_line_compatible' },
        // ex : base, premium , deluxe , .. etc
        { variant: 'model' },
        // ex : vanilla, cream
        { variant: 'coffee_flavor' },
        // ex : 1 dozen, ... etc
        { variant: 'pack_size' },

      ];
      Variant.bulkCreate(Variants);

      const VariantsValues = [
        {
          value: 'small',
          VariantId: 1,
        },
        {
          value: 'base',
          VariantId: 3,
        },
      ];

      VariantValue.bulkCreate(VariantsValues);


      // THIS SHOULD SEED SKU LIST
      // Where we set the product With Variant With Variant Value
      // ex: Coffee machine, with Variant model with value base, etc ...
      // as its a long list :/ i will seed a couple of them ...

      // Also This should be built as a separate API
      // But as task description it only requires
      // Querying and filtering the Database only "no set for data"

      // CM001
      const ProductVariants = [
        {
          productVariantName: 'small-base-machine',
          ProductId: 1,
          sku: 'CM001',
        }];
      ProductVariant.bulkCreate(ProductVariants);

      // now we set the variation for this sku
      // const ProductDetials = [
      //   { VariantValueId: 1 },
      //   { ProductVariantId: 1 },
      // ];

      // eslint-disable-next-line max-len
      // sequelize.query('insert into product_details(VariantValueId,ProductVariantId) values(1,1)');
      // ProductDetail.bulkCreate(ProductDetials);

      return res.json('Seeded Successfully');
    } catch (err) {
      return res.status(500)
        .json({
          msg: 'Internal server error',
          err,
        });
    }
  };


  const skuList = async (req, res) => {
    let productName = req.query.productname;
    if (!productName) {
      return res.status(404);
    }
    let productId = await Product.findOne({
      where: {
        'name': productName
      },
      attributes: ['id']
    });
    productId = productId['dataValues']['id'];

    let variant = req.query.variant;

    var options = { where: {} };

    try {
      const skuList = await ProductVariant.findAll({
        where: {
          ProductId: productId,
        },
        attribute: ['sku'],
        include: [{
          model: VariantValue,
          as: 'variantsValues',
          where: { value: variant },
        }]

      });
      return res.status(200)
        .json(skuList);
    } catch (err) {
      console.log(err);
      return res.status(500)
        .json({
          msg: 'Internal server error',
          err,
        });
    }
  };


  return {
    seed,
    skuList,
  };
};

module.exports = ProductController;
