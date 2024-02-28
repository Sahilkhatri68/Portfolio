import React, { useEffect } from "react";
import Header from "./Header";
import { PiTeacherBold } from "react-icons/pi";
import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { API } from "./API/API";
import { ToastContainer, toast } from "react-toastify";
function AddTeacher() {
  const [fetchedclasses, setFetchedclasses] = useState([]); // state for fetching all classes

  const [teachername, setTeachername] = useState("");
  const [teacherage, setTeacherage] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");
  const [teacheremial, setTeacheremial] = useState("");
  const [teacherpassword, setTeacherpassword] = useState("");
  const [teacheraddress, setTeacheraddress] = useState("");
  const [teacherqualification, setTeacherqualification] = useState("");
  const [assignedclass, setAssignedclass] = useState("");

  // code for fetching all classes
  const handleGetClasses = () => {
    axios
      .get(`${API}/getclass`)
      .then((res) => {
        // console.log(res.data);
        setFetchedclasses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetClasses();
  }, []);

  // code to post data of Teacher
  const handleTeacherPostDetails = () => {
    axios
      .post(`${API}/registerteacher`, {
        teachername: teachername,
        teacherage: teacherage,
        teacherPhone: teacherPhone,
        teacheremial: teacheremial,
        teacherpassword: teacherpassword,
        teacheraddress: teacheraddress,
        teacherqualification: teacherqualification,
        assignedclass: assignedclass,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          toast("Teacher Registered", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        setTimeout(() => {
          window.location.reload(true);
        }, [2000]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header
        Children={
          <>
            <div className="shadow-lg p-2">
              <div className="font-bold md:text-[25px] text-[15px]">
                Add Teacher
                <hr />
              </div>
              {/* std details box */}
              <div className="mt-4">
                <form className="w-full">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-last-name"
                      >
                        Teacher Name
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="name"
                        type="text"
                        placeholder="Doe"
                        name={teachername}
                        onChange={(e) => setTeachername(e.target.value)}
                      />
                      {/* <p className="text-red-500 text-xs italic">
                          Please fill out this field.
                        </p> */}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-last-name"
                      >
                        Teacher Age
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id=" "
                        type="number"
                        placeholder="21"
                        name={teacherage}
                        onChange={(e) => setTeacherage(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-last-name"
                      >
                        Email
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name"
                        type="text"
                        placeholder="Doe"
                        name={teacheremial}
                        onChange={(e) => setTeacheremial(e.target.value)}
                      />
                      {/* <p className="text-red-500 text-xs italic">
                          Please fill out this field.
                        </p> */}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-last-name"
                      >
                        Password
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="password"
                        type="password"
                        placeholder="******************"
                        name={teacherpassword}
                        onChange={(e) => setTeacherpassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Class
                      </label>
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                        value={assignedclass}
                        onChange={(e) => setAssignedclass(e.target.value)}
                      >
                        <option>----Select Class----</option>
                        {fetchedclasses.map((i) => {
                          return (
                            <option key={i._id} value={i._id}>
                              {i.className}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-city"
                      >
                        Teacher Address
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-city"
                        type="text"
                        placeholder="Albuquerque"
                        name={teacheraddress}
                        onChange={(e) => setTeacheraddress(e.target.value)}
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-city"
                      >
                        Qualification
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="study"
                        type="text"
                        placeholder="Degree / Diploma "
                        name={teacherqualification}
                        onChange={(e) =>
                          setTeacherqualification(e.target.value)
                        }
                      />
                    </div>

                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-zip"
                      >
                        Phone No.
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="call"
                        type="text"
                        placeholder="XXX1232XXX"
                        name={teacherPhone}
                        onChange={(e) => setTeacherPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </form>
                <div className="md:flex items-center justify-center  mt-8  ">
                  <Button
                    onClick={handleTeacherPostDetails}
                    className="w-full"
                    variant="contained"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </>
        }
      ></Header>
    </div>
  );
}

export default AddTeacher;
