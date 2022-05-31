import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import Jumbo from "../assets/images/Jumbo.png";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const products = cart.map((item) => item._id);

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
<div>
    <img src={Jumbo} alt="fixture jumbo" />
    <div className="container m-auto lg:columns-2 md:columns-1 sm:p-5">
        <div className="p-5 align-middle">
            <h1 className="font-bold align-middle text-4xl p-10">
                Success!
            </h1>{" "}
            <h2>Thank you for your purchase!</h2>
            <p>You will now be redirected to the home page</p>
        </div>
    </div>
</div>
  );
}

export default Success;
