package org.kpax.repository.support;

import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.Querydsl;
import org.springframework.data.repository.support.PageableExecutionUtils;

import javax.persistence.EntityManager;

public class JpaUtils {
	public static <T> Page<T> applyPagination(EntityManager entityManager, EntityPath<T> path, JPQLQuery<T> query,
			Pageable pageable) {
		Querydsl querydsl = new Querydsl(entityManager, new PathBuilder<T>(path.getType(), path.getMetadata()));
		JPQLQuery<T> paginatedQuery = querydsl.applyPagination(pageable, query);
		return PageableExecutionUtils.getPage(paginatedQuery.fetch(), pageable, query::fetchCount);
	}
}
