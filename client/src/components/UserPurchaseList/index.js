import React from "react";
import PurchasedProductCard from "../PurchasedProductCard";

function UserPurchaseList(props) {
  const data = props;

  console.log(data);
  return (
    <div className="my-2">
      {data?.purchases?.length ? (
        <div className="flex-1 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-4">
          {data.purchases.map((purchase) => (
            <>
              {purchase.products.map((product) => (
                <PurchasedProductCard id={product._id} />
              ))}
            </>
          ))}
        </div>
      ) : (
        <h3 className="px-10">You haven't purchased any products yet!</h3>
      )}
    </div>
  );
}

export default UserPurchaseList;
