import React from "react";

import image from "../assets/images/create-product.jpg";
import NewProductForm from "../components/NewProductForm";
const NewProduct = (props) => {
  return (
    <div className="container m-auto p-3 my-5 flex">
      <div className="flex-1 p-10">
        <h1 className="font-bold align-middle text-4xl p-10">
          Create your product.
        </h1>
        <NewProductForm />
      </div>
      <div className="flex-1 p-10 my-10">
        <img src={image} alt="woman shopping" />
      </div>
    </div>
  );
};

export default NewProduct;
