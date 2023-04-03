import React, { useState } from "react";
import Sidebar from "../Components/SidebarComponent/Sidebar";
import Topbar from "../Components/TopbarComponent/Topbar";
import TablePagination from "@mui/material/TablePagination";
import Search from "../Components/SearchComponent/Search";
import "../CSS/Applicant.css";
import Listview from "../Components/ViewComponent/Listview";
import "../CSS/University.css";
import AddPackage from "../Components/packages/addPackage";

const Packages = () => {
  const [leedModal, setLeadmodal] = useState(false);
  const [page, setPage] = useState(0);
  const [applicantView, setApplicantView] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  // pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Topbar />
      <div className="flex gap-3">
        <div>
          <Sidebar />
        </div>
        {/* Main container */}
        <div
          id="maincontainer"
          className="w-full pr-5 pt-5 pb-5 h-[90vh] overflow-y-auto"
        >
          {/* Total Students */}
          {/* <TotalStudent /> */}
          {/* Filter and other navbar */}
          <div className="flex justify-between items-center">
            {/* Fliters */}
            <p className="font-poppins tracking-wide text-2xl font-bold text-primary-black">
             
            जानकारी
            </p>

            <div className="flex items-center">
              <p
                onClick={() => setLeadmodal(true)}
                className="bg-primary-lightblue w-32 text-center hover:bg-white hover:border-[1px] hover:border-primary-lightblue hover:text-primary-lightblue cursor-pointer p-2 font-poppins text-sm rounded text-white"
              >
                समाचार थप्नुहोस्
              </p>
              {leedModal && <AddPackage setLeadmodal={setLeadmodal} />}
            </div>

            {/* Leed modal */}
            {leedModal && <AddPackage setLeadmodal={setLeadmodal} />}
          </div>
          {/* Applicant Table */}
          <div className="w-full mt-5 bg-white rounded border-2 border-[#e7e7e7]">
            <div className="flex items-center justify-between p-3">
              <div className="w-fit">
                <Search />
              </div>
              {applicantView ? null : (
                <TablePagination
                  rowsPerPageOptions={[20, 25, 100]}
                  component="div"
                  count={2}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              )}
            </div>
            <Listview rowsPerPage={rowsPerPage} page={page} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Packages;
