import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { isCompositeType } from "graphql";
const CartItem = ({ item }) => {
  const [state, dispatch] = useStoreContext();

  const onChange = (e) => {
    const value = e.target.value;
    console.log(e.target.value);
    if (value === "0" || item.purchaseQuantity === 0) {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
    }
  };
  function calculateTotal() {
    let sum = 0;
    sum += item.price * item.purchaseQuantity;
    return sum.toFixed(2);
  }

  return (
    <div>
      <div className="container flex p-3 border-b-2">
        <div className="flex-1 font-bold text-m">{item?.title}</div>
        <input
          className="shrink-1 px-1 py-2 w-16"
          type="number"
          placeholder="1"
          value={item.purchaseQuantity}
          onChange={onChange}
        />
        <div className="shrink-1 px-5">{calculateTotal()}</div>
      </div>
    </div>
  );
};

export default CartItem;
