package com.cognizant.service;

import com.cognizant.model.AuthenticationResponse;
import com.cognizant.model.RulesInput;

public interface RulesService {
	
	public boolean evaluate(RulesInput account);
	
	public AuthenticationResponse hasPermission(String auth);
	
	
	
}
