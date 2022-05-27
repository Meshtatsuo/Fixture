const { gql } = require('apollo-server-express');

const typeDefs = gql`
  
  type Product {
    _id: ID
    title: String
    description: String
    price: Float
    thumbnailKey: String
    fileKey: String
    fileName: String
    createdAt: String
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
  me: User
  users: [User]
  product(_id: ID!): Product
  products(_id: ID): [Product]
  user(username: String!): User
  order(_id: ID!): Order
  checkout(products: [ID]!): Checkout
}

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(username: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
