package com.sapient.app.Banking.App.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sapient.app.Banking.App.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
  public Customer findByEmail(String email);
  /*@Query("SELECT c FROM Customer c WHERE c.email = :email")
	Customer findByEmail(@Param("email") String email);*/
}
