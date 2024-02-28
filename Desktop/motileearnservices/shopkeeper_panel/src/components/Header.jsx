import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import "./styles/Header.css";
import sidebaritems from "./SidebarItems/SidebarContent.json";
import { FaClipboardUser } from "react-icons/fa6";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import axios from "axios";
import { API } from "./API/API";

function Header({ Children }) {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false); // for handling sidebar
  const [alertLogout, setAlertLogout] = useState(false); // for handling alert for logout
  const [havetoken, setHavetoken] = useState(false); //for handling shopkeeper login or logout
  const checklogin = () => {
    axios
      .get(`${API}/shopkeeperlogin/check_have_token`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.token === true) {
          setHavetoken(true);
        }
        // if (res.data !== true) return navigate("/login");
      })
      .catch((err) => {
        // navigate("/login");
        console.log(err);
      });
  };

  useEffect(() => {
    checklogin();
  }, []);

  const displaySidebar = () => {
    setSidebar(!sidebar);
  };

  // code for logout admin
  const HandleLogout = () => {
    axios
      .post(`${API}/shopkeeperlogout`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // code to handle logout alert
  const handleAlertOpen = () => {
    setAlertLogout(true);
  };
  const handleAlertClose = () => {
    setAlertLogout(false);
  };

  return (
    <div>
      {/* code for Header---------------------- */}
      <div className="w-full fixed overflow-hidden z-10 top-0 flex justify-between bg-[#0f1131] p-3">
        <div className="md:w-[30%]  text-white  w-full font-bold text-2xl">
          <Link to="/">Mobile support panel </Link> (0.1 Beta)
        </div>

        <div
          className="md:w-[20%]  w-[15%]   flex md:items-center md:content-center 
         justify-end w-full"
        >
          <div className="md:flex hidden mx-2">
            {havetoken === true ? (
              <Button
                variant="contained"
                startIcon={<PowerSettingsNewIcon />}
                onClick={handleAlertOpen}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="contained" startIcon={<VpnKeyIcon />}>
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div className="mx-2">
            <IconButton onClick={() => displaySidebar()}>
              <FiMenu color="white" />
            </IconButton>
          </div>
        </div>
      </div>
      {/* code for Sidebar------------------------- */}
      <div className="top-[62px] MainContentContainer">
        <div
          className={`sidebar fixed z-1 min-h-[100vh] top-[60px] duration-300    overflow-auto	bg-[#0F1131] ${
            sidebar ? "w-[220px]" : "w-[50px]"
          } `}
        >
          <div>
            {sidebaritems.map((item) => {
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isActive ? "red" : "white",
                    };
                  }}
                >
                  <div className="flex m-2 items-center w-[200px] hover:bg-[#bebebe] rounded">
                    <div className="m-2">
                      {item.icon && <i className={item.icon}></i>}
                    </div>
                    <div
                      className={`m-2 duration-500 ${!sidebar && "scale-0"}`}
                    >
                      <p>{item.title}</p>
                    </div>
                  </div>
                </NavLink>
              );
            })}
            {/* code to view profile button */}
            <div className="flex m-2 cursor-pointer items-center w-[200px] hover:bg-[#bebebe] rounded">
              {havetoken === true ? (
                <>
                  <Link to="/profile">
                    <div className="flex ">
                      <div className="m-2">
                        <FaClipboardUser
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "white",
                          }}
                        />
                      </div>
                      <div
                        className={`m-2 duration-500 ${!sidebar && "scale-0"}`}
                      >
                        <p className="text-white">Profile</p>
                      </div>
                    </div>
                  </Link>
                </>
              ) : null}
            </div>
            {/* code to view login or logout button */}
            <div
              onClick={handleAlertOpen}
              className="flex m-2 cursor-pointer items-center w-[200px] hover:bg-[#bebebe] rounded"
            >
              {havetoken === true ? (
                <div className="flex ">
                  <div className="m-2">
                    <PowerSettingsNewIcon
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    />
                  </div>
                  <div className={`m-2 duration-500 ${!sidebar && "scale-0"}`}>
                    <p className="text-white">Logout</p>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <div className="flex ">
                      <div className="m-2">
                        <VpnKeyIcon
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "white",
                          }}
                        />
                      </div>
                      <div
                        className={`m-2 duration-500 ${!sidebar && "scale-0"}`}
                      >
                        <p className="text-white">Login</p>
                      </div>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className={`mainContent p-2`}
          style={{
            margin: "60px 0px 0px 55px",
          }}
        >
          {Children}
        </div>
      </div>
      {/* popper */}
      <Dialog
        open={alertLogout}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to logout ?"}
        </DialogTitle>

        <DialogActions>
          <Button color="error" variant="contained" onClick={handleAlertClose}>
            Disagree
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={HandleLogout}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Header;
