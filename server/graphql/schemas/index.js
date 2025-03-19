const productSchema = require('./productSchema');
const cartSchema = require('./cartSchema');
const wishlistSchema = require('./wishlistSchema');

const typeDefs = [productSchema, cartSchema, wishlistSchema];

module.exports = typeDefs;