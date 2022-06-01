import React, { useEffect } from "react";
import ProductCard from "../ProductCard";

function UserProductList(props) {
  const data = props;
  console.log("User Product List", data.products);
  return (
    <div className="my-2">
      {data?.products?.length ? (
        <div className="flex-row px-10">
          {data.products.map((product) => (
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
        <h3 className="px-10">You haven't added any products yet!</h3>
      )}
    </div>
  );
}

export default UserProductList;
