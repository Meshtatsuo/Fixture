import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";
import image from "../../assets/images/login_signup.jpg";

const SignUpForm = () => {
  //stuff
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        username: formState.username,
        email: formState.email,
        password: formState.password,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="container mx-auto flex">
        <div className=" flex-1 columns-1 p-40 m-auto">
          <div className="">
            <h3 className="font-bold text-4xl text">Get to it</h3>
          </div>
          <form onSubmit={handleFormSubmit} className="columns-1">
            <div className="mt-4 space-y-10">
              <div>
                <label className="block font-bold" for="username">
                  Username:
                </label>
                <input
                  type="text"
                  className="bg-amber-50 rounded-md border-2 border-black w-full"
                  onChange={handleChange}
                  name="username"
                />
              </div>
              <div>
                <label className="block font-bold" for="email">
                  Email:
                </label>
                <input
                  type="text"
                  className="bg-amber-50 rounded-md border-2 border-black w-full"
                  onChange={handleChange}
                  name="email"
                />
              </div>
              <div className="mt-4">
                <label className="block font-bold" for="password">
                  Password:
                </label>
                <input
                  type="password"
                  className="bg-amber-50 rounded-md border-2 border-black w-full"
                  onChange={handleChange}
                  name="password"
                />
              </div>

              <div className="grid grid-rows-2 space-y-5 justify-items-end">
                <div className="row-1 ml-60">
                  <button
                    type="submit"
                    className="bg-amber-50 px-4 p-2  rounded-lg font-bold"
                  >
                    Log In
                  </button>
                </div>
                <div className="row-2 ml-10">
                  Already have an account?
                  <Link to="/login"> Log In!</Link>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex-1 p-10 ">
          <div className="">
            <img src={image} alt="img" className="scale-75" srcset="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
