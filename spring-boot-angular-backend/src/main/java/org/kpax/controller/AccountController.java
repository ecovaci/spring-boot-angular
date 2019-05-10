package org.kpax.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

/**
 * @author kamal berriga
 */
@RestController
@RequestMapping("account")
public class AccountController {

	public static final Logger logger = LoggerFactory.getLogger(AccountController.class);

	// this is the login api/service
	@RequestMapping("/login")
	public Principal user(Principal principal) {
		logger.info("user logged " + principal);
		return principal;
	}

}
