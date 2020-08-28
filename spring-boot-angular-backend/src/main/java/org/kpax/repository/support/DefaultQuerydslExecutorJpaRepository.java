package org.kpax.repository.support;

import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import org.kpax.repository.support.model.Filter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.query.Jpa21Utils;
import org.springframework.data.jpa.repository.query.JpaEntityGraph;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.Querydsl;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.querydsl.SimpleEntityPathResolver;
import org.springframework.data.repository.support.PageableExecutionUtils;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class DefaultQuerydslExecutorJpaRepository<T, ID> extends SimpleJpaRepository<T, ID>
        implements QuerydslExecutorJpaRepository<T, ID> {

    private static final Logger logger = LoggerFactory.getLogger(DefaultQuerydslExecutorJpaRepository.class);
    private final PredicateBuilderTypeRegistry predicateBuilderTypeRegistry = new PredicateBuilderTypeRegistry();
    private final JpaEntityInformation<T, ID> entityInformation;
    private final EntityManager entityManager;

    public DefaultQuerydslExecutorJpaRepository(JpaEntityInformation<T, ID> entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
        this.entityInformation = entityInformation;
        this.entityManager = entityManager;
        configure(predicateBuilderTypeRegistry);
    }

    @Override
    public Page<T> executeQuery(JPQLQuery<T> query, Pageable pageable, Filter... filters) {
        logger.debug("Execute query [{}] with: {} and: {}", query, pageable, filters);
        EntityPath<T> path = SimpleEntityPathResolver.INSTANCE.createPath(entityInformation.getJavaType());
        PathBuilder<T> pathBuilder = new PathBuilder<>(path.getType(), path.getMetadata());
        if (filters != null) {
            QuerydslPredicateBuilder<T> querydslPredicateBuilder = new QuerydslPredicateBuilder<>(this.entityManager,
                    pathBuilder, this.entityInformation, predicateBuilderTypeRegistry);
            Predicate filterPredicate = querydslPredicateBuilder.toPredicate(filters);
            query.where(filterPredicate);
        }

        // Apply query hints
        JPAQuery<T> jpaQuery = (JPAQuery<T>) query;
        applyHints(jpaQuery, false);

        // Apply count query hints
        JPAQuery<T> countQuery = jpaQuery.clone(entityManager);
        applyHints(countQuery, true);

        Querydsl querydsl = new Querydsl(entityManager, pathBuilder);
        JPQLQuery<T> paginatedQuery = querydsl.applyPagination(pageable, query);
        logger.debug("Paginated query [{}]", paginatedQuery);
        return PageableExecutionUtils.getPage(paginatedQuery.fetch(), pageable, countQuery::fetchCount);
    }

    public void configure(PredicateBuilderTypeRegistry predicateBuilderTypeRegistry) {
    }

    /**
     * Apply the query hints.
     * @param query the {@link JPAQuery} instance
     * @param forCount whether is for count
     */
    private void applyHints(JPAQuery<T> query, boolean forCount) {
        for (Map.Entry<String, Object> hint : asMap(forCount).entrySet()) {
            query.setHint(hint.getKey(), hint.getValue());
        }

    }

    private Map<String, Object> asMap(boolean forCount) {
        Map<String, Object> hints = new HashMap<>();
        if (getRepositoryMethodMetadata() != null) {
            if (forCount) {
                hints.putAll(getRepositoryMethodMetadata().getQueryHintsForCount());
            } else {
                hints.putAll(getRepositoryMethodMetadata().getQueryHints());
            }
            hints.putAll(getFetchGraphs());
        }
        return hints;
    }

    private Map<String, Object> getFetchGraphs() {
        return getRepositoryMethodMetadata().getEntityGraph().map(entityGraph -> Jpa21Utils
                .tryGetFetchGraphHints(entityManager, getEntityGraph(entityGraph), entityInformation.getJavaType()))
                .orElse(Collections.emptyMap());
    }

    private JpaEntityGraph getEntityGraph(EntityGraph entityGraph) {
        String fallbackName = entityInformation.getEntityName() + "." + getRepositoryMethodMetadata().getMethod()
                .getName();
        return new JpaEntityGraph(entityGraph, fallbackName);
    }


}
