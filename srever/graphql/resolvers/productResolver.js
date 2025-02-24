const ProductModel = require('../../schemaModels/productSchemaModel')
const CategoryModel = require('../../schemaModels/categorySchemaModel')
const SubCategoryModel = require('../../schemaModels/subCategorySchemaModel')

const productResolver = {
    Query: {
        // Category
        allCategories: async()=>{
            return await CategoryModel.find({});
        }, 

        // Sub Category
        allSubcategories: async()=>{
            return await SubCategoryModel.find({});
        }, 
        subCategoriesByCategory: async(_,{catId})=>{
            return await SubCategoryModel.find({catId})
        },

        // Product
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

    }
}
module.exports = productResolver;