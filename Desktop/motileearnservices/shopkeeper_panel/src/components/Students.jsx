import React, { useEffect, useState } from "react";
import Header from "./Header";
import { API } from "./API/API";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Link, useParams } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Students() {
  const [fetchedstudents, setFetchedstudents] = useState();

  const [coursedata, setCoursedata] = useState(); //state for getting data
  const [Search, setSearch] = useState(""); //state for course search
  const [searchduration, setSearchduration] = useState(""); //state for duration search
  const [dialogopen, setDialogopen] = useState(false); // state for alertdialog

  const [className, setClassName] = useState(""); // state for adding new class
  const [duration, setDuration] = useState(""); // state for adding new class
  // const [classCreatedAlert, setClassCreatedAlert] = useState(false);
  const getdata = () => {
    axios
      .get(`${API}/newperson`)
      .then((res) => {
        setFetchedstudents(res.data.student);
        setCoursedata(res.data);
        console.log(res.data.student);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getdata();
  }, []);

  // funtion to open dialogbox
  const handleDialogOpen = () => {
    setDialogopen(true);
  };
  // function to close dialogbox
  const handleDialogClose = () => {
    setDialogopen(false);
  };

  const resetCourseFormData = () => {
    setDialogopen(false);
  };

  // code to add new class
  const handleNewClass = () => {
    console.log("OTP verification");
    // axios
    //   .post(`${API}/addnewclass`, {
    //     className: className,
    //     duration: duration,
    //   })
    //   .then((res) => {
    //     if (res.status === 201) {
    //       resetCourseFormData();
    //       getdata();
    //       alert(res.data.message);

    //       // console.log(res);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const deleteStudentByid = (_id) => {
    console.log(_id);
    // axios
    //   .delete(`${API}/newperson/${_id}`)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  return (
    <div>
      <Header
        Children={
          <div className="p-2">
            <div className="w-full h-screen  ">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col">
                  <div className="mb-4">
                    <h1 className="text-3xl font-bolder leading-tight text-gray-900">
                      Students
                    </h1>
                    <hr className="mt-2" />
                  </div>
                  <div className="-mb-2 py-4 flex flex-wrap flex-grow justify-between">
                    <div className="flex items-center py-2">
                      <div>
                        {/* <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-searcg"
                          type="text"
                          placeholder="Search Course"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <input
                          className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-searcg"
                          type="text"
                          placeholder="Search Duration"
                          onChange={(e) => setSearchduration(e.target.value)}
                        /> */}
                      </div>
                    </div>
                    {/* <div className="flex items-center py-2">
                      <button
                        className="inline-block px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline"
                        onClick={handleDialogOpen}
                      >
                        Add New Course
                      </button>
                    </div> */}
                  </div>
                  <div></div>
                  <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                      <table className="min-w-full">
                        {/* HEAD start */}
                        <thead>
                          <tr className="bg-[#d8d8d8] border-b border-gray-200 text-xs leading-4 text-gray-700 uppercase font-bold tracking-wider">
                            <th className="px-6 py-3 text-left font-semibold">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                              Phone Number
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                              ID
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                              Verified
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                              View
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                              Delete
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {fetchedstudents &&
                            fetchedstudents
                              //   .filter((i) => {
                              //     return Search === ""
                              //       ? i
                              //       : i.className.includes(Search);
                              //   })
                              //   .filter((i) => {
                              //     return searchduration === ""
                              //       ? i
                              //       : i.duration.includes(searchduration);
                              //   })
                              .map((i) => {
                                return (
                                  <tr key={i._id}>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {i.name}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="flex items-center">
                                        {i.email}
                                        <div className="ml-4">
                                          <div className="text-sm leading-5 font-medium text-gray-900"></div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {i.phone_no}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {i.unique_Id}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        No
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <button
                                        onClick={handleDialogOpen}
                                        className="text-sm leading-5 text-gray-900"
                                      >
                                        View
                                      </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-left border-b border-gray-200 text-sm leading-5 font-medium">
                                      <button
                                        type="select"
                                        className="inline-block px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:shadow-outline"
                                        onClick={deleteStudentByid(i._id)}
                                      >
                                        Delete
                                      </button>
                                      <></>
                                    </td>
                                    {/* <td className="px-6 py-4 whitespace-no-wrap text-left border-b border-gray-200 text-sm leading-5 font-medium">
                                      <button
                                        type="select"
                                        className="inline-block px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:shadow-outline"
                                        // onClick={deleteStudentByid(i._id)}
                                      >
                                        Suspend
                                      </button>
                                      <></>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-left border-b border-gray-200 text-sm leading-5 font-medium">
                                      <button
                                        type="select"
                                        className="inline-block px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:shadow-outline"
                                        // onClick={deleteStudentByid(i._id)}
                                      >
                                        Verify
                                      </button>
                                      <button
                                        type="select"
                                        className="inline-block  ml-4 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:shadow-outline"
                                        // onClick={deleteStudentByid(i._id)}
                                      >
                                        Verify
                                      </button>
                                      <></>
                                    </td> */}
                                  </tr>
                                );
                              })}
                        </tbody>
                        {/* BODY end */}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* dialogBox */}
            <div>
              <Dialog
                open={dialogopen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDialogClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"User Data"}</DialogTitle>
                <DialogContent>
                  <div>
                    <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                      <div className="border-b px-4 pb-6">
                        <div className="text-center my-4">
                          <img
                            className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                            src="https://randomuser.me/api/portraits/women/21.jpg"
                            alt=""
                          />
                          <div className="py-2">
                            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                              Cait Genevieve
                            </h3>
                            <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                              <svg
                                className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width={24}
                                height={24}
                              >
                                <path
                                  className=""
                                  d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                                />
                              </svg>
                              New York, NY
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 px-2">
                          <button className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
                            Follow
                          </button>
                          <button className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
                            Message
                          </button>
                        </div>
                      </div>
                      <div className="px-4 py-4">
                        <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
                          <svg
                            className="h-6 w-6 text-gray-600 dark:text-gray-400"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                          >
                            <path
                              className=""
                              d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
                            />
                          </svg>
                          <span>
                            <strong className="text-black dark:text-white">
                              12
                            </strong>{" "}
                            Followers you know
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDialogClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleNewClass}
                  >
                    Verify
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        }
      ></Header>
    </div>
  );
}

export default Students;
