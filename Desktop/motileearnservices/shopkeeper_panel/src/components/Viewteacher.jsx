import React, { useEffect } from "react";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import { API } from "./API/API";
import { Link } from "react-router-dom";

function Viewteacher() {
  const [allteachersfetched, setAllteachersfetched] = useState();
  const getallteacher = () => {
    axios
      .get(`${API}/getteacher/assignclass`)
      .then((res) => {
        setAllteachersfetched(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getallteacher();
  }, []);

  return (
    <div>
      <Header
        Children={
          <div>
            <div className="w-full h-screen  ">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col">
                  <div className="mb-4">
                    <h1 className="text-3xl font-bolder leading-tight text-gray-900">
                      Teacher's List
                    </h1>
                    <hr className="mt-2" />
                  </div>
                </div>
                <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                    <table className="min-w-full">
                      {/* HEAD start */}
                      <thead>
                        <tr className="bg-[#d8d8d8] border-b border-gray-200 text-xs leading-4 text-gray-700 uppercase font-bold tracking-wider">
                          <th className="px-6 py-3 text-left font-semibold">
                            Teacher Name
                          </th>
                          <th className="px-6 py-3 text-left font-semibold">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left font-semibold">
                            Assigned class
                          </th>
                          <th className="px-6 py-3 text-left font-semibold">
                            Phone
                          </th>
                          <th className="px-6 py-3 text-left font-semibold">
                            Qualification
                          </th>
                          <th className="px-6 py-3 text-left font-semibold">
                            Address
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {allteachersfetched &&
                          allteachersfetched
                            // .filter((i) => {
                            //   return Search === ""
                            //     ? i
                            //     : i.className.includes(Search);
                            // })
                            // .filter((i) => {
                            //   return searchduration === ""
                            //     ? i
                            //     : i.duration.includes(searchduration);
                            // })
                            .map((i) => {
                              return (
                                <tr key={i._id}>
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="text-sm leading-5 text-gray-900">
                                      {i.teachername}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="flex items-center">
                                      {i.assignedclass[0].className}
                                      <div className="ml-4">
                                        <div className="text-sm leading-5 font-medium text-gray-900"></div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="flex items-center">
                                      {i.teacheremial}
                                      <div className="ml-4">
                                        <div className="text-sm leading-5 font-medium text-gray-900"></div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="text-sm leading-5 text-gray-900">
                                      {i.teacherPhone}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="text-sm leading-5 text-gray-900">
                                      {i.teacherqualification}
                                    </div>
                                  </td>

                                  <td className="px-6 py-4 whitespace-no-wrap text-left border-b border-gray-200 text-sm leading-5 font-medium">
                                    <div className="text-sm leading-5 text-gray-900">
                                      {i.teacheraddress}
                                    </div>
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
        }
      ></Header>
    </div>
  );
}

export default Viewteacher;
