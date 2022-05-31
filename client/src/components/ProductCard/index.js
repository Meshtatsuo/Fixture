import React from "react";

const ProductCard = () => {
  //stuff

  return <div class="max-w-xs rounded overflow-hidden shadow-lg m-2">
  <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-grey-darker text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div class="grid grid-rows-2 justify-items-end px-6">
    <button class="row-end-1 font-bold bg-blue-600 rounded-lg px-2 py-1">Add To Cart</button>
    <span class="font-bold row-end-2 mt-2">$000.00</span>
  </div>
</div>
};

export default ProductCard;
