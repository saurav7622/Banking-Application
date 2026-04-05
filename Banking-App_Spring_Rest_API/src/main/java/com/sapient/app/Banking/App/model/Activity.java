package com.sapient.app.Banking.App.model;

import jakarta.persistence.Entity;



import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;



@Entity
@Table(name="activity")

public class Activity {

	//final double min_balance=10000;
	
    //double fd_roi=9;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long activityid;
	
	@NotBlank (message="Please provide the activity type!")
	private String activitytype;
	
	@NotBlank (message="Please provide the customer account number!")
	private String customeraccountnumber;
	
	@NotBlank (message="Activity date is not entered!")
	private String activitydate;

	@NotNull (message="Please provide the activity amount!")
    @DecimalMax(value = "1000000.0", inclusive = true)
	private double activityamount;
	
	
	
	public Activity() {
		super();
	}
	
	public Activity(String activitytype,String customeraccountnumber,String activitydate,double activityamount)
	{
		super();
		this.activitytype=activitytype;
		this.customeraccountnumber=customeraccountnumber;
//		java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		this.activity_date=sdf.format(activity_date);
		this.activitydate=activitydate;
		this.activityamount=activityamount;
	}

	public long getActivityid() {
		return activityid;
	}



	public String getActivitytype() {
		return activitytype;
	}

	public void setActivitytype(String activitytype) {
		this.activitytype = activitytype;
	}

	public String getCustomeraccountnumber() {
		return customeraccountnumber;
	}

	public void setCustomeraccountnumber(String customeraccountnumber) {
		this.customeraccountnumber = customeraccountnumber;
	}

	public String getActivitydate() {
		return activitydate;
	}

	public void setActivitydate(String activitydate) {
		this.activitydate = activitydate;
	}

	public double getActivityamount() {
		return activityamount;
	}

	public void setActivityamount(double activityamount) {
		this.activityamount = activityamount;
	}



   
	
	
}
