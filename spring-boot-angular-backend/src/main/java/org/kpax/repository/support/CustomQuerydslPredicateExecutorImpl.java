package org.kpax.repository.support;

import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.query.Jpa21Utils;
import org.springframework.data.jpa.repository.query.JpaEntityGraph;
import org.springframework.data.jpa.repository.support.CrudMethodMetadata;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.Querydsl;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.querydsl.SimpleEntityPathResolver;
import org.springframework.data.repository.support.PageableExecutionUtils;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class CustomQuerydslPredicateExecutorImpl<T, ID> extends SimpleJpaRepository<T, ID>
		implements CustomQuerydslPredicateExecutor<T, ID> {

	private final JpaEntityInformation<T, ID> entityInformation;
	private final EntityPath<T> path;
	private final Querydsl querydsl;
	private final EntityManager entityManager;

	public CustomQuerydslPredicateExecutorImpl(JpaEntityInformation<T, ID> entityInformation,
			EntityManager entityManager) {
		super(entityInformation, entityManager);
		this.entityInformation = entityInformation;
		this.path = SimpleEntityPathResolver.INSTANCE.createPath(entityInformation.getJavaType());
		this.querydsl = new Querydsl(entityManager, new PathBuilder<T>(path.getType(), path.getMetadata()));
		this.entityManager = entityManager;
	}

	@Override
	public Page<T> getPageableQuery(JPAQuery<T> query, Pageable pageable) {
		applyHints(query, false);
		JPAQuery<T> countQuery = query.clone(entityManager);
		applyHints(countQuery, true);
		Querydsl querydsl = new Querydsl(entityManager,
				new PathBuilder<T>(this.path.getType(), this.path.getMetadata()));
		JPQLQuery<T> paginatedQuery = querydsl.applyPagination(pageable, query);
		return PageableExecutionUtils.getPage(paginatedQuery.fetch(), pageable, countQuery::fetchCount);
	}

	public Map<String, Object> asMap(boolean forCounts) {
		Map<String, Object> hints = new HashMap<>();
		if (getRepositoryMethodMetadata() != null) {

			if (forCounts) {
				hints.putAll(getRepositoryMethodMetadata().getQueryHintsForCount());
			} else {
				hints.putAll(getRepositoryMethodMetadata().getQueryHints());
			}

			hints.putAll(getFetchGraphs());
		}

		System.out.println("++++++++++++++++++++++++++++++++++++++++++++++++++++" + hints);
		return hints;
	}

	private Map<String, Object> getFetchGraphs() {
		return getRepositoryMethodMetadata().getEntityGraph().map(entityGraph -> Jpa21Utils
				.tryGetFetchGraphHints(entityManager, getEntityGraph(entityGraph), entityInformation.getJavaType()))
				.orElseGet(() -> Collections.emptyMap());
	}

	private JpaEntityGraph getEntityGraph(EntityGraph entityGraph) {
		String fallbackName = entityInformation.getEntityName() + "." + getRepositoryMethodMetadata().getMethod()
				.getName();
		return new JpaEntityGraph(entityGraph, fallbackName);
	}

	private void applyHints(JPAQuery<T> query, boolean forCounts) {
		for (Map.Entry<String, Object> hint : asMap(forCounts).entrySet()) {
			query.setHint(hint.getKey(), hint.getValue());
		}

	}
}
