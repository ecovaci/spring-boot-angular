package org.kpax.controller;

import org.kpax.entity.User;
import org.kpax.repository.UserRepository;
import org.kpax.repository.support.model.Filter;
import org.kpax.service.UserService;
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
	private UserService userService;

	@GetMapping("/users/list")
	public Page<User> getUsers(Pageable pageable, @Filterable Filter[] filters) {
		return userService.getUsers(pageable, filters);
	}

	@PostMapping("/users/add")
	public void addUser(@RequestBody User user) {
		userRepository.save(user);
	}
}