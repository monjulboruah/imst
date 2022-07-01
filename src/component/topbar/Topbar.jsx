import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Global } from "../../Global";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

export default function Topbar() {
  const state = useContext(Global);

  const [isLogged] = state.userApi.isLogged;
  const [companyDetails] = state.CompaniesApi.companyDetails;
  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.setItem("firstLogin", false);
    window.location.href = "/login";
  };

  return (
    <>
      {isLogged === false ? (
        <div></div>
      ) : (
        <div className="topbar">
          <div className="topbarWrapper">
            <div className="topLeft">
              <span className="logo">Incident Management</span>
            </div>
            <div className="topLeft">
              <span className="logo">{companyDetails.comp_name}</span>
            </div>
            <div className="topRight">
              <div className="topbarIconContainer">
                <NotificationsNone />
                <span className="topIconBadge">2</span>
              </div>

              <div className="topbarIconContainer">
                <img
                  src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                  className="topAvatar"
                />
              </div>
              <div className="topbarIconContainer">
                <Link to="/login">
                  <PowerSettingsNewIcon onClick={logout} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
