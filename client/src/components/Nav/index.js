import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

import Logo from "../../assets/images/Logo.png";

function Nav() {
  return (
    <div className="mr-auto shadow-xl">
      <div className="container mx-auto lg:columns-2 sm:columns-1">
        <Link to="/">
          <img
            className="p-3 md:max-w-xs sm:max-w-xs md:m-auto lg:m-0 sm:m-auto xs:m-auto"
            alt="logo"
            src={Logo}
          />
        </Link>
        <div className="p-3 lg:flex md:flex-wrap">
          <h2 className="flex-1 text-center py-4 text-xl align-middle font-bold ">
            <Link to="/browse">BROWSE</Link>
          </h2>
          <h2 className="flex-1 text-center py-4 text-xl align-middle font-bold ">
            <Link to="/features">FEATURES</Link>
          </h2>
          <h2 className="flex-1 text-center py-4 text-xl align-middle font-bold ">
            <Link to="/login">SIGNUP/LOGIN</Link>
          </h2>
          <h2 className="flex-1 text-center py-4 text-xl align-middle font-bold">
            <Link to="/cart">MY CART</Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Nav;
