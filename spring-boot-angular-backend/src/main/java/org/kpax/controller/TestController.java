package org.kpax.controller;

import org.kpax.entity.User;
import org.kpax.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/boo")
@RestController
public class TestController {

	@Autowired
	private TestService testService;

	@GetMapping
	public List<User> hello () {
		Page<User> page = testService.getUsers();
		System.out.println(page);
		return page.getContent();
	}

	@GetMapping("/all")
	public List<User> all () {
		return testService.findAll();
	}
}
