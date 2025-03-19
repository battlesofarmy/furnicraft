const { default: gql } = require("graphql-tag");

const wishlistSchema = gql`
    type Wishlist{
        email: String!
        products: [String!]
    }
    type Query{
        wishlistByEmail(email: String!): [Wishlist] 
    }
`;
module.exports = wishlistSchema;