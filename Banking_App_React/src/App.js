import axios from "axios";
import './App.css';
import React, { useState, useContext, useEffect, useCallback } from "react";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/SignUp/Login";
import Home from "./components/DashBoard/Home.js"
import DashBoardMenu from "./components/DashBoard/DashBoardMenu";
import Services from "./components/DashBoard/Services";
import ActivityTable from "./components/DashBoard/ActivityTable.js";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { useLocation,useNavigate,Navigate} from "react-router-dom";
import Cookies from "js-cookie";
import AuthContext from "./store/auth-context";
import { jwtDecode } from "jwt-decode";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const [loggedInState,setLoggedInState]=useState(false);
  const [user, setUser] = useState(null);
  const fetchUserFromServer = useCallback(async () => {
    const token = Cookies.get("jwt");
    if (token) {
      //alert(token);
      setLoggedInState(true);
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
  return (
    <React.Fragment>
 
  <BrowserRouter>
  
    <Routes>
      <Route path="/signup" element={loggedInState?<><DashBoardMenu /><Home/></>:<SignUp />} />
      <Route path="/login" element={loggedInState?<><DashBoardMenu /><Home/></>:<Login />} />
      <Route path="/dashboard" element={loggedInState?<DashBoardMenu />:<Login />}>
        { <Route path="home" element={loggedInState?<Home user={user}/>:<Login/>} />  }
        { <Route path="services" element={loggedInState?<Services user={user}/>:<Login/>} /> }
        {<Route path="transactionsHistory" element={loggedInState?<ActivityTable/>:<Login/>}/>}
      </Route>
    </Routes>
  </BrowserRouter>
  </React.Fragment>
  
  );
}

export default App;
