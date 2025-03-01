const productResolver = require('./productResolver');
const cartResolver = require('./cartResolver');

const resolvers = [productResolver, cartResolver];

module.exports = resolvers;