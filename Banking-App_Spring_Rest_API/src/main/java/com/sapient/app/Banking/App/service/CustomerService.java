package com.sapient.app.Banking.App.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.sapient.app.Banking.App.model.Customer;

@Service
public interface CustomerService {
	public Customer createCustomer(Customer customer);

	public Customer findByCustomerEmail(String email);
	
	public Customer depositMoney(String email,double amount);
	
	public Customer withdrawMoney(String email,double amount);
	
	public HashMap<String,Double> getCustomerBalanceByEmail(String email);
}
