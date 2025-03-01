const CartModel = require('../../schemaModels/cartSchemaModel');

const cartResolver ={
    Query:{
        allCarts: async()=>{
            return await CartModel.find({});
        }, 
        cartsByEmail: async(_, {email})=>{
            return await CartModel.find({email})
        }, 
        cartCountByEmail : async(_, {email})=>{
            return await CartModel.countDocuments({ email });
        }, 
    }, 
    Mutation:{
        addOrIncreaseCartCount: 
         async(_, {_id,productId, catId, subCatId, name, email, img, model, price, count})=>{
            const exists = await CartModel.findOne({productId: _id, email});

            if(!exists){
                return await CartModel({productId: _id, catId, subCatId, name, email, img, model, price, count: 1}).save();
            }else{
                return await CartModel.findOneAndUpdate(
                    { productId: _id, email },
                    { $inc: {count: 1}}, 
                    { new: true, upsert: true}
                )
            }
         }, 

        increaseCartItem: async(_, {_id, email})=>{
            await CartModel.findOneAndUpdate(
                { _id, email }, // Filter: Find the document with this ID
                { $inc: { count: 1 } }, // Update: Increment the "quantity" field by 1
                { new: true } // Options: Return the updated document
            );
            return "Item Increased"
        },

        decreaseCartItem: async(_, {_id, email})=>{
            await CartModel.findOneAndUpdate(
                { _id, email }, // Filter: Find the document with this ID
                { $inc: { count: -1 } }, // Update: Increment the "quantity" field by 1
                { new: true } // Options: Return the updated document
            );
            return "Item Drease"
        },
        
        deleteCartItemByEmailid: async(_,{_id, email})=>{
            await CartModel.findOneAndDelete({_id, email});
            return "Product deleted!";
        }, 

        deleteAllCartItems: async()=>{
            await CartModel.deleteMany({});
            return "All cart items deleted!";
        }
    }
}

module.exports = cartResolver;