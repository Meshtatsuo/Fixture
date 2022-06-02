import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import UserProductList from "../components/UserProductList";
import UserPurchaseList from "../components/UserPurchaseList";
import auth from "../utils/auth";

const Profile = () => {
  const { data } = useQuery(QUERY_ME);
  let username;
  let products;
  let purchases;

  if (data) {
    console.log(data);
    username = data?.me_all?.username;
    products = data?.me_all?.products;
    purchases = data?.me_all?.purchasedItems;
  }

  function logout() {
    console.log("YAYA");
    auth.logout();
  }

  return (
    <div className="container m-auto">
      <h1 className="font-bold align-middle text-4xl p-10">
        Welcome, {username}
      </h1>
      <button
        onClick={logout}
        className="bg-orange-100 border-black border-2 rounded font-bold text-xl mx-10 my-5 p-2"
      >
        Log Out
      </button>

      <div id="profile-info" className="sm-columns-1">
        <div className="flex">
          <h2 className="flex-0 font-bold text-3xl p-10">Your Products</h2>
          <Link to="/new-product" className="flex-1">
            <button
              href="/"
              className="bg-orange-100 border-black border-2 rounded font-bold text-xl mx-10 my-8 p-2"
            >
              Create
            </button>
          </Link>
        </div>

        <UserProductList products={products} />
      </div>

      <div id="profile-info" className="md-columns-2 sm-columns-1">
        <h2 className="font-bold text-3xl p-10">Your Purchases</h2>
        <UserPurchaseList purchases={purchases} />
      </div>
    </div>
  );
};

export default Profile;
