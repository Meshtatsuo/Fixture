import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
const CartItem = ({ item }) => {
  const [dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "0") {
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

  return (
    <div>
      <div className="container flex p-3 border-b-2">
        <div className="flex-1 font-bold text-m">Test Product Name</div>
        <input
          className="shrink-1 px-1 py-2 w-16"
          type="number"
          placeholder="1"
          value="val"
          onChange={onChange}
        />
        <div className="shrink-1 px-5">$50.00</div>
      </div>
    </div>
  );
};

export default CartItem;
