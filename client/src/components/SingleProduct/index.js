import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { Link } from "react-router-dom";
import { idbPromise } from "../../utils/helpers";
const SingleProduct = (item) => {
  //stuff
  const { _id, title, description, price, thumbnailKey, createdAt } = item;
  const link = `/view/${_id}`;
  const [state, dispatch] = useStoreContext();
  const { cart } = state;
  const addToCart = () => {
    console.log("Adding");
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
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    }
  };
  return (
    <>
      <div className="font-bold text-4xl ml-20 flex-1">
        <h1 className="">{title}</h1>
        <h1 className="text-2xl mt-2">${price}</h1>
      </div>
      <div className="container m-auto lg:flex md:flex-wrap">
        <div className="flex-1 p-12">
          <p className="font-bold text-xl p-10">{description}</p>
        </div>
        <div className="flex-1 p-10 my-10">
          <img src={thumbnailKey} alt="woman shopping" />
        </div>
      </div>
      <div className="container m-auto lg:flex md:flex-wrap">
        <Link to="/browse" className="flex-1 p-12">
          <div className=" ">
            <p className="font-bold text-xl p-10 hover:bg-slate-100">
              Back to browse.
            </p>
          </div>
        </Link>
        <button onClick={addToCart} className="flex-1 p-12">
          <p className="font-bold  text-right text-xl p-10 rounded  hover:bg-slate-100">
            Add to cart
          </p>
        </button>
      </div>
    </>
  );
};

export default SingleProduct;
