package com.cognizant.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.timeout;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.cloud.openfeign.FeignAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.cognizant.exception.MinimumBalanceException;
import com.cognizant.feign.AccountFeign;
import com.cognizant.model.RulesInput;
import com.cognizant.model.Account;
import com.cognizant.model.AuthenticationResponse;
import com.cognizant.model.ServiceResponse;
import com.cognizant.service.RulesServiceImpl;

@WebMvcTest(controllers = RulesController.class)
@ImportAutoConfiguration({ FeignAutoConfiguration.class })
class RulesControllerTest {

	@Autowired
	MockMvc mockMvc;

	@MockBean
	RulesServiceImpl rulesService;

	@Mock
	AccountFeign accountFeign;

	@Test
	void evaluateTest() throws Exception {
		when(rulesService.hasPermission("token")).thenReturn(new AuthenticationResponse("ADMIN", "ADMIN", true));
		RulesInput inp = new RulesInput(101, 1200, 100);
		when(rulesService.evaluate(inp)).thenReturn(true);
		mockMvc.perform(MockMvcRequestBuilders.post("/evaluateMinBal").content(asJsonString(inp))
				.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)
				.header("Authorization", "token")).andExpect(status().isOk());

	}

	@Test
	void evaluateTestEqual() throws Exception {
		when(rulesService.hasPermission("token")).thenReturn(new AuthenticationResponse("ADMIN", "ADMIN", true));
		RulesInput inp = new RulesInput(101, 100, 100);
		when(rulesService.evaluate(inp)).thenReturn(true);
		mockMvc.perform(MockMvcRequestBuilders.post("/evaluateMinBal").content(asJsonString(inp))
				.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)
				.header("Authorization", "token")).andExpect(status().isOk());

	}

	@Test
	void evaluateTestNeg() throws Exception {
		when(rulesService.hasPermission("token")).thenReturn(new AuthenticationResponse("ADMIN", "ADMIN", true));
		RulesInput inp = new RulesInput(101, 200, 100);
		when(rulesService.evaluate(inp)).thenReturn(false);
		mockMvc.perform(MockMvcRequestBuilders.post("/evaluateMinBal").content(asJsonString(inp))
				.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)
				.header("Authorization", "token")).andExpect(status().isOk());

	}

	@Test
	void serviceChargesTest() throws Exception {
		when(rulesService.hasPermission("token")).thenReturn(new AuthenticationResponse("ADMIN", "ADMIN", true));
		RulesInput inp = new RulesInput(101, 1200, 100);
		ServiceResponse res = new ServiceResponse("No Detection", 101, (double) 100);
		//when(rulesService.serviceCharges(inp)).thenReturn(res);
		mockMvc.perform(MockMvcRequestBuilders.post("/serviceCharges").content(asJsonString(inp))
				.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)
				.header("Authorization", "token"));

	}

	@Test
	void serviceChargesTestNegative() throws Exception {
		when(rulesService.hasPermission("token")).thenReturn(new AuthenticationResponse("ADMIN", "ADMIN", true));
		when(accountFeign.getAllAccount("token"))
				.thenReturn(new ResponseEntity<List<Account>>(new ArrayList<>(), HttpStatus.OK));
		mockMvc.perform(MockMvcRequestBuilders.post("/serviceCharges").header("Authorization", "token"))
				.andExpect(status().is(500));
		verify(rulesService, timeout(1)).hasPermission("token");

	}

	@Test
	public void minimumBal() throws MinimumBalanceException, Exception {
		RulesController con = new RulesController();
		RulesInput account = new RulesInput(0, 0, 0);
		Throwable exception = assertThrows(MinimumBalanceException.class, () -> con.evaluate(account));
		assertEquals("Enter Valid Details.", exception.getMessage());

	}

	public static String asJsonString(final Object obj) throws JsonProcessingException {
		final ObjectMapper mapper = new ObjectMapper();
		final String jsonContent = mapper.writeValueAsString(obj);
		return jsonContent;

	}

}

