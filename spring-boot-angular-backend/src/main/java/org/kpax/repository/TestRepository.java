package org.kpax.repository;

import com.querydsl.jpa.impl.JPAQuery;
import org.kpax.entity.User;
import org.kpax.repository.support.CustomQuerydslPredicateExecutor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.QueryHint;
import java.util.List;

@Repository
public interface TestRepository extends CustomQuerydslPredicateExecutor<User, Long> {


	/*@QueryHints(value = { @QueryHint(name = "name", value = "value")},
			forCounting = false)
	@Override*/
	//List<User> findAll();

	@QueryHints(value = { @QueryHint(name = "name", value = "value")},
			forCounting = false)
	Page<User> getPageableQuery(JPAQuery<User> query, Pageable pageable);
}
