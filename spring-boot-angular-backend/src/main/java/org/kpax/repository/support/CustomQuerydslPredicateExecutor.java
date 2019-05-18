package org.kpax.repository.support;

import com.querydsl.core.types.EntityPath;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

import javax.persistence.QueryHint;

@NoRepositoryBean
public interface CustomQuerydslPredicateExecutor<T, ID> extends JpaRepository<T, ID> {

	Page<T> getPageableQuery(JPAQuery<T> query, Pageable pageable);

}
