package org.kpax.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/boo")
@RestController
public class TestController {

	@GetMapping
	public String hello () {
		return "Hello!";
	}
}
