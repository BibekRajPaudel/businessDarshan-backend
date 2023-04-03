import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      {/* Main container */}
      <div
        id="sidebarDropdown"
        className="bg-white min-w-[200px] min-h-[90vh] max-h-[90vh] drop-shadow-sm border-r-[1px] flex flex-col gap-6 overflow-y-scroll"
      >
        {/* Navigation Container */}
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex flex-col items-start">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "w-full bg-[#E6F0FF] text-primary-blue  border-l-2 border-blue-500"
                  : "w-full cursor-pointer hover:text-primary-lightblue transition-all duration-100 ease-in-out hover:bg-slate-100"
              }
            >
              <p className="w-full text-subbody2 tracking-wide flex items-center gap-2 pl-7 pt-5 pb-5 font-poppins">
                <span className="text-lg">
                  <MdOutlineDashboard />
                </span>{" "}
                
                ड्यासबोर्ड
              </p>
            </NavLink>
            <NavLink
              to="/packages"
              className={({ isActive }) =>
                isActive
                  ? "w-full bg-[#E6F0FF] text-primary-blue border-l-2 border-blue-500"
                  : "w-full cursor-pointer hover:text-primary-lightblue transition-all duration-100 ease-in-out hover:bg-slate-100"
              }
            >
              <p className="w-full text-subbody2 tracking-wide flex items-center gap-2 pl-7 pt-5 pb-5  font-poppins">
                <span className="text-lg">
                  <BiUserCircle />
                </span>{" "}
                खबर/समाचार
              </p>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
