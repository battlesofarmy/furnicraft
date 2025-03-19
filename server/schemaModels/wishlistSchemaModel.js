const mongoose = require('mongoose');

const wishliSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] 
    },
    products: {type: [String]},
}, {versionKey: false});

const WishlistModel = mongoose.model('Wishlist', wishliSchema);
module.exports = WishlistModel;