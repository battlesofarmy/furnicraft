const WishlistModel = require('../../schemaModels/wishlistSchemaModel');

const wishlistResolver = {
    Query: {
        wishlistByEmail: async(_, {email})=> {
            return await WishlistModel.findOne({email});
        },
    },
    Mutation: {
        addOrRemovedToWishlist: async(_, {_id, catId, subCatId, name, email, img, model, price})=> {
            
            const wishlist = await WishlistModel.findOne({ email });
            const productExists = wishlist?.products.find(
                (val) => val._id.toString() === _id
            );

            if(productExists){
                await WishlistModel.updateOne(
                    {email},
                    {$pull: {products: {_id,catId, subCatId, name, img, model, price}}}
                )
                return "Successfully Deleted wishlist item";
            }else{
                await WishlistModel.updateOne(
                    {email},
                    {$push: {products: {_id,catId, subCatId, name, img, model, price}}},
                    {upsert: true}

                )
                return "Successfully added wishlist item";
            }
        }
    }
}
module.exports = wishlistResolver;
