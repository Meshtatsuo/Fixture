import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import ProductCard from "../ProductCard";
import { QUERY_ALL_PRODUCTS } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { data } = useQuery(QUERY_ALL_PRODUCTS);

  useEffect(() => {
    if (data) {
      /* dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });*/
      console.log(data.allProducts);
    }
  }, [data, dispatch]);

  return (
    <div className="my-2">
      {data?.allProducts.length ? (
        <div className="flex-1 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-4">
          {data.allProducts.map((product) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              title={product.title}
              description={product.description}
              price={product.price}
              thumbnailKey={product.thumbnailKey}
              createdAt={product.createdAt}
            />
          ))}
          {data.allProducts.map((product) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              title={product.title}
              description={product.description}
              price={product.price}
              thumbnailKey={product.thumbnailKey}
              createdAt={product.createdAt}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
    </div>
  );
}

export default ProductList;
