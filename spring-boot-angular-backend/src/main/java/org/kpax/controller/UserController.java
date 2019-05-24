package org.kpax.controller;

import org.kpax.entity.User;
import org.kpax.filfter.model.Filter;
import org.kpax.repository.UserRepository;
import org.kpax.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TestService testService;

	@GetMapping("/users/list")
	public Page<User> getUsers(Pageable pageable, @Filterable Filter[] filters) {
		System.out.println("+++++ ==== Get users === +++++ filters" + Arrays.toString(filters));
		return testService.getUsers(pageable, filters);
	}

	@PostMapping("/users/add")
	void addUser(@RequestBody User user) {
		userRepository.save(user);
	}
}