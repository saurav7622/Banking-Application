import axios from "axios";
import React,{useRef} from "react";
import "./SignUp.css";
import {Link,Outlet} from "react-router-dom";

function checkPalindrome(str) {
  return str == str.split('').reverse().join('');
}

const SignUp=function(){
   
   const nameInputRef=useRef();
   const emailInputRef=useRef();
   const passwordInputRef=useRef();
   const confirmPasswordInputRef=useRef();
   const genderInputRef=useRef();
   const aadharInputRef=useRef();
   const contactNoInputRef=useRef();
   const formSubmissionHandler=async(e)=>
   {
    e.preventDefault();
    const name=nameInputRef.current.value.trim();
    const email=emailInputRef.current.value.trim();
    const password=passwordInputRef.current.value.trim();
    const confirmPassword=confirmPasswordInputRef.current.value.trim();
    const gender=genderInputRef.current.value.trim();
    const aadhar=aadharInputRef.current.value.trim();
    const contactNo=contactNoInputRef.current.value.trim();
    const regexp1 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexp2=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    const regexp3=/^[2-9][0-9]{3}[0-9]{4}[0-9]{4}$/;
    const regexp4=/^\\d{10}$/;
    if(name==""||email==""||password==""||confirmPassword==""||gender==""||aadhar==""||contactNo=="")
    {
        alert("One of the field(s) i.e., name, email, password, confirmPassword, gender, aadhar Number or contact Number is missing!");
        return;
    }
    else if(!regexp1.test(email.toLowerCase()))
    {
        alert("Please enter valid email id!");
        return;
    }
    else if(password!=confirmPassword)
    {
       alert("Password does not match with confirm password");
       return;
    }
    else if(!regexp2.test(password)||checkPalindrome(password))
    {
        alert("Please ensure that your password contains atleast 1 special character, 1 digit and 1 alphabet, palindrome string not allowed and the length of the password should be atleast 8 characters long.");
        return;
    }
  

    nameInputRef.current.value="";
    emailInputRef.current.value="";
    passwordInputRef.current.value="";
    confirmPasswordInputRef.current.value="";
    genderInputRef.current.value="";
    aadharInputRef.current.value="";
    contactNoInputRef.current.value="";
    
    try{
      const res = await axios.post("http://localhost:8084/customer", {
        customer_name: name,
        email: email,
        password: password,
        customer_gender: gender,
        customer_aadhar: aadhar,
        customer_phone: contactNo,
        balance: 0
      });
      console.log(res);
      if(res.status=="201")
      {
      alert("Signed Up Successfully!Please login!");
      window.location.href="/login";
      }
    }catch(err)
    {
      console.log(err);
    }


   }

    return(
      <div style={{background: "linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5))",height:"100%",marginBottom:"-100px",backgroundSize:"cover"}}>
      <h1 style={{textAlign:"center"}}>Welcome To Indian Banking System!</h1>
      <div className="parent-container">
        
      <div className="signup-container">
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      <form onSubmit={formSubmissionHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" ref={nameInputRef} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" ref={emailInputRef} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" ref={passwordInputRef} required/>
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" name="confirm-password" ref={confirmPasswordInputRef} required />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" ref={genderInputRef}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="aadhar">Aadhar</label>
          <input type="text" id="aadhar" name="aadhar" ref={aadharInputRef} required />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact No</label>
          <input type="tel" id="contact" name="contact" ref={contactNoInputRef} required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p className="text-center text-muted mt-5 mb-0">
                  Already have an account?{" "}
                  <Link to="/login" className="fw-bold text-body">
                    <u>Log In Here</u>
                  </Link>
                </p>
    </div>
    </div>
    </div>

   
    )
}

export default SignUp;


