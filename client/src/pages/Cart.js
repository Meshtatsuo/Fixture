import React from "react";

import CartItem from "../components/CartItem";
import Jumbo from "../assets/images/cart-jumbo.png";

import Auth from "../utils/auth";
import { useStoreContext } from "../utils/GlobalState";

const Cart = () => {
  const [state, dispatch] = useStoreContext();

  // calculate totals
  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  return (
    <div>
      <img src={Jumbo} alt="fixture jumbo" />
      <div className="container m-auto columns-1">
        <div className="p-5 align-middle">
          <h1 className="font-bold align-middle text-4xl p-10">My Cart</h1>{" "}
          <div class="container flex p-3 border-b-2">
            <div class="flex-1 font-bold text-m">Item Name</div>
            <div class="flex-0 px-6 font-bold text-m">Quantity</div>
            <div class="flex-0 px-6 font-bold text-m">Price</div>
          </div>
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <div className="flex flex-wrap">
          <p className="flex-1 w-full px-6 font-bold text-xl text-right">
            Total:
          </p>
          <p className="px-6 font-bold text-xl">$150.00</p>
        </div>
        <button className="font-bold float-right text-md py-3 px-6 m-5 rounded-xl bg-orange-200 border-2 border-black">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
