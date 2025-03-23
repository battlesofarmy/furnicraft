const mongoose = require('mongoose');

const wishliSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] 
    },
    // products: {type: [String]},
    products: [{  // Array of objects
        catId: { type: String, required: true }, 
        subCatId: { type: String, required: true }, 
        name: { type: String, required: true }, 
        img: { type: String, required: true},
        model: { type: String, required: true},
        price: { type: Number, required: true},
    }]

}, {versionKey: false});

const WishlistModel = mongoose.model('Wishlist', wishliSchema);
module.exports = WishlistModel;