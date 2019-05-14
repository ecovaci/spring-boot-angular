package org.kpax.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Profile("dev")
@Configuration
public class MvcConfigDev implements WebMvcConfigurer {

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/ng-app/**").setViewName("/index.html");
		registry.addViewController("/login").setViewName("/index.html");
	}

}