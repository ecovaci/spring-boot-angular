package org.kpax.service;

import com.querydsl.jpa.impl.JPAQuery;
import org.kpax.entity.QUser;
import org.kpax.entity.User;
import org.kpax.filfter.model.Filter;
import org.kpax.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Service
public class UserService {

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private TestRepository testRepository;

	public Page<User> getUsers(Pageable pageable, Filter[] filters) {
		JPAQuery<User> query = new JPAQuery<User>(entityManager).from(QUser.user);
		return testRepository.executeQuery(query, pageable, filters);
	}

	public List<User> findAll () {
		return testRepository.findAll();
	}
}
