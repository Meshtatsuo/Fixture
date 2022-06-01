import React from "react";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductList";

const Browse = () => {
  //stuff

  return (
    <div className="text-lg mx-auto max-w-screen-2xl">
      <div>
        <h2 className="font-extrabold text-5xl m-2 mt-10"> Browse Products</h2>
      </div>
      <div class="mt-8 max-w-xs mx-auto space-y-16 sm:flex sm:items-start sm:max-w-full sm:space-y-0 lg:gap-x-12 xl:gap-x-24">
        <div class="flex-1 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-4">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Browse;
