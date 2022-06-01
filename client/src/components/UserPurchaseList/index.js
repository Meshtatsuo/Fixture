import React from "react";
import ProductCard from "../ProductCard";

function UserPurchaseList(props) {
  const data = props;
  return (
    <div className="my-2">
      {data?.length ? (
        <div className="flex-row">
          {data.map((product) => (
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
        <h3 className="px-10">You haven't purchased any products yet!</h3>
      )}
    </div>
  );
}

export default UserPurchaseList;
