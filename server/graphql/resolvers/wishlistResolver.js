const WishlistModel = require('../../schemaModels/wishlistSchemaModel');


const wishlistResolver = {
    Query: {
        wishlistByEmail: async(_, {email})=> {
            return await WishlistModel.find({email});
        }
    }
}
module.exports = wishlistResolver;