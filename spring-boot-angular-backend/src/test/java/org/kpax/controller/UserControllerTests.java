package org.kpax.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.kpax.config.NoSecurityConfigurer;
import org.kpax.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @author Eugen Covaci {@literal eugen.covaci.q@gmail.com}
 * Created on 3/5/2020
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class UserControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void addUser_UserPersisted() throws Exception {
        User user = new User();
        user.setName("Bla");
        user.setEmail("Bla@bla.bla");
        mockMvc.perform(post("/api/users/add").requestAttr("user", user)).andExpect(status().isOk());
    }

}
