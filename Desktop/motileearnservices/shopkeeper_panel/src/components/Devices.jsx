import React from "react";
import Header from "./Header";

function Devices() {
  return (
    <div>
      <Header
        Children={
          <div className=" p-2">
            <div className="w-full h-screen  ">
              <h1 className="text-3xl font-bolder leading-tight text-gray-900">
                Devices
              </h1>
              <hr className="mt-2 mb-2" />
              <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                  <table className="min-w-full">
                    {/* HEAD start */}
                    <thead>
                      <tr className="bg-[#d8d8d8] border-b border-gray-200 text-xs leading-4 text-gray-700 uppercase font-bold tracking-wider">
                        <th className="px-6 py-3 text-left font-semibold">
                          Shop Name
                        </th>
                        <th className="px-6 py-3 text-left font-semibold">
                          Shopkeeper Name
                        </th>
                        <th className="px-6 py-3 text-left font-semibold">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left font-semibold">
                          Phone No
                        </th>
                        <th className="px-6 py-3 text-left font-semibold">
                          Id
                        </th>
                        <th className="px-6 py-3 text-left font-semibold">
                          Country
                        </th>
                        <th className="px-6 py-3 text-left font-semibold">
                          State
                        </th>
                        <th className="px-6 py-3 text-left font-semibold">
                          City
                        </th>
                        <th className="px-6 py-3 text-left font-semibold">
                          Report
                        </th>
                        <th className="px-6 py-3 text-left font-semibold">
                          Delete
                        </th>
                      </tr>
                    </thead>

                    {/* BODY end */}
                  </table>
                </div>
              </div>
            </div>
          </div>
        }
      ></Header>
    </div>
  );
}

export default Devices;
