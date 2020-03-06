package org.kpax.service;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.Mockito.when;

/**
 * @author Eugen Covaci {@literal eugen.covaci.q@gmail.com}
 * Created on 3/5/2020
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTests {

    @Mock
    private Pageable pageable;

    @Autowired
    private UserService userService;

    @Before
    public void before () {
        when(pageable.getPageSize()).thenReturn(5);
        when(pageable.getPageNumber()).thenReturn(0);
        when(pageable.getSort()).thenReturn(Sort.unsorted());
    }

    @Test
    public void findAll_size_True () {
        Assert.assertEquals(6, userService.findAll().size());
    }

    @Test
    public void getUsers_size_True () {
        Assert.assertEquals(5, userService.getUsers(pageable, null).getNumberOfElements());
    }
}
