import React,{useState,useEffect} from "react";
import SideBar from "./SideBar";
import DepositCard from "./DepositCard";
import WithdrawCard from "./WithdrawCard";
import ActivityTable from "./ActivityTable";

import "./Services.css";

const Services=function(props)
{
    const [showDepositCard,setShowDepositCard]=useState(true);
    const [showWithdrawCard,setShowWithdrawCard]=useState(false);
    const [showActivityTable,setShowActivityTable]=useState(false);

    const showDepositCardHandler=function()
    {
        setShowDepositCard(true);
        setShowWithdrawCard(false);
        setShowActivityTable(false);
    }

    const showWithdrawCardHandler=function()
    {
        setShowWithdrawCard(true);
        setShowDepositCard(false);
        setShowActivityTable(false);
    }   
    
    const showActivityTableHandler=function()
    {
        setShowActivityTable(true);
        setShowDepositCard(false);
        setShowWithdrawCard(false);
        
    }

    return (
      <React.Fragment>
        <div className="container-fluid">
         <SideBar onShowDepositCard={showDepositCardHandler} onShowWithdrawCard={showWithdrawCardHandler} onShowActivityTable={showActivityTableHandler}/>
         {showDepositCard&&<DepositCard user={props.user}/>}
         {showWithdrawCard&&<WithdrawCard user={props.user}/>}
         {showActivityTable&&<ActivityTable />}
        </div>
      </React.Fragment>
    )
};

export default Services;