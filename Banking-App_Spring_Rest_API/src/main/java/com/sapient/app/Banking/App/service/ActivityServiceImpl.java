package com.sapient.app.Banking.App.service;
import java.util.ArrayList; 
import java.util.Iterator;
import java.util.List;
import java.util.Optional; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service; 
import com.sapient.app.Banking.App.model.Activity;
import com.sapient.app.Banking.App.repository.ActivityRepository;

@Service
//@Repository
public class ActivityServiceImpl implements ActivityService {
//    @Autowired
//    EmployeeRepository employeeRepository;
	
	@Autowired
	ActivityRepository activityRepository;

	@Override
	public Activity addActivity(Activity activity) {
		System.out.println("hello");
		activityRepository.save(activity);	
//		activityRepository.findAll();
		System.out.println(activity);
		
		return activity;
	} 
	
	public List<Activity> getCustomerActivitiesByAccountNumber(long customerAccountNumber){
		System.out.println(customerAccountNumber);
		List<Activity>activitiesList=activityRepository.findAllByCustomeraccountnumber(String.valueOf(customerAccountNumber));
		System.out.println(activitiesList);
		return activitiesList;
	}
}
