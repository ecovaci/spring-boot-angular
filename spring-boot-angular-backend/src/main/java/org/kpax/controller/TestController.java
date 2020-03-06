package org.kpax.controller;

import org.kpax.entity.User;
import org.kpax.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/boo")
@RestController
public class TestController {

	@Autowired
	private UserService userService;

	/*@GetMapping
	public Page<User> hello (Pageable pageable) {
		Page<User> page = testService.getUsers();
		System.out.println(pageable);
		return page;
	}*/

	@GetMapping("/all")
	public List<User> all () {
		return userService.findAll();
	}
}
