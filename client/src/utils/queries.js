import { gql } from "@apollo/client";

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
