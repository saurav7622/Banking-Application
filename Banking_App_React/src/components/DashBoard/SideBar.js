import React,{useState} from "react";
import {Link,Outlet} from "react-router-dom";
import "./SideBar.css";

const SideBar=function(props)
{
    const [highlightDepositBtn,setHighlightDepositBtn]=useState(1);
    const [highlightWithdrawBtn,setHighlightWithdrawBtn]=useState(0);
    const [highlightLoanBtn,setHighlightLoanBtn]=useState(0);
    const [highlightFdBtn,setHighlightFdBtn]=useState(0);
    const [highlightTransactionsBtn,setHighlightTransactionsBtn]=useState(0);
    const highlightDepositHandler=function()
    {
        setHighlightDepositBtn(1);
        setHighlightWithdrawBtn(0);
        setHighlightLoanBtn(0);
        setHighlightFdBtn(0);
        setHighlightTransactionsBtn(0);
        props.onShowDepositCard();
    }
    const highlightWithdrawHandler=function()
    {
        setHighlightDepositBtn(0);
        setHighlightWithdrawBtn(1);
        setHighlightLoanBtn(0);
        setHighlightFdBtn(0);
        setHighlightTransactionsBtn(0);
        props.onShowWithdrawCard();
    }  
    const highlightLoanHandler=function()
    {
        setHighlightDepositBtn(0);
        setHighlightWithdrawBtn(0);
        setHighlightLoanBtn(1);
        setHighlightFdBtn(0);
        setHighlightTransactionsBtn(0);
    } 
    const highlightFdHandler=function()
    {
        setHighlightDepositBtn(0);
        setHighlightWithdrawBtn(0);
        setHighlightLoanBtn(0);
        setHighlightFdBtn(1);
        setHighlightTransactionsBtn(0);
    }  
    const highlightTransactionsHandler=function()
    {
        setHighlightDepositBtn(0);
        setHighlightWithdrawBtn(0);
        setHighlightLoanBtn(0);
        setHighlightFdBtn(0);
        setHighlightTransactionsBtn(1);
        props.onShowActivityTable(1);
    }   

    return(
        <div className="sidebar">
        <div className="sidebar-items">
          <h2>Services</h2>
          <ul>
            <li type="button" className={`deposit-li ${highlightDepositBtn&&"highlight-purple"}`} onClick={highlightDepositHandler}>
              <a >
                <i className="fas fa-money-bill" />
                Deposit Money
              </a>
            </li>
            <li type="button" className={`withdraw-li ${highlightWithdrawBtn&&"highlight-purple"}`} onClick={highlightWithdrawHandler}>
              <a >
                <i className="fas fa-money-bill-wave" />
                Withdraw Money
              </a>
            </li>
            <li type="button" className={`apply-for-loan-li ${highlightLoanBtn&&"highlight-purple"}`} onClick={highlightLoanHandler}>
              <a >
                <i className="fas fa-file-invoice-dollar" />
                Apply for Loan
              </a>
            </li>
            <li type="button" className={`apply-for-fd-li ${highlightFdBtn&&"highlight-purple"}`} onClick={highlightFdHandler}>
              <a>
                <i className="fas fa-piggy-bank" />
                Apply for FD
              </a>
            </li>
            <li type="button" className={`transaction-history-li ${highlightTransactionsBtn&&"highlight-purple"}`} onClick={highlightTransactionsHandler}>
              <a>
                <i className="fas fa-history" />
                Transaction History
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
}

export default SideBar;