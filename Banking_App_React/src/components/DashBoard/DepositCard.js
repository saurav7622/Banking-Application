import React,{useState,useRef,useEffect} from "react";
import "./DepositCard.css";
import axios from "axios";
import Cookies from "js-cookie";
import AuthContext from "../../store/auth-context";
import { jwtDecode } from "jwt-decode";

const DepositCard=function(props)
{
    const [availableBalance,setAvailableBalance]=useState(null);
    const depositAmountInputRef=useRef();
   


    
    useEffect(()=>{
        async function fetchData()
        { console.log("aleeeeeeert");
          console.log(props.user);
          const token = Cookies.get("jwt");
    
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
    },[availableBalance]);


    const formSubmissionHandler=async(event)=>{
           event.preventDefault();
           let depositAmount=depositAmountInputRef.current.value;
           const regEx=/^-?\d+(\.;\d+)?$/
           if(depositAmount.trim()=="")
           {
            alert("Please enter the amount to be deposited!");
            return;
           }
           else if(!depositAmount.trim().match(regEx))
           {
            alert("Please provide deposit amount of number type!")
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
                url:`http://localhost:8084/deposit-money/${decoded.sub}`,
                data:{
                    amount:depositAmount.trim()
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            });
            console.log(res.data);
            
            //setBalance(res.data["Available Balance"]);
            setAvailableBalance(res.data.balance);
            alert(`Rs. ${depositAmount.trim()} deposited successfully! to ${res.data.email}`);
            }catch(err)
            {
                console.log(err);
            }
        }

            depositAmountInputRef.current.value="";


    }
    
    return(
        <div className="deposit-card" id="deposit-Card">
        <h2 style={{ marginBottom: 50 }}>Deposit Money</h2>
        <form onSubmit={formSubmissionHandler}>
          <div className="form-group" style={{ width: "80%", marginLeft: "7%" }}>
            <label
              htmlFor="inputDeposit"
              style={{ marginBottom: 10, fontSize: "130%" }}
            >
              Enter the amount
            </label>
            <input type="text" className="form-control" id="inputDeposit" ref={depositAmountInputRef} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              className="btn btn-success submit-deposit"
              style={{ marginTop: 20, width: "30%" }}
            >
              Submit
            </button>
          </div>
        </form>
        <p
          style={{ textAlign: "center", marginTop: 30, fontSize: "130%" }}
          id="balance-deposit"
        >Available Balance  : &#8377;{availableBalance}</p>
      </div>
      
    )
}

export default DepositCard;