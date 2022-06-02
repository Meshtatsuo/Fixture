import React from "react";
import { Link } from "react-router-dom";
import SingleProduct from "../components/SingleProduct";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCT } from "../utils/queries";
const ViewProduct = () => {
  const params = useParams();
  const { data } = useQuery(QUERY_PRODUCT, {
    variables: { id: params.id },
  });
  let product;
  if (data) {
    product = data.product;
  }

  return (
    <div className="container m-auto p-3 my-10">
      <SingleProduct
        _id={product._id}
        title={product.title}
        description={product.description}
        price={product.price}
        thumbnailKey={product.thumbnailKey}
      />
    </div>
  );
};

export default ViewProduct;
