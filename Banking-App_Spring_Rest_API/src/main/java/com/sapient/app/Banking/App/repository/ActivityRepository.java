package com.sapient.app.Banking.App.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sapient.app.Banking.App.model.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
	//public List<Activity> findByCustomer_account_number(String customer_account_number);
	  /*@Query("SELECT c FROM Activity c WHERE c. = :email")
		Customer findByEmail(@Param("email") String email);*/
	List<Activity> findAllByCustomeraccountnumber(String customeraccountnumber);
	 /*@Query("SELECT a FROM Activity a WHERE a.customer_account_number = :customer_account_number")
	    List<Activity> findByCustomerAccountNumber(@Param("customer_account_number") String customer_account_number);*/
}
