import React, { useEffect } from "react";
import { QUERY_CHECKOUT } from "../utils/queries";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { idbPromise } from "../utils/helpers";
import CartItem from "../components/CartItem";
import Jumbo from "../assets/images/cart-jumbo.png";
import { ADD_MULTIPLE_TO_CART } from "../utils/actions";
import Auth from "../utils/auth";
import { useStoreContext } from "../utils/GlobalState";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  // calculate totals
  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  return (
    <div>
      <img src={Jumbo} alt="fixture jumbo" />
      <div className="container m-auto columns-1">
        <div className="p-5 align-middle">
          <h1 className="font-bold align-middle text-4xl p-10">My Cart</h1>{" "}
          <div className="container flex p-3 border-b-2">
            <div className="flex-1 font-bold text-m">Item Name</div>
            <div className="flex-0 px-6 font-bold text-m">Quantity</div>
            <div className="flex-0 px-6 font-bold text-m">Price</div>
          </div>
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <div className="flex flex-wrap">
          <p className="flex-1 w-full px-6 font-bold text-xl text-right">
            Total: ${calculateTotal()}
          </p>
        </div>
        <button
          onClick={submitCheckout}
          className="font-bold float-right text-md py-3 px-6 m-5 rounded-xl bg-orange-200 border-2 border-black"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
