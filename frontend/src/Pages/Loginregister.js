import React, { useState } from "react";
import { Link } from "react-router-dom";
import image from "../Assets/Images/login.png";
import Login from "../Components/LoginComponent/Login";

const Loginregister = () => {
  // State
  const [signinNavbar, setSigninNavbar] = useState(true);

  return (
    <>
      {/* Main container */}
      <div className="w-full h-[100vh]">
        {/* Secondary conatiner */}
        <div className="w-full h-full grid grid-cols-2 ">
          {/* Image section */}
          <div className="w-full h-[100vh] relative">
            <img
              className="w-full h-[100vh] object-cover"
              src={image}
              alt="login"
            />
            {/* logo section */}
            <Link to="/dashboard">
              <h1 className="font-bold text-2xl absolute top-10 left-5 font-poppins cursor-pointer">
                The Nomad Experience
              </h1>
            </Link>
          </div>
          {/* Form section container */}

          <div className="w-full flex flex-col">
            {/* Form navbar */}
            <div className="w-full px-5">
              <p className="p-5 font-poppins text-sm font-semibold tracking-wide text-center cursor-pointer text-[#0052D4] transition ease-in duration-400 border-b-2 border-b-[#0052D4]">
                Sign In
              </p>
            </div>

            {/* Heading section */}
            {signinNavbar && (
              <div className="w-full p-6 flex flex-col gap-3 mt-2">
                <h1 className="font-poppins text-3xl font-bold tracking-wide text-[#0052D4]">
                  Hello,
                </h1>
                <h1 className="font-poppins text-3xl font-bold tracking-wide">
                  Welcome Back
                </h1>
                <Login />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginregister;
