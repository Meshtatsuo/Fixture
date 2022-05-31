import React from "react";

const Profile = () => {
  //stuff

  return (
    <div className="container m-auto">
      <h1 className="font-bold align-middle text-4xl p-10">Welcome, [username]</h1>
      
      <div id="profile-info" class="sm-columns-1">
        <h2 className="font-bold text-3xl p-10">
          Your Products
        </h2>
        <p>product cards go here</p>
      </div>
      
      <div id="profile-info" class="md-columns-2 sm-columns-1">
        <h2 className="font-bold text-3xl p-10">
          Your Purchases
        </h2>
        <p>Modified product cards go here (includes a download button)</p>
      </div>

    </div>
  );
};

export default Profile;
