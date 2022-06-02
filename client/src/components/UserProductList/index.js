import React from "react";
import ProductCard from "../ProductCard";

function UserProductList(props) {
  const data = props;
  return (
    <div className="flex-1 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-4">
      {data?.products?.length ? (
        <div className="flex px-10">
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
