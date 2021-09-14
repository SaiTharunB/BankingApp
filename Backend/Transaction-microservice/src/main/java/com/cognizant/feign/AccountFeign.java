package com.cognizant.feign;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.cognizant.models.Account;

@FeignClient(name = "account-ms", url = "${feign.url-account-ms}")
public interface AccountFeign {
	
	@GetMapping("/getAccount/{accountNumber}")
	public Account getAccount(@RequestHeader("Authorization") String token , @PathVariable(name="accountNumber") long accountNumber);

	@PostMapping("/updateAccount")
	public boolean updateAccount(Account sourceAccount);	
	@PutMapping("/updateAccount")
	public ResponseEntity<Account> updateAccount(@RequestHeader("Authorization") String auth,
			@RequestBody Account account);

}
