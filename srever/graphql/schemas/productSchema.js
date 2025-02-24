
const {gql} = require('graphql-tag');

const productSchema = gql`
    type Category{
        _id: ID!
        id: String!
        name: String!
        img: String!
    }
    type Subcategory{
        _id: ID!
        catId: String!
        subCatId: String
        name: String!
        img: String!
    }
    type Product {
        _id: ID!
        catId: String!
        subCatId: String!
        name: String!
        img: String!
        model: String!
        price: Int!
    }
    
    type Query{
        allPoducts: [Product]
        productsByCategory(catId: String!): [Product]
        productsBySubCategory(subCatId: String!): [Product]
        productById(_id: ID!): Product

        getCategory: [Category]
        getSubcategory: [Subcategory]
    }
`;
module.exports = productSchema;