import { gql } from "@apollo/client";

export const CART_ITEMS = gql`
  query ($email: String!) {
    cartsByEmail(email: $email) {
      _id
      name
      email
      price
      count
      img
      model
    }
  }
`;

export const INCREASE_CART_ITEMS = gql`
  mutation ($_id: ID!, $email: String!) {
    increaseCartItem(_id: $_id, email: $email)
  }
`;

export const DECREASE_CART_ITEMS = gql`
  mutation ($_id: ID!, $email: String!) {
    decreaseCartItem(_id: $_id, email: $email)
  }
`;

export const DELETE_CART_ITEM_BY_EMAIL_ID = gql`
  mutation ($_id: ID!, $email: String!) {
    deleteCartItemByEmailid(_id: $_id, email: $email)
  }
`;
