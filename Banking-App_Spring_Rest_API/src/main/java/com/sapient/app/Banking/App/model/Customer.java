package com.sapient.app.Banking.App.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;





@Entity
@Table(name="customer")

public class Customer {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	long customer_account_number;

	
	@NotBlank (message="Please provide the name!")
    String customer_name;
	
	@NotBlank (message="Please provide the email!")
	@Email (message = "Please provide a valid email id")
	String email;
	
	@NotBlank (message="Please provide the password")
	String password;
	
	
	@NotBlank (message="Please provide the gender!")
	String customer_gender;
	
	@NotBlank (message="Please provide the aadhar number")
	String customer_aadhar;
	
	@NotBlank (message="Please provide the phone number!")
	String customer_phone;
	
	
	
	double balance;


	public Customer() {
		super();
	}


	public Customer(long customer_account_number, String customer_name, String customer_email,String password, String customer_gender,
			String customer_aadhar, String customer_phone, double balance) {
		super();
		this.customer_account_number = customer_account_number;
		this.customer_name = customer_name;
		this.email = customer_email;
		this.customer_gender = customer_gender;
		this.customer_aadhar = customer_aadhar;
		this.customer_phone = customer_phone;
		this.balance = balance;
		this.password=password;
	}


	public long getCustomer_account_number() {
		return customer_account_number;
	}


	public void setCustomer_account_number(long customer_account_number) {
		this.customer_account_number = customer_account_number;
	}


	public String getCustomer_name() {
		return customer_name;
	}


	public void setCustomer_name(String customer_name) {
		this.customer_name = customer_name;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String customer_email) {
		this.email = customer_email;
	}
	
	public String getPassword()
	{
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}	


	public String getCustomer_gender() {
		return customer_gender;
	}


	public void setCustomer_gender(String customer_gender) {
		this.customer_gender = customer_gender;
	}


	public String getCustomer_aadhar() {
		return customer_aadhar;
	}


	public void setCustomer_aadhar(String customer_aadhar) {
		this.customer_aadhar = customer_aadhar;
	}


	public String getCustomer_phone() {
		return customer_phone;
	}


	public void setCustomer_phone(String customer_phone) {
		this.customer_phone = customer_phone;
	}


	public double getBalance() {
		return balance;
	}


	public void setBalance(double balance) {
		this.balance = balance;
	}
	

}
