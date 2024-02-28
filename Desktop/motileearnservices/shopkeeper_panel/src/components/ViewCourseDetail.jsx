import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "./API/API";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function ViewCourseDetail() {
  const { _id } = useParams();
  const [fetchedClasswithStd, setFetchedClasswithStd] = useState([]);
  const [fetchedstd, setFetchedstd] = useState();
  const fetchId = _id;

  // usestate for search
  const [name, setName] = useState(""); //for name search
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fathersname, setFathersname] = useState("");
  const [dob, setDob] = useState("");
  const [joindate, setJoindate] = useState("");
  const [rollnumber, setRollnumber] = useState(Number);
  // const [setstdrollNumber, setSetstdrollNumber] = useState(Number);
  //   code to fetch class and std detail from _id
  const getClassWithStdDetails = async () => {
    await axios
      .get(`${API}/getclass/getclassbystudent/${fetchId}`)
      .then((res) => {
        // console.log(res.data);
        setFetchedClasswithStd(res.data);
        setFetchedstd(res.data.classStudents);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getClassWithStdDetails();
  }, []);

  const handleDelete = (_id) => {
    alert("DELETE" + _id);
  };

  return (
    <div>
      <Header
        Children={
          <>
            <div className="w-full h-screen  ">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col">
                  <div className="mb-4">
                    <h1 className="text-3xl font-bolder leading-tight text-gray-900">
                      Courses - ( {fetchedClasswithStd.className} )
                    </h1>
                    <hr className="mt-2" />
                  </div>
                  <div className="  py-4 flex flex-wrap flex-grow justify-around ">
                    <div className="flex items-center py-2">
                      <div>
                        <input
                          className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-searcg"
                          type="text"
                          placeholder="Search Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center py-2">
                      <div>
                        <input
                          className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-searcg"
                          type="number"
                          placeholder="Search Roll No"
                          onChange={(e) => setRollnumber(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center py-2">
                      <div>
                        <input
                          className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-searcg"
                          type="text"
                          placeholder="Search Father Name"
                          onChange={(e) => setFathersname(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center py-2">
                      <div>
                        <input
                          className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-searcg"
                          type="text"
                          placeholder="Search Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center py-2">
                      <div>
                        <input
                          className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-searcg"
                          type="text"
                          placeholder="Search D.O.B"
                          onChange={(e) => setDob(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                      <table className="min-w-full">
                        {/* HEAD start */}
                        <thead>
                          <tr className="bg-[#d8d8d8] border-b border-gray-200 text-xs leading-4 text-gray-700 uppercase font-bold tracking-wider">
                            <th className="px-6 py-3 text-left font-semibold">
                              Student Name
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                              Roll Number
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                              Age
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                              Phone
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                              Father Name
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                              D.O.B
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                              Join Date
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                              Delete
                            </th>
                          </tr>
                        </thead>

                        <tbody className="bg-white">
                          {fetchedstd &&
                            fetchedstd
                              .filter((i) => {
                                return name === "" ? i : i.name.includes(name);
                              })
                              .filter((i) => {
                                return rollnumber === 0 ? i : i;
                              })
                              .filter((i) => {
                                return fathersname === ""
                                  ? i
                                  : i.fathersname.includes(fathersname);
                              })
                              .filter((i) => {
                                return email === ""
                                  ? i
                                  : i.email.includes(email);
                              })
                              .filter((i) => {
                                return dob === "" ? i : i.dob.includes(dob);
                              })
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
                                        {i.rollnumber}
                                        <div className="ml-4">
                                          <div className="text-sm leading-5 font-medium text-gray-900"></div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {i.age}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {i.email}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {i.phone}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {i.fathersname}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {i.dob}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {i.joindate}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <IconButton
                                        color="error"
                                        aria-label="delete"
                                        onClick={() => handleDelete(i._id)}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </td>
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
          </>
        }
      ></Header>
    </div>
  );
}

export default ViewCourseDetail;
