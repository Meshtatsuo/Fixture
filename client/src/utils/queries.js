import { gql } from "@apollo/client";

export const QUERY_ALL_PRODUCTS = gql`
  {
    allProducts {
      _id
      title
      description
      price
      thumbnailKey
      fileKey
      fileName
      createdAt
    }
  }
`;

export const QUERY_PRODUCT = gql`
  query product($id: ID!) {
    product(_id: $id) {
      _id
      title
      description
      price
      thumbnailKey
      fileKey
      fileName
      createdAt
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  {
    me_all {
      _id
      username
      email
      purchasedItems {
        _id
        purchaseDate
        products {
          _id
          title
          description
          price
          thumbnailKey
          fileKey
          fileName
          createdAt
        }
      }
      products {
        _id
        title
        description
        price
        thumbnailKey
        fileKey
        fileName
        createdAt
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;
