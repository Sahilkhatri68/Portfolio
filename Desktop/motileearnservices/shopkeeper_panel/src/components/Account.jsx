import React from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";

function Account() {
  const fetchclassid = useParams();
  return (
    <div>
      <Header
        Children={
          <div className=" p-2">
            <div className="w-full h-screen  ">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col">
                  <div className="mb-4">
                    <h1 className="text-3xl font-bolder leading-tight text-gray-900">
                      Admin
                    </h1>
                    <hr className="mt-2" />
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        }
      ></Header>
    </div>
  );
}

export default Account;
