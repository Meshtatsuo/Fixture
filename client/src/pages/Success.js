import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import Jumbo from "../assets/images/Jumbo.png";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";
import { useStoreContext } from "../utils/GlobalState";

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);
  const [state, dispatch] = useStoreContext();
  const { cart } = state;

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");
      const products = cart.map((item) => item._id);

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise("cart", "delete", item);
        });
      }
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <img src={Jumbo} alt="fixture jumbo" />
      <div className="container m-auto lg:columns-1 md:columns-1 sm:p-5">
        <div className="p-5 align-middle">
          <h1 className="font-bold align-middle text-4xl p-10">Success!</h1>{" "}
          <h2>Thank you for your purchase!</h2>
        </div>
      </div>
    </div>
  );
}

export default Success;
