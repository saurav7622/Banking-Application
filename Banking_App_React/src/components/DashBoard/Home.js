import React,{ useEffect,useState,useCallback} from "react";
import axios from "axios";
import "./Home.css";
import Cookies from "js-cookie";
import AuthContext from "../../store/auth-context";
import { jwtDecode } from "jwt-decode";

const Home=function(props)
{
    console.log("useeeeeeeeeeeeeeeer");
    console.log(props.user);
    const [user,setUser]=useState(props.user);

    const fetchUserFromServer = useCallback(async () => {
        const token = Cookies.get("jwt");
    
        if (token) {
          //alert(token);
          let decoded = jwtDecode(token);
          //console.log(decoded);
          //alert(decoded.sub);
          try {
            const res = await axios({
              method: "GET",
              url: `http://localhost:8084/customer/${decoded.sub}`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(res);
            if (res.status=="201") {
              console.log("abeyyyyy");
              console.log(res.data);
              setUser(res.data);
            }
          } catch (err) {
            console.log(err);
          }
        }
      }, []);
      useEffect(() => {
    
        fetchUserFromServer();
      }, [fetchUserFromServer]);
     
   

    return(
        <div className="background">
    <div className="my-account-card">
      <header>
        <h2 className="header-item1">My Saving Account</h2>
        <h2 className="header-item2">IBS</h2>
      </header>
      {user&&
      <div className="account-info-card">
        <p>Name: {user.customer_name}</p>
        <p>Account No: {user.customer_account_number}</p>
        <p>Current Balance:  &#8377; {user.balance}</p>
        <p>Mobile No: {user.customer_phone}</p>
      </div>
      }
    </div>
   </div>
    )
}

export default Home;

