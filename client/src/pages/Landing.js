import React from "react";
import Jumbo from "../assets/images/Jumbo.png";

const Landing = () => {
  //stuff

  return (
    <div>
      <img src={Jumbo} alt="fixture jumbo" />
      <div className="container m-auto lg:columns-2 md:columns-1 sm:p-5">
        <div className="p-5 align-middle">
          <h1 className="font-bold align-middle text-4xl p-10">
            Welcome to Fixture
          </h1>{" "}
          <p>
            Fixture is a premium online digital sales platform that allows you
            to take control of your e-commerce hustle. List products, track
            sales, share with creators. Sign up and see for yourself.
          </p>
        </div>
        <div>
          <h1 className="font-bold align-right text-4xl p-10 flex-1">
            Start Selling Today
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Landing;
