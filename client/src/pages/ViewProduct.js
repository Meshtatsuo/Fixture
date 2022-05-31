import React from "react";
import { Link } from "react-router-dom";
import SingleProduct from "../components/SingleProduct";

const ViewProduct = () => {
  function addToCart() {
    //add to cart function
    //redirect to cart when item added!
  }
  return (
    <div className="container m-auto p-3 my-10">
      <SingleProduct />
      <div className="container m-auto lg:flex md:flex-wrap">
        <div className="flex-1 p-12">
          <p className="font-bold text-xl p-10 hover:bg-slate-100">
            <Link to="/browse">Back to browse.</Link>
          </p>
        </div>
        <div className="flex-1 p-12">
          <p className="font-bold  text-right text-xl p-10 rounded  hover:bg-slate-100">
            Add to cart
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
