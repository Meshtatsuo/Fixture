import React from "react";

import { useQuery } from "@apollo/client";
import { QUERY_PRODUCT } from "../../utils/queries";
import { useParams } from "react-router";

const SingleProduct = () => {
  const params = useParams();
  const { data } = useQuery(QUERY_PRODUCT, {
    variables: { id: params.id },
  });
  let product;
  if (data) {
    product = data.product;
  }
  return (
    <>
      <div className="font-bold text-4xl ml-20 flex-1">
        <h1 className="">{product?.title}</h1>
        <h1 className="text-2xl mt-2">${product?.price}</h1>
      </div>
      <div className="container m-auto lg:flex md:flex-wrap">
        <div className="flex-1 p-12">
          <p className="font-bold text-xl p-10">{product?.description}</p>
        </div>
        <div className="flex-1 p-10 my-10">
          <img src={product?.thumbnailKey} alt="woman shopping" />
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
