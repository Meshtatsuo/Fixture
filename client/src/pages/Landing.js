import React from "react";
import { Link } from "react-router-dom";
import Jumbo from "../assets/images/Jumbo.png";

const Landing = () => {
  //stuff

  return (
    <div>
      <img src={Jumbo} alt="fixture jumbo" />
      <div className="container m-auto lg:flex md:flex-wrap sm:p-5">
        <div className="my-10 px-10 flex-1">
          <h1 className="font-bold align-middle text-4xl">
            Welcome to Fixture
          </h1>
          <p className="my-5 p-2 ">
            Fixture is a premium online digital sales platform that allows you
            to take control of your e-commerce hustle. List products, track
            sales, share with creators. Sign up and see for yourself!
          </p>
        </div>
        <div className="my-10 px-10 flex-1">
          <h1 className="font-bold align-right text-4xl">
            Start Selling Today
          </h1>
          <p className="my-5 p-2">
            Signing up only takes a few seconds. Why not come see what FIXTURE
            is all about?
          </p>
          <Link to="/signup">
            <button className="float-right text-lg font-bold p-3 bg-orange-100 border-black rounded border-2 hover:bg-orange-200 mx-10">
              Sign up today
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
