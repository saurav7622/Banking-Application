import React,{ useEffect,useState,useCallback} from "react";
import axios from "axios";
import "./ActivityTable.css";
import Cookies from "js-cookie";
import AuthContext from "../../store/auth-context";
import { jwtDecode } from "jwt-decode";

const SampleData = [
    {
      ActivityId: 1,
      activityAmount: 100,
      activityDate: '2024-01-09',
      activityType: 'Deposit',
      customerAccountNumber: 'ABC123',
    },
    // Add more sample data as needed
  ];

const ActivityTable = () => {
    const [tableData,setTableData]=useState(null);
    useEffect(()=>{
        async function fetchData()
        { 
         
          const token = Cookies.get("jwt");
    
          if (token) {
            //alert(token);
            let decoded = jwtDecode(token);
            //console.log(decoded);
            //alert(decoded.sub);
            try{
            const res=await axios({
                method:"GET",
                url:`http://localhost:8084/customer/${decoded.sub}/getActivityHistory`,
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            });
            console.log(res.data);

            //setBalance(res.data["Available Balance"]);
            setTableData(res.data);
            }catch(err)
            {
                console.log(err);
            }
        }
        }
        fetchData();
    },[tableData]);
    return (
        
          
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th >Id</th>
              <th >Amount</th>
              <th >Date</th>
              <th >Type</th>
              <th>Account Number</th>
            </tr>
          </thead>
          <tbody>
            {tableData&&tableData.map((activity) => (
              <tr key={activity.activityid}>
                <td >{activity.activityid}</td>
                <td >{activity.activityamount}</td>
                <td >{activity.activitydate}</td>
                <td >{activity.activitytype}</td>
                <td >{activity.customeraccountnumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
    
    );
  };

  export default ActivityTable;



