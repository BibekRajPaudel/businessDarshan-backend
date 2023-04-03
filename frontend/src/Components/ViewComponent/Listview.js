import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Tooltip } from "@mui/material";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditNews from "./editNews";

const Listview = ({ rowsPerPage, page }) => {
  const [data, setData] = useState();
  const [status, setStatus] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [singlePackage, setSinglePackage] = useState(null);

  const [edit, setEdit] = useState(false);
  const [editDetail, setEditDetail] = useState(false);
  const [country, setCountry] = useState([]);
  const [countryDetail, setCountryDetail] = useState();
  


  const toogleStatus = (index) => {
    if (index === status) {
      setStatus(false);
      return;
    }
    setStatus(index);
  };

  const fetchPost = async () => {
    try {
      let res = await axios.get("http://localhost:4000/api/v1/posts/getAll");
      setData(res.data.post);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const getId = async (id) => {

    const updatedPackage = data.filter((item, i) => {
      return item._id === id;
    });
    setSinglePackage(updatedPackage);
  };

  console.log(singlePackage, "singlePackage")

  const handleDelete = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_URL}/deletenews/${id}`)
      .then((res) => {
        setEditDetail(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setEdit(true);
    window.location.reload();
  };


  const toggleModal = (id) => {
    console.log(id, "id")
    axios
      .put(`${process.env.REACT_APP_URL}/updatenews/${id}`)
      .then((res) => {
        setCountryDetail(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setToggleEdit(true);
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F4F4F4" }}>
              <TableCell
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  color: "#616161",
                }}
              >
                नम्बर
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  color: "#616161",
                }}
              >
                शीर्षक
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  color: "#616161",
                }}
              >
                लेखक
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  color: "#616161",
                }}
              >
                ट्याग
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  color: "#616161",
                }}
              >
                श्रेणी
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  color: "#616161",
                }}
              >
                कार्य
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  position: "relative",
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    color: "#616161",
                  }}
                >
                  <div className="flex items-center gap-5">{index + 1}</div>
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    color: "#616161",
                  }}
                >
                  <div className="flex items-center gap-5 hover:text-primary-blue cursor-pointer">
                    <img
                      className="w-[40px] h-[40px] object-cover rounded-full"
                      src={item.image}
                      alt=""
                    />{" "}
                    {item.title}
                  </div>
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    color: "#616161",
                  }}
                >
                  <p className=""> {item.author}</p>
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    color: "#616161",
                  }}
                >
                  {item.tag}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    color: "#616161",
                  }}
                >
                  {item.category}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    color: "#616161",
                    position: "relative",
                  }}
                >
                  <p className="flex gap-5">
        
                    <span className="w-fit text-lg cursor-pointer hover:text-red-500">
                      <AiOutlineDelete onClick={() => handleDelete(item._id)} />
                    </span>

                    <Tooltip placement="left">
                      <p
                        onClick={() => [getId(item._id),toggleModal(item._id)]}
                        // className="text-white border-[1px] absolute text-sm p-2 rounded-full shadow right-12 bg-green-500 cursor-pointer"
                      >
                        <FiEdit2 />
                      </p>
                    </Tooltip>

                    {toggleEdit && (
                      <div className="bg-[rgba(0,0,0,0.5)] w-full h-[100vh] fixed z-50 top-0 left-0 flex justify-center items-center">
                        {/* Form container */}
                        <div className="w-[800px] opacity-100 bg-white p-10 rounded-md">
                          {/* Form heading */}
                          <div className="w-full flex items-center justify-between sticky">
                            <h1 className="text-base font-poppins font-bold text-gray-600 tracking-wide">
                              Add News
                            </h1>
                            <p
                              onClick={() => setToggleEdit(false)}
                              className="text-white cursor-pointer hover:text-white hover:bg-red-500 transition ease-in-out duration-200 font-poppins tracking-wide bg-red-300 w-24 text-center text-sm p-1 rounded-md"
                            >
                              Close
                            </p>
                          
                            

                          </div>
                          <div
                            id="sidebarDropdown"
                            className="w-full max-h-[70vh] mt-5 overflow-y-auto"
                            
                            >
                            {singlePackage.map((item) => (
                            <EditNews  item={item}/>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                         )}
                       </p>
                       
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Listview;
