/**
 * 
 */
package org.kpax;

import org.kpax.entity.User;
import org.kpax.repository.UserRepository;
import org.kpax.repository.support.CustomQuerydslPredicateExecutor;
import org.kpax.repository.support.CustomQuerydslPredicateExecutorImpl;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.stream.Stream;


@EnableJpaRepositories(repositoryBaseClass = CustomQuerydslPredicateExecutorImpl.class)
@SpringBootApplication
public class Application extends SpringBootServletInitializer {

	
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);

	}

	@Bean
	CommandLineRunner init(UserRepository userRepository) {
		return args -> {
			Stream.of("John", "Julie", "Jennifer", "Helen", "Rachel", "Peter").forEach(name -> {
				User user = new User(name, name.toLowerCase() + "@domain.com");
				userRepository.save(user);
			});
			userRepository.findAll().forEach(System.out::println);
		};
	}
}
