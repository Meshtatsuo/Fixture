import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import image from "../../assets/images/login_signup.jpg";
import { LOGIN } from "../../utils/mutations";
import  Auth  from "../../utils/auth";
import { Link } from "react-router-dom";

const LogInForm = () => {
  //stuff
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // handle form submission
  
  return <div>
  <div className="container mx-auto flex">
    <div className=" flex-1 columns-1 p-40 m-auto">
      <div className=""> 
      <h3 className="font-bold text-4xl text">Get to it</h3>
      </div>
      <form onSubmit={handleFormSubmit} className="columns-1">
        <div class="mt-4 space-y-10">
          <div>
            <label  class="block font-bold" for="email">
              Email:
            </label>
            <input
              type="text"
              class="bg-amber-50 rounded-md border-2 border-black w-full"
              onChange={handleChange}
              name="email"
            />
          </div>
          <div class="mt-4">
            <label  class="block font-bold" for="password">Password:</label>
            <input
              type="password"
              class="bg-amber-50 rounded-md border-2 border-black w-full"
              onChange={handleChange}
              name="password"

            />
          </div>
          
          <div class="grid grid-rows-2 space-y-5 justify-items-end">
          <div class="row-1 ml-60">
            <button type="submit"  class="bg-amber-50 px-4 p-2 rounded-lg font-bold">
              Log In
            </button>
          </div>
          <div class="row-2 ml-10">
            Don't have an account?
               <Link to="/signup">Sign Up!</Link>
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
};

export default LogInForm;
