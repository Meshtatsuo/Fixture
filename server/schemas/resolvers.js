const { AuthenticationError } = require("apollo-server-express");
const { User, Product } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

// AWS functionality
const { uploadFile, getFile, downloadFile } = require("../utils/s3.js");

const resolvers = {
  Query: {
    product: async (parent, { _id }) => {
      return await Product.findById(_id);
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "products",
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("products");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find().select("-__v -password").populate("products");
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "products",
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },
    checkout: async (parent, args, context) => {
      const order = new Order({
        products: args.products,
      });
      const { products } = await order.populate("products");

      const line_items = [];
      const url = new URL(context.headers.referer).origin;

      for (let i = 0; i < products.length; i++) {
        // generate product id
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          //add image here thumbnailKey: [`${url}/images/${products[i].image}`]
        });

        // generate price id using the product id
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "usd",
        });

        // add price id to the line items array
        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return {
        session: session.id,
      };
    },
    //not sure if this would actually show all products or only those tied to a user
    products: async () => {
      return User.find().select("-__v -password").populate("products");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return {
        token,
        user,
      };
    },
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({
          products,
        });

        await User.findByIdAndUpdate(context.user._id, {
          $push: {
            orders: order,
          },
        });

        return order;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        {
          $inc: {
            quantity: decrement,
          },
        },
        {
          new: true,
        }
      );
    },
    addProduct: async (parent, { product }, context) => {
      if (context.user) {
        const product = await Product.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { products: product } },
          { new: true }
        );

        return product;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    //may not need this?
    saveProduct: async (parent, { product }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { products: product } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeProduct: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { products: product._id } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({
        email,
      });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return {
        token,
        user,
      };
    },
  },
};

module.exports = resolvers;
