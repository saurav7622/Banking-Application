import React,{useContext} from "react";
import AuthContext from "./../../store/auth-context";
import Cookies from "js-cookie";
import {Link,Outlet} from "react-router-dom";


import "./DashBoardMenu.css";

const DashBoardMenu=function()
{
  const authCtx = useContext(AuthContext);
    const logoutHandler=function(e)
    {
         e.preventDefault();
         Cookies.remove("jwt");
         alert("Logged out successfully!");
         window.location.reload();
    }
    return(
        <>
  <nav className="navbar navbar-expand-lg navbar-light bg-light menu fixed-top">
    <div className="container-fluid">
      <a className="navbar-brand" href="#" style={{ fontSize: "180%" }}>
        IBS
      </a>
      <div className="ml-auto menu-items">
        <ul className="navbar-nav">
          <li className="nav-item menu-item">
            <Link
              className="nav-link"
              aria-current="page"
              to="/dashboard/home"
            >
              My Account
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/dashboard/services">
              Services
            </Link>
          </li>
          <li className="nav-item menu-item">
            <Link className="nav-link" to="/contact">
              Contact Us
            </Link>
          </li>
          <li className="nav-item menu-item" onClick={logoutHandler} >
            <Link className="nav-link" to="/login" >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>


  <Outlet/>
</>

    )
}

export default DashBoardMenu;

