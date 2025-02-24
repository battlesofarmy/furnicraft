const ProductModel = require('../../schemaModels/productSchemaModel')
const CategoryModel = require('../../schemaModels/categorySchemaModel')
const SubCategoryModel = require('../../schemaModels/subCategorySchemaModel')

const productResolver = {
    Query: {
        allPoducts: async()=> {
            return await ProductModel.find({});
        },
        productsByCategory: async(_, {catId})=>{
            return await ProductModel.find({catId})
        },
        productsBySubCategory: async(_, {subCatId})=>{
            return await ProductModel.find({subCatId})
        }, 
        productById: async(_, {_id})=>{
            return await ProductModel.findOne({_id});
        }, 

        getCategory: async()=>{
            return await CategoryModel.find({});
        }, 
        getSubcategory: async()=>{
            return await SubCategoryModel.find({});
        }
    }
}
module.exports = productResolver;