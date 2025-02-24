const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    // _id: {type: String}
    catId: {type: String, required: true},
    subCatId: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    img: {type: String, required: true},
    model: {type: String, required: true},
    price: {type: String, required: true},
}, {versionkey: false});

const CategoryModel = mongoose.model("Category", categorySchema);
module.exports = CategoryModel;