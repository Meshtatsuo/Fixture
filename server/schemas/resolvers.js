const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Order } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")(process.env.STRIPE_KEY);

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
        const userData = await User.findOne({
          username: context.user.username,
        }).select("-__v -password");
        // .populate("products");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    me_all: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user._id);
        const userData = await User.findById(context.user._id)
          .select("-__v -password")
          .populate("purchasedItems")
          .populate("products");

        return userData;
      }
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
      const url = new URL(context.headers.referer).origin;
      console.log(args);
      let order;

      order = new Order({
        products: args.products,
      });

      let { products } = await order.populate("products");
      const line_items = [];
      console.log("Setting up product list");

      for (let i = 0; i < products.length; i++) {
        // generate product id
        const product = await stripe.products.create({
          name: products[i].title,
          description: products[i].description,
        });
        console.log("setting up prices");
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

      console.log("setting up session");
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });
      console.log("Setup complete!");
      console.log(session);
      return {
        session: session.id,
      };
    },
    //not sure if this would actually show all products or only those tied to a user
    products: async () => {
      return User.find().select("-__v -password").populate("products");
    },
    allProducts: async () => {
      return Product.find().select("-__v");
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
        const newProduct = await Product.create({
          ...product,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { username: context.user.username },
          { $push: { products: newProduct } },
          { new: true }
        );

        return newProduct;
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
