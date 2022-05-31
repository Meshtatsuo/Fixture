import React from "react";
import login from "../../assets/images/login_signup.jpg";
const LogInForm = () => {
  //stuff

  return (
    


<div>
<div className="grid grid-cols-2 mx-auto justify-center gap-x-10 mt-20 max-w-screen-2xl">
  <div className="mt-10 flex-1">
    <div className="">
    <h3 className="font-bold text-4xl text">Get to it</h3>
    </div>
    <form action="">
      <div class="mt-4 space-y-10">
        <div>
          <label class="block font-bold" for="Username">
            Username:
          </label>
          <input
            type="text"
            class="bg-amber-50 rounded-md border-2 border-black w-3/4"
          />
        </div>
        <div class="mt-4">
          <label class="block font-bold">Password:</label>
          <input
            type="password"
            class="bg-amber-50 rounded-md border-2 border-black w-3/4"
          />
        </div>
        
        <div class="grid grid-rows-2 space-y-5 justify-items-end">
        <div class="row-1 ml-60">
          <button class="bg-amber-50 px-4 p-2 rounded-lg font-bold">
            Log In
          </button>
        </div>
        <div class="row-2 ml-10">
          Don't have an account?
          <a class="font-bold" href="#">
             Sign Up!
             
          </a>
          </div>
        </div>
      </div>
    </form>
  </div>
  <div className="flex-1">
    <div className="">
    <img src={login} alt="img" className="max-w-sm" srcset="" />
    </div>
  </div>
</div>
</div>
  )
};

export default LogInForm;
