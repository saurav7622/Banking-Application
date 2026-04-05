import axios from "axios";
import "./Login.css";
import {useRef} from "react";
import {Link,Outlet,useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import {  useContext, useState, Fragment } from "react";
import AuthContext from "./../../store/auth-context";

const Login=function()
{
  const navigate = useNavigate();
   const [cookies, setCookie] = useCookies(["jwt"]);
   const authCtx = useContext(AuthContext);
   const emailInputRef=useRef();
   const passwordInputRef=useRef();
   const formSubmissionHandler=async function(e)
   {
    e.preventDefault();
    const email=emailInputRef.current.value.trim();
    const password=passwordInputRef.current.value.trim();
    const regexp1 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email==""||password=="")
    {
        alert("One of the field(s) i.e., name, email or password is missing!");
        return;
    }
    else if(!regexp1.test(email.toLowerCase()))
    {
        alert("Please enter valid email id!");
        return;
    }
    try{
      const res = await axios.post("http://localhost:8084/login", {
        username: email,
        password: password,
      });
      console.log(res);
      if(res.status===200)
      {
        let expires = new Date();
        expires.setTime(expires.getTime() +  24 * 60 * 60 * 1000);
        const cookieOptions = {
          path: "/",
          expires,
        };
        setCookie("jwt", res.data, cookieOptions);
        const token = Cookies.get("jwt");
        authCtx.login(token);
        navigate("/dashboard/home");
        window.location.reload(true);
      alert("Logged In Successfully!");
      console.log(res.data);
      }
    }catch(err)
    {
      console.log(err);
    }
    emailInputRef.current.value="";
    passwordInputRef.current.value="";
   }
    return(
<div className="gradient-custom-3">
  <div
    className="bank-title"
    style={{
      fontWeight: 500,
      fontSize: 30,
      display: "flex",
      justifyContent: "center"
    }}
  >
    <p>Welcome To Indian Banking System!</p>
  </div>
  <div className="mask d-flex align-items-center h-100">
    <div className="container login-container" >
      <div className="row d-flex justify-content-center align-items-center h-60">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{ borderRadius: 15 }}>
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Sign In</h2>
              <form onSubmit={formSubmissionHandler}>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3cg"
                    className="form-control form-control-lg login-email"
                    ref={emailInputRef}
                  />
                  <label className="form-label" htmlFor="form3Example3cg">
                    Your Email
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form3Example4cg"
                    className="form-control form-control-lg login-password"
                    ref={passwordInputRef}
                  />
                  <label className="form-label" htmlFor="form3Example4cg">
                    Password
                  </label>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body login-btn"
                  >
                    Log In
                  </button>
                </div>
                <p className="text-center text-muted mt-5 mb-0">
                  Don't have an account?{" "}
                  <Link to="/signup" className="fw-bold text-body">
                    <u>Sign Up Here</u>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Outlet/>
</div>

    )
}

export default Login;