const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Product {
    _id: ID
    title: String
    description: String
    price: String
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

  input ProductInput {
    _id: ID
    title: String
    description: String
    price: Float
    thumbnailKey: String
    fileKey: String
    fileName: String
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Checkout {
    session: ID
  }

  type Query {
    product(_id: ID!): Product
    user: User
    me: User
    users: [User]
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    products: [Product]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(username: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    addProduct(product: ProductInput): User
    saveProduct(product: ProductInput): User
    removeProduct(_id: ID!): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
