const WishlistModel = require('../../schemaModels/wishlistSchemaModel');

const wishlistResolver = {
    Query: {
        wishlistByEmail: async(_, {email})=> {
            return await WishlistModel.findOne({email});
        }
    }
}
module.exports = wishlistResolver;