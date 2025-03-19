const { default: gql } = require("graphql-tag");


const wishlistSchema = gql`
    type Product{
        id: String!
        name: String!
        img: String!
        model: String!
    }
    type Wishlist{
        email: String!
        products: [Product]
    }
    type Query{
        wishlistByEmail(email: String!): Wishlist
    }
`;
module.exports = wishlistSchema;