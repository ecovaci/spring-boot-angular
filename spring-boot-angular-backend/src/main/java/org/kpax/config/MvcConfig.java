package org.kpax.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Profile("prod")
@Configuration
public class MvcConfig implements WebMvcConfigurer {
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		//registry.addViewController("/").setViewName("/en/index.html");
		registry.addViewController("/ng-app-en/**").setViewName("/en/index.html");
		registry.addViewController("/ng-app-ro/**").setViewName("/ro/index.html");
	}

	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
		argumentResolvers.add(new FilterRequestArgumentResolver());
	}

}