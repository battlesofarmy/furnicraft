const productResolver = require('./productResolver');
const cartResolver = require('./cartResolver');
const wishlistResolver = require('./wishlistResolver');

const resolvers = [productResolver, cartResolver, wishlistResolver];

module.exports = resolvers;