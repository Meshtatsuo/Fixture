import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct($title: String!, $description: String!, $price: String!, thumbnailKey: String!, fileKey: String!){
    createProduct(title: $title, description: $description, price: $price, thumbnailKey: $thumbnailKey, fileKey: $fileKey){
      product{
        title
        description
        price
        productKey
        fileKey
      }
    }
  }
`;
