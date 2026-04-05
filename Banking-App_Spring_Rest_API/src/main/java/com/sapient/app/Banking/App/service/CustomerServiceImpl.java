package com.sapient.app.Banking.App.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator; 
import java.util.Optional; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service; 
import com.sapient.app.Banking.App.model.Customer;

import com.sapient.app.Banking.App.repository.CustomerRepository;



@Service
public class CustomerServiceImpl implements CustomerService,UserDetailsService {
	
	@Autowired
	CustomerRepository customerRepository;
	
	@Autowired 
	PasswordEncoder passwordEncoder;
	
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Customer customer = customerRepository.findByEmail(email);

        if (customer == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        return org.springframework.security.core.userdetails.User
                .withUsername(customer.getEmail())
                .password(customer.getPassword())
                .roles("USER") // Add roles if needed
                .build();
    }

	@Override
	public Customer createCustomer(Customer customer) {
		//System.out.println(customer.getCustomer_email());
		customer.setPassword(passwordEncoder.encode(customer.getPassword()));
		customerRepository.save(customer);	
		return customer;
	} 
	
	
	public Customer findByCustomerEmail(String email)
	{
        Customer cust = customerRepository.findByEmail(email); 
        return cust;
        	
		
	}
	
	public Customer depositMoney(String email,double amount)
	{
		Customer cust=customerRepository.findByEmail(email);
		cust.setBalance(cust.getBalance()+amount);
		customerRepository.save(cust);
		
		return cust;
	}
	
	public Customer withdrawMoney(String email,double amount)
	{
		Customer cust=customerRepository.findByEmail(email);
		if(cust.getBalance()<amount)
		{
		System.out.println("Your available balance is less than the amount you are withdrawing");
		return null;
		}
	    cust.setBalance(cust.getBalance()-amount);
	    customerRepository.save(cust);
	    return cust;
	}
	
	public HashMap<String,Double> getCustomerBalanceByEmail(String email)
	{
		Customer cust=customerRepository.findByEmail(email);
		HashMap<String,Double> mp=new HashMap<>();
		mp.put("Available Balance",cust.getBalance());
		return mp;
	}
}
