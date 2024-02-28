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
// import { Link } from "react-router-dom";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { alert } from "@material-tailwind/react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddCourse() {
  // ------------------------------------------------------------
  const [shopname, setShopname] = useState("");
  const [shopkeeperName, setShopkeeperName] = useState("");
  const [email, setEmail] = useState("");
  const [shopkeeperphoneno, setShopkeeperphoneno] = useState("");
  const [country, setCountry] = useState(""); //code to handle country change
  const [region, setRegion] = useState(""); //code to handle state change
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [shopaddress, setShopaddress] = useState("");

  // ------------------------------------------------------------
  const [Search, setSearch] = useState(""); //state for course search
  const [dialogopen, setDialogopen] = useState(false); // state for alertdialog
  const [fetchedshopkeepers, setFetchedshopkeepers] = useState(); // code to get all shopkeeper from db

  const handleCountryChange = (val) => {
    setCountry(val);
  };

  const handleRegionChange = (val) => {
    setRegion(val);
  };

  const getdata = () => {
    axios
      .get(`${API}/shopkeepers`)
      .then((res) => {
        setFetchedshopkeepers(res.data);
        // console.log(res.data);
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
    setDialogopen(false); //code to close input dialog box
  };

  // code to add new class
  const handleNewClass = () => {
    axios
      .post(`${API}/shopkeepers`, {
        shopname: shopname,
        shopkeeperName: shopkeeperName,
        email: email,
        shopkeeperphoneno: shopkeeperphoneno,
        shopaddress: shopaddress,
        country: country,
        state: region,
        district: district,
        city: city,
      })
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          getdata();
          resetCourseFormData();
          window.location.href = "/addcourse";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShopDelete = (_id) => {
    axios
      .delete(`${API}/shopkeepers/${_id}`)
      .then((res) => {
        alert("Shop Deleted");
        getdata();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {/* ClassCreateAlert Box */}
      <Header
        Children={
          <div className="p-2">
            <div className="w-full h-screen  ">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col">
                  <div className="mb-4">
                    <h1 className="text-3xl font-bolder leading-tight text-gray-900">
                      Shopkeepers
                    </h1>
                    <hr className="mt-2" />
                  </div>
                  <div className="-mb-2 py-4 flex flex-wrap flex-grow justify-between">
                    <div className="flex items-center py-2">
                      <div>
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-searcg"
                          type="text"
                          placeholder="Search Shops"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <br />
                      </div>
                    </div>
                    <div className="flex items-center py-2">
                      <button
                        className="inline-block px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline"
                        onClick={handleDialogOpen}
                      >
                        Add New Shops
                      </button>
                    </div>
                  </div>
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
                        <tbody className="bg-white">
                          {fetchedshopkeepers &&
                            fetchedshopkeepers
                              .filter((i) => {
                                // Check if Search is empty or if the shopname includes the search term
                                return Search === ""
                                  ? true
                                  : i.shopname
                                      .toLowerCase()
                                      .includes(Search.toLowerCase());
                              })
                              .map((i) => {
                                return (
                                  <tr key={i._id}>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {i.shopname}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="flex items-center">
                                        {i.shopkeeperName}
                                        <div className="ml-4">
                                          <div className="text-sm leading-5 font-medium text-gray-900"></div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {i.email}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {i.shopkeeperphoneno}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {i.uniqueId}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {i.country}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {i.state}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {i.city}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-left border-b border-gray-200 text-sm leading-5 font-medium">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {/* <Link
                                          to={`/viewcoursedetail/${i._id}`}
                                          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline"
                                        >
                                          View
                                        </Link> */}
                                        Soon
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-left border-b border-gray-200 text-sm leading-5 font-medium">
                                      <button
                                        className="inline-block px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:shadow-outline"
                                        onClick={() => handleShopDelete(i._id)}
                                      >
                                        Delete
                                      </button>
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
            {/* dialogBox */}
            <div>
              <Dialog
                open={dialogopen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDialogClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Enter New Shop"}</DialogTitle>
                <DialogContent>
                  <div>
                    <div className="md:flex m-2 items-center">
                      <div className="md:w-[150px] w-full">Shop Name</div>
                      <div className="md:mx-4">
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          name={shopname}
                          onChange={(e) => setShopname(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="md:flex m-2 items-center">
                      <div className="md:w-[150px] w-full">Shopkeeper name</div>
                      <div className="md:mx-4">
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          name={shopkeeperName}
                          onChange={(e) => setShopkeeperName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="md:flex m-2 items-center">
                      <div className="md:w-[150px] w-full">Phone no</div>
                      <div className="md:mx-4">
                        <input
                          type="number"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          name={shopkeeperphoneno}
                          onChange={(e) => setShopkeeperphoneno(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="md:flex m-2 items-center">
                      <div className="md:w-[150px] w-full">Email</div>
                      <div className="md:mx-4">
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          name={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="md:flex m-2 items-center">
                      <div className="md:w-[150px] w-full">Country</div>
                      <div className="md:mx-4">
                        <CountryDropdown
                          style={{ width: "208px" }}
                          value={country}
                          onChange={handleCountryChange}
                        />
                      </div>
                    </div>
                    <div className="md:flex m-2 items-center">
                      <div className="md:w-[150px] w-full">State</div>
                      <div className="md:mx-4">
                        <RegionDropdown
                          style={{ width: "208px" }}
                          country={country}
                          value={region}
                          onChange={handleRegionChange}
                        />
                      </div>
                    </div>
                    <div className="md:flex m-2 items-center">
                      <div className="md:w-[150px] w-full">District</div>
                      <div className="md:mx-4">
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          name={district}
                          onChange={(e) => setDistrict(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="md:flex m-2 items-center">
                      <div className="md:w-[150px] w-full">City</div>
                      <div className="md:mx-4">
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          name={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="md:flex m-2 items-center">
                      <div className="md:w-[150px] w-full">Address</div>
                      <div className="md:mx-4">
                        <input
                          name={shopaddress}
                          onChange={(e) => setShopaddress(e.target.value)}
                          type="text"
                          draggable="true"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
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
                    Save
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

export default AddCourse;
