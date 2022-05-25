const { gql } = require('apollo-server-express');

const typeDefs = gql`
  
  type Product {
    _id: ID
    title: String
    description: String
    price: Float
    thumbnailKey: String
    fileKey: String
    fileExtension: String
    createdAt: String
    numberSold: Int
    lastSold: String
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    username: String
    email: String
    purchasedItems: [Product]
    products: [Product]
  }

  type Auth {
    token: ID
    user: User
  }

  type Checkout {
    session: ID
  }

type Query {
  products(category: ID, name: String): [Product]
  product(_id: ID!): Product
  user: User
  order(_id: ID!): Order
  checkout(products: [ID]!): Checkout
}

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
