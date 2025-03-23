const { default: gql } = require("graphql-tag");


const wishlistSchema = gql`
    type Product{
        catId: String! 
        subCatId: String!
        name: String!
        img: String!
        model: String!
        price: Int!
    }
    input ProductInput {
        productId: String
        catId: String! 
        subCatId: String!
        name: String
        img: String!
        model: String!
        price: Int!
    }
    type Wishlist{
        email: String!
        products: [Product]
    }
    type Query{
        wishlistByEmail(email: String!): Wishlist
    }
    type Mutation{
       addOrRemovedToWishlist(_id: ID!,catId: String!, subCatId: String!, name:String!, email: String!, img: String!, model:String!, price:Int!): String
    }
`;
module.exports = wishlistSchema;