import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosAddCircle, IoIosLogOut } from "react-icons/io";
import { AiOutlineBell, AiOutlineUser } from "react-icons/ai";
import { TfiSettings } from "react-icons/tfi";
import Zoom from "@mui/material/Zoom";
import profile from "../../Assets/Images/user.png";
import Search from "../SearchComponent/Search";
import { Tooltip } from "@mui/material";
import AddPackage from "../packages/addPackage";
import axios from "axios";

const Topbar = () => {
  const [leedModal, setLeadmodal] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const feedbackRef = useRef();
  const [employeeDetails, setEmployeeDetails] = useState();
  const navigate = useNavigate();

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    // get employee details
    axios
      .get("http://localhost:4000/api/v1/posts/getAll")
      .then((res) => {
        setEmployeeDetails(res.data);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Main Container */}
      <div className="w-full h-[10vh] bg-white flex justify-between items-center sticky top-0 left-0 right-0 z-50 p-5 border-b-[1px]">
        {/* Logo Container */}
        <Link to="/">
          <div className=" h-full flex justify-center items-center p-3">
            <div className="w-full text-2xl font-bold text-[#2B7FFF]">
              <h1>BusinessDarshan</h1>
            </div>
          </div>
        </Link>
        {/* Functions Container */}
        <div className="fit-content flex items-center gap-5">
          {/* Search component */}
          {/* <Search /> */}
          {/* Quick Leads */}
          <div className="w-fit">
            <div className="w-full">
              {/* <Tooltip
                onClick={() => setLeadmodal(true)}
                title="Add Quick Leads"
                placement="left-start"
                arrow
                TransitionComponent={Zoom}
              >
                <div className="text-2xl">
                  <p className="cursor-pointer text-primary-blue hover:text-blue-500 transition-all ease-in-out duration-500">
                    <IoIosAddCircle />
                  </p>
                </div>
              </Tooltip> */}
            </div>
          </div>

          {/* Notification */}
          <div className="w-fit">
            <div className="w-full">
              <p className="text-xl text-primary-black hover:text-primary-blue transition-all ease-in-out duration-400 cursor-pointer">
                <AiOutlineBell />
              </p>
            </div>
          </div>
          {/* Profile */}
          <div className="w-fit">
            <div className="relative w-fit grid grid-cols-2 gap-3">
              <div className="w-full flex justify-end relative">
                <img
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="w-[40px] h-[40px] object-cover rounded-full cursor-pointer"
                  src={profile}
                  alt="User"
                />
                {/* dropdown section */}
                {profileDropdown && (
                  <div
                    ref={feedbackRef}
                    className="w-[150px] bg-white rounded-md absolute top-16 -left-20 transition ease-in-out duration-500 delay-150 p-5 flex flex-col gap-3 drop-shadow-md"
                  >
                    <Link to="/employee/profile">
                      <p className="flex gap-2 items-center text-xs font-poppins cursor-pointer text-primary-black hover:text-primary-blue">
                        <span className="text-lg">
                          <AiOutlineUser />
                        </span>
                        My account
                      </p>
                    </Link>
                    <p className="flex gap-2 items-center text-xs font-poppins cursor-pointer text-primary-black hover:text-primary-blue">
                      <span className="text-lg">
                        <TfiSettings />
                      </span>
                      Settings
                    </p>
                    <p
                      onClick={() => logout()}
                      className="flex gap-2 items-center text-xs font-poppins cursor-pointer text-primary-black hover:text-primary-blue"
                    >
                      <span className="text-lg">
                        <IoIosLogOut />
                      </span>
                      Logout
                    </p>
                  </div>
                )}
              </div>
              {/* Dropdown component */}
              <div className="w-full">
                <p className="text-sm font-poppins font-semibold text-primary-black transition-all ease-in-out duration-400">
                  {employeeDetails &&
                    employeeDetails.user &&
                    employeeDetails.user.name}
                </p>
                <p className="text-xs font-poppins text-primary-black transition-all ease-in-out duration-400 capitalize">
                  {employeeDetails &&
                    employeeDetails.user &&
                    employeeDetails.user.role}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Calendar modal */}

        {/* Leed modal */}
        {leedModal && <AddPackage setLeadmodal={setLeadmodal} />}
      </div>
    </>
  );
};

export default Topbar;
