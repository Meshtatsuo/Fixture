import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
function ProductCard(item) {
  //stuff
  const { _id, title, description, price, thumbnailKey } = item;
  const link = `/view/${_id}`;
  const [state, dispatch] = useStoreContext();
  const { cart } = state;
  const addToCart = () => {
    // find the cart item with the matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    // if there was a match, call UPDATE with a new purchase quantity
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };
  return (
    <>
      <div className="max-w-xs rounded overflow-hidden shadow-lg m-2">
        <Link to={link}>
          <img className="w-full" src={thumbnailKey} alt="product thumbnail" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-grey-darker text-base">{description}</p>
          </div>
        </Link>
        <div className="grid grid-rows-2 justify-items-end px-6">
          <button
            onClick={addToCart}
            className="row-end-1 font-bold bg-orange-200 rounded-lg px-2 py-1"
          >
            Add To Cart
          </button>
          <span className="font-bold row-end-2 mt-2">${price}</span>
        </div>
      </div>
    </>
  );
}
export default ProductCard;
