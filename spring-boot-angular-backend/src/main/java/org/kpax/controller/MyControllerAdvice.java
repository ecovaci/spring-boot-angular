package org.kpax.controller;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RequestMapping;

@ControllerAdvice
public class MyControllerAdvice {
	@RequestMapping("/error")
	public String error () {
		return "Under construction";
	}
}
