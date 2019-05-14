package org.kpax.config;

import org.kpax.security.AjaxAuthenticationFailureHandler;
import org.kpax.security.AjaxAuthenticationSuccessHandler;
import org.kpax.security.AjaxLogoutSuccessHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Value("${security.enable-csrf:true}")
	private boolean csrfEnabled;

	@Override
	public void configure(WebSecurity web) throws Exception {
		//@formatter:off
		web.ignoring()
				.antMatchers(HttpMethod.OPTIONS, "/**")
				.antMatchers("/**/*.{js,html,css}", "/**/*.ico")
				.antMatchers("/en/ng-app/**")
				.antMatchers("/ro/ng-app/**")
				.antMatchers("/ng-app/**");
		//@formatter:on
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		//@formatter:off
		if (csrfEnabled) {
			http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
		} else {
			http.csrf().disable();
		}

		http
			.exceptionHandling()
            .authenticationEntryPoint(new Http403ForbiddenEntryPoint())
			.and()
				.formLogin().loginProcessingUrl("/api/authentication")
					.successHandler(ajaxAuthenticationSuccessHandler())
					.failureHandler(ajaxAuthenticationFailureHandler()).permitAll()
			.and()
				.logout()
					.logoutUrl("/api/logout")
					.logoutSuccessHandler(ajaxLogoutSuccessHandler())
					.permitAll()
			.and()
				.authorizeRequests()
				.antMatchers("/account/login").permitAll()
				.antMatchers("/api/**").authenticated();
		//@formatter:on
	}

	@Bean
	public AjaxAuthenticationSuccessHandler ajaxAuthenticationSuccessHandler() {
		return new AjaxAuthenticationSuccessHandler();
	}

	@Bean
	public AjaxAuthenticationFailureHandler ajaxAuthenticationFailureHandler() {
		return new AjaxAuthenticationFailureHandler();
	}

	@Bean
	public AjaxLogoutSuccessHandler ajaxLogoutSuccessHandler() {
		return new AjaxLogoutSuccessHandler();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication()
				.withUser("john").password(passwordEncoder().encode("123")).roles("USER")
				.and()
				.withUser("boo").password(passwordEncoder().encode("123")).roles("ADMIN");
	}

	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
