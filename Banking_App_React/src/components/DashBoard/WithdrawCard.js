import React,{useState,useRef,useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AuthContext from "../../store/auth-context";
import { jwtDecode } from "jwt-decode";

import "./WithdrawCard.css";

const WithdrawCard=function(){
    const [availableBalance,setAvailableBalance]=useState(null);
    const withdrawAmountInputRef=useRef();
    
    useEffect(()=>{
        async function fetchData()
        {const token = Cookies.get("jwt");
    
        if (token) {
          //alert(token);
          let decoded = jwtDecode(token);
          //console.log(decoded);
          //alert(decoded.sub);
            try{
            const res=await axios({
                method:"GET",
                url:`http://localhost:8084/customer/getCustomerBalanceByEmail/${decoded.sub}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            });
            console.log(res.data);
            //setBalance(res.data["Available Balance"]);
            setAvailableBalance(res.data["Available Balance"]);
            }catch(err)
            {
                console.log(err);
            }
        }
        }
        fetchData();
    },[]);


    const formSubmissionHandler=async(event)=>{
           event.preventDefault();
           console.log("bhaaaaaaaaaaaaaat!");
           let withdrawAmount=withdrawAmountInputRef.current.value;
           const regEx=/^-?\d+(\.;\d+)?$/
           if(withdrawAmount.trim()=="")
           {
            alert("Please enter the amount to be withdrawed!");
            return;
           }
           else if(!withdrawAmount.trim().match(regEx))
           {
            alert("Please provide withdraw amount of number type!")
            return;
           }
           const token = Cookies.get("jwt");
    
          if (token) {
            //alert(token);
            let decoded = jwtDecode(token);
            //console.log(decoded);
            //alert(decoded.sub);
           try{
            const res=await axios({
                method:"PUT",
                url:`http://localhost:8084/withdraw-money/${decoded.sub}`,
                data:{
                    amount:withdrawAmount.trim()
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            });
            console.log(res.data);
            //setBalance(res.data["Available Balance"]);
            setAvailableBalance(res.data.balance);
            alert(`Rs. ${withdrawAmount.trim()} withdrawn successfully! from ${res.data.email}`);
            }catch(err)
            {
                console.log(err);
            }
        }

            withdrawAmountInputRef.current.value="";


    }    
    return(
        <div className="withdraw-card" id="withdraw-Card">
  <h2 style={{ marginBottom: 50 }}>Withdraw Money</h2>
  <form onSubmit={formSubmissionHandler}>
    <div className="form-group" style={{ width: "80%", marginLeft: "7%" }}>
      <label
        htmlFor="inputWithdraw"
        style={{ marginBottom: 10, fontSize: "130%" }}
      >
        Enter the amount
      </label>
      <input type="text" className="form-control" id="inputWithdraw" ref={withdrawAmountInputRef}/>
    </div>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button
        type="submit"
        className="btn btn-danger submit-withdraw"
        style={{ marginTop: 20, width: "30%" }}
      >
        Submit
      </button>
    </div>
  </form>
  <p
    style={{ textAlign: "center", marginTop: 30, fontSize: "130%" }}
    id="balance-withdraw"
  >Available Balance  : &#8377; {availableBalance}</p>
</div>

    )
}

export default WithdrawCard;