/**
 *
 */
package org.kpax;

import org.kpax.entity.User;
import org.kpax.repository.UserRepository;
import org.kpax.repository.support.DefaultQuerydslExecutorJpaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationEnvironmentPreparedEvent;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.stream.Stream;


@EnableJpaRepositories(repositoryBaseClass = DefaultQuerydslExecutorJpaRepository.class)
@SpringBootApplication
public class Application extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication springApplication = new SpringApplication(Application.class);
        springApplication
                .addListeners(new ApplicationListener<ApplicationEnvironmentPreparedEvent>() {
                    @Override
                    public void onApplicationEvent(ApplicationEnvironmentPreparedEvent event) {
                        if (event.getEnvironment().getActiveProfiles().length == 0) {
                            throw new IllegalStateException("No active profile found! Please set at least one active profile.");
                        }
                    }
                });
        springApplication.run(args);
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
