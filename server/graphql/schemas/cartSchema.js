const {gql} = require('graphql-tag');

const cartSchema = gql`
    type Cart{
        _id: ID!
        productId: String
        catId: String! 
        subCatId: String!
        name: String
        email: String!
        img: String!
        model: String!
        price: Int!
        count: Int!
    }
    type Query{
        allCarts: [Cart]
        cartsByEmail(email: String!): [Cart]
        cartCountByEmail(email: String!): Int
    }
    type Mutation{
        addOrIncreaseCartCount(_id: ID!, productId: String, catId: String!, subCatId: String!, name: String!, email: String!, img: String!, model: String!, price: Int!, count: Int!): Cart

        increaseCartItem(_id: ID!, email: String!): String
        decreaseCartItem(_id: ID!, email: String!): String

        deleteCartItemByEmailid(_id:ID!, email:String!): String
        deleteAllCartItems: String
    }
`;

module.exports = cartSchema;