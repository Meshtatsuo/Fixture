import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
function ProductCard(item) {
  //stuff
  const { _id, title, description, price, thumbnailKey, createdAt } = item;
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
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
    }
  };
  return (
    <>
      <Link to={link}>
        <div className="max-w-xs rounded overflow-hidden shadow-xl border-2 border-white hover:border-orange-100 m-2">
          <img
            className="w-full"
            src={thumbnailKey}
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-grey-darker text-base">{description}</p>
          </div>
          <div className="grid grid-rows-2 justify-items-end px-6">
            <button className="row-end-1 font-bold bg-blue-600 rounded-lg px-2 py-1">
              Add To Cart
            </button>
            <span className="font-bold row-end-2 mt-2">${price}</span>
          </div>
        </div>
      </Link>
    </>
  );
}
export default ProductCard;
