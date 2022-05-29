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

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//Below is one option for this mutation (uses ProductInput)
// export const ADD_PRODUCT = gql`
//   mutation addProduct($product: ProductInput!) {
//     addProduct(product: $product) {
//       _id
//       username
//       email
//       products {
//         title
//         description
//         price
//         thumbnailKey
//         fileKey
//       }
//     }
//   }
// `;

export const ADD_PRODUCT = gql`
  mutation addProduct($product: product) {
    addProduct(product: $product) {
      products {
        title
        description
        price
        thumbnailKey
        fileKey
      }
    }
  }
`;

//This has not been tested, unsure how to use _id
export const REMOVE_PRODUCT = gql`
  mutation removeProduct($_id: ID!) {
    removeProduct(ID: $_id) {
        _id
        username
        email
        products {
          title
          description
          price
          thumbnailKey
          fileKey
        }
      }
    }
`;
