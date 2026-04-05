package com.sapient.app.Banking.App.controller;



import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.security.authentication.AuthenticationManager; 
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; 
import org.springframework.security.core.Authentication; 
import org.springframework.security.core.userdetails.UsernameNotFoundException;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sapient.app.Banking.App.model.Customer;
import com.sapient.app.Banking.App.service.CustomerService;

import jakarta.validation.Valid;


import com.sapient.app.Banking.App.model.AuthRequest;
import com.sapient.app.Banking.App.service.JwtService; 
import com.sapient.app.Banking.App.model.Activity;
import com.sapient.app.Banking.App.service.ActivityService;


@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000")
public class MyController {
	
	@Autowired
	ActivityService activityService;
	
	@Autowired
	CustomerService customerService;
	
    @Autowired
    private JwtService jwtService; 
  
    @Autowired
    private AuthenticationManager authenticationManager;
    
   
	
	
//	@GetMapping("/{accountNumber}")
//	public ResponseEntity<Customer> getCustomerByAccountNumber(@PathVariable ("accountNumber") String accountNumber) {
//		try {
//			Activity newActivity = new Activity("dsdsds","dsdsdsdsd","dsdsds","dsdssdsdds","ythhfhff",accountNumber);
//			System.out.println(localCustomer.getCustomerName());
//			return new ResponseEntity<>(localCustomer, HttpStatus.CREATED);
//		}
//		catch(Exception e) {
//			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//		
//	}
	
	
	@PostMapping("/addActivity") // PostMapping is used to save new data on the server
	public ResponseEntity<Activity> addActivity(@Valid @RequestBody Activity activity) {
		try {
//			Activity newActivity = new Activity()
//			Tutorial _tutorial = tutorialRepository.save(new Tutorial(tutorial.getTitle(), tutorial.getDescription(), tutorial.isPublished()));
			return new ResponseEntity<>(activityService.addActivity(activity), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	


	
	@PostMapping("/customer") // PostMapping is used to save new data on the server
	public ResponseEntity<Customer> createCustomer(@RequestBody @Valid Customer customer) {
		try {
			System.out.println(customer.getCustomer_aadhar());
			return new ResponseEntity<>(customerService.createCustomer(customer), HttpStatus.CREATED);
		} catch (Exception e) {
			//System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	
	@GetMapping("/customer/{email}")
	public ResponseEntity<Customer> getCustomerByEmail(@Valid @PathVariable String email)
	{
		try {
			return new ResponseEntity<Customer>(customerService.findByCustomerEmail(email), HttpStatus.CREATED);
		}catch(Exception e)
		{
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/customer/getCustomerBalanceByEmail/{email}")
	public ResponseEntity<HashMap<String,Double>> getCustomerBalanceByEmail(@Valid @PathVariable String email)
	{
		try {
			return new ResponseEntity<HashMap<String,Double>>(customerService.getCustomerBalanceByEmail(email), HttpStatus.OK);
		}catch(Exception e)
		{
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}	
	
	@GetMapping("/customer/{email}/getActivityHistory")
	public ResponseEntity<List<Activity>>getActivityHistory(@Valid @PathVariable String email)
	{
		try {
			Customer cust=customerService.findByCustomerEmail(email);
			return new ResponseEntity<List<Activity>>(activityService.getCustomerActivitiesByAccountNumber(cust.getCustomer_account_number()),HttpStatus.OK);
			
		}catch(Exception e)
		{
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);			
		}
	}
	
	@PutMapping("/deposit-money/{email}")
	public ResponseEntity<Customer> depositMoney(@Valid @PathVariable String email,@Valid @RequestBody HashMap<String,Double>mp)
	{
		try {
			Customer cust=customerService.depositMoney(email,mp.get("amount"));
	        LocalDateTime currentDateTime = LocalDateTime.now();
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
	        String formattedDateTime = currentDateTime.format(formatter);
			Activity a=new Activity("Deposit",String.valueOf(cust.getCustomer_account_number()),formattedDateTime,mp.get("amount"));
			activityService.addActivity(a);
			return new ResponseEntity<Customer>(cust,HttpStatus.OK);
		}catch(Exception e)
		{
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/withdraw-money/{email}")
	public ResponseEntity<Customer> withdrawMoney(@Valid @PathVariable String email,@Valid @RequestBody HashMap<String,Double>mp)
	{
		try {
			Customer cust=customerService.withdrawMoney(email,mp.get("amount"));
	        LocalDateTime currentDateTime = LocalDateTime.now();
            // Define the desired date-time pattern
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            // Format the current date-time as a string
	        String formattedDateTime = currentDateTime.format(formatter);
			Activity a=new Activity("Withdraw",String.valueOf(cust.getCustomer_account_number()),formattedDateTime,mp.get("amount"));
			activityService.addActivity(a);;
			return new ResponseEntity<Customer>(cust,HttpStatus.OK);
		}catch(Exception e)
		{
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
    @PostMapping("/login") 
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) { 
    	
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())); 
        
        if (authentication.isAuthenticated()) { 
            return jwtService.generateToken(authRequest.getUsername()); 
        } else { 
            throw new UsernameNotFoundException("invalid user request !"); 
        } 
    } 
    
    
	
}


