package org.kpax.service;

import com.querydsl.jpa.impl.JPAQuery;
import org.kpax.entity.QUser;
import org.kpax.entity.User;
import org.kpax.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.querydsl.QSort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Service
public class TestService {

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	TestRepository testRepository;

	public Page<User> getUsers() {
		JPAQuery<User> query = new JPAQuery<User>(entityManager);
		query = query.from(QUser.user);
		PageRequest pageRequest = PageRequest.of(0, 3, QSort.by(QUser.user.name.desc()));

		return testRepository.getPageableQuery(query, pageRequest);

		/*
		return JpaUtils.applyPagination(entityManager, QUser.user, query,
				pageRequest);*/
	}

	public List<User> findAll () {
		return testRepository.findAll();
	}
}
