const { MongoOIDCError } = require('mongodb');
const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    catId: {type: String, required: true},
    subCatId: {type: String, required: true},
    name: {type: String, required: true},
    img: {type: String, required: true},
    model: {type: String, required: true},
    price: {type: String, required: true},
}, {versionKey: false});

const SubCategoryModel = mongoose.model("Subcategory", subCategorySchema);
module.exports = SubCategoryModel;