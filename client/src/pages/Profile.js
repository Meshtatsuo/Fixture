import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import UserProductList from "../components/UserProductList";
import UserPurchaseList from "../components/UserPurchaseList";
const Profile = () => {
  const { data } = useQuery(QUERY_ME);
  let username;
  let products;
  let purchases;

  if (data) {
    console.log(data);
    username = data?.me_all.username;
    products = data?.me_all.products;
    purchases = data?.me_all.purchases;
  }

  return (
    <div className="container m-auto">
      <h1 className="font-bold align-middle text-4xl p-10">
        Welcome, {username}
      </h1>

      <div id="profile-info" class="sm-columns-1">
        <h2 className="font-bold text-3xl p-10">Your Products</h2>
        <UserProductList products={products} />
      </div>

      <div id="profile-info" class="md-columns-2 sm-columns-1">
        <h2 className="font-bold text-3xl p-10">Your Purchases</h2>
        <UserPurchaseList purchases={purchases} />
      </div>
    </div>
  );
};

export default Profile;
