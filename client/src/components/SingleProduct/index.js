import React from "react";
import image from "../../assets/images/feat-side-1.png";

const SingleProduct = () => {
  //stuff

  return (
    <>
      <div class="font-bold text-4xl ml-20 flex-1">
        <h1 className="">Product Title</h1>
        <h1 className="text-2xl mt-2">$00.00</h1>
      </div>
      <div className="container m-auto lg:flex md:flex-wrap">
        <div className="flex-1 p-12">
          <p className="font-bold text-xl p-10">
            This is where the description goes.
          </p>
        </div>
        <div className="flex-1 p-10 my-10">
          <img src={image} alt="woman shopping" />
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
