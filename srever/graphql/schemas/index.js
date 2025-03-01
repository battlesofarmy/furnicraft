const productSchema = require('./productSchema');
const cartSchema = require('./cartSchema');

const typeDefs = [productSchema, cartSchema];

module.exports = typeDefs;