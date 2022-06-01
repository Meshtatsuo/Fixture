import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from "../../utils/mutations";
import image from "../../assets/images/login_signup.jpg";


const SignUpForm = () => {
  //stuff
  const [formState, setFormState] = useState({username: "", email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
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
    console.log(name);
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return  <div>
  <div className="grid grid-cols-2 mx-auto justify-center gap-x-10 mt-20 max-w-screen-2xl">
    <div className="mt-10 flex-1">
      <div className="">
      <h3 className="font-bold text-4xl text">Start Your Journey</h3>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div class="mt-4 space-y-10">
          <div>
            <label class="block font-bold" for="username">
              Username:
            </label>
            <input
               name='username'
              type="text"
              class="bg-amber-50 rounded-md border-2 border-black w-3/4"
              onChange={handleChange}
            />
          </div>
          <div class="mt-4">
            <label  class="block font-bold">Email:</label>
            <input
              name='email'
              type="email"
              class="bg-amber-50 rounded-md border-2 border-black w-3/4"
              onChange={handleChange}
            /> 
          </div> 
          <div class="mt-4"> 
            <label class="block font-bold">Password:</label> 
            <input 
               name='password'
              type="password" 
               class="bg-amber-50 rounded-md border-2 border-black w-3/4"
               onChange={handleChange}
            />
          </div>
          <div class="grid grid-rows-2 space-y-5 justify-items-end">
          <div class="row-1 ml-60">
            <button type='submit' class="bg-amber-50 px-4 p-2 rounded-lg font-bold">
              Sign Up
            </button>
          </div>
          <div class="row-2 ml-10">
            Already have an account?
            <Link to="/login">Log In!</Link>

            </div>
          </div>
        </div>
      </form>
    </div>
    <div className="flex-1">
      <div className="">
      <img src={image} alt="img" className="max-w-sm" srcset="" />
      </div>
    </div>
  </div>
</div>
};

export default SignUpForm;