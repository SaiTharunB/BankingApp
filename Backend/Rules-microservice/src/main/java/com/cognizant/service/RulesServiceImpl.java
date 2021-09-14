package com.cognizant.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.cognizant.exception.AccessDeniedException;
import com.cognizant.feign.AccountFeign;
import com.cognizant.feign.AuthorizationFeign;
import com.cognizant.model.Account;

import com.cognizant.model.AuthenticationResponse;
import com.cognizant.model.RulesInput;

@Service
public class RulesServiceImpl implements RulesService {

	@Autowired
	public AuthorizationFeign authorizationFeign;
	
	@Autowired
	public AccountFeign accountFeign;
	
	private double minBalance=800.00;
	
	@Override
	public boolean evaluate(RulesInput account) {
		double check = account.getBalance() - account.getAmount();
		if (check >= minBalance)
			return true;
		else
			return false;
	}

	@Override
	public AuthenticationResponse hasPermission(String auth) {
		AuthenticationResponse validity = authorizationFeign.getValidity("Bearer "+auth);
		if (!authorizationFeign.getRole(validity.getUserId()).equals("ADMIN"))
			throw new AccessDeniedException("Access Not Granted");
		else
			return validity;
	}


	@Scheduled(cron = "0 0/1 * * * *") //one minute
	// @Scheduled(cron="0 0 1 * * ?") monthly
	public void serviceCharges() {
		System.out.println("i m inside service  charge");
		List<Account> list = accountFeign.getAllDetails();
		List<Account> l = new ArrayList<Account>();
		System.out.println(list);
		for(Account a :list) {
			System.out.println(a);
			System.out.println(a.getBalance());
			
			if(a.getBalance()<1000 && a.getBalance()>500) {
				
				a.setBalance(a.getBalance()-100);
				
				l.add(a);
							
				System.out.println("Service charge deducted"+a.getAccountNumber());
			}
			System.out.println(l);
			accountFeign.saveAllDetails(l);
			
		}
		
		
	}

}
