package com.sapient.app.Banking.App.service;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.sapient.app.Banking.App.model.Activity; 

@Service
//@Repository
public interface ActivityService {
    public Activity addActivity(Activity activity);
    public List<Activity> getCustomerActivitiesByAccountNumber(long customerAccountNumber);
}
