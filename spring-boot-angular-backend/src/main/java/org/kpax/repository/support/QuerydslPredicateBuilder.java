package org.kpax.repository.support;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.PathBuilder;
import org.kpax.repository.support.builder.PredicateBuilder;
import org.kpax.repository.support.model.Filter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.util.Assert;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.util.Arrays;
import java.util.Iterator;
import java.util.Optional;
import java.util.stream.Stream;

public class QuerydslPredicateBuilder<T> {

	private static final Logger logger = LoggerFactory.getLogger(QuerydslPredicateBuilder.class);

	private JpaEntityInformation<T, ?> entityInformation;
	private EntityManager entityManager;
	private PathBuilder<T> pathBuilder;
	private PredicateBuilderTypeRegistry predicateBuilderTypeRegistry;

	public QuerydslPredicateBuilder(EntityManager entityManager, PathBuilder<T> pathBuilder,
                                    JpaEntityInformation<T, ?> entityInformation, PredicateBuilderTypeRegistry predicateBuilderTypeRegistry) {
		this.entityManager = entityManager;
		this.pathBuilder = pathBuilder;
		this.entityInformation = entityInformation;
		this.predicateBuilderTypeRegistry = predicateBuilderTypeRegistry;
	}

	public Predicate toPredicate(Filter... filters) {
		Assert.notNull(filters, "filters cannot be null");
		BooleanBuilder booleanBuilder = new BooleanBuilder();
		for (Filter filter : filters) {
			booleanBuilder.and(applyFilter(filter));
		}
		return booleanBuilder;
	}

	private Predicate applyFilter(Filter filter) {
		logger.debug("Apply filter {}", filter);
		Class<?> javaType = findJavaType(filter.getPath());
		logger.debug("Java type {}", javaType);
		PredicateBuilder predicateBuilder = predicateBuilderTypeRegistry.findEligible(javaType).orElseThrow(
				() -> new IllegalArgumentException("There is no method handler for this Java type: " + javaType));

		return predicateBuilder.buildPredicate(filter, pathBuilder);
	}

	private Class<?> findJavaType(String path) {
		logger.debug("Find Java type for path [{}]", path);
		String element = null;
		Class<?> javaType = this.entityInformation.getJavaType();
		Iterator<String> iterator = Arrays.asList(path.split("\\.")).iterator();
		while (iterator.hasNext()) {
			element = iterator.next();
			if (iterator.hasNext()) {// Still at entity level, get the new Java type
				EntityType<?> entityType = this.entityManager.getMetamodel().entity(javaType);
				javaType = entityType.getSingularAttribute(element).getJavaType();
			}
		}
		BeanInfo beanInfo;
		try {
			beanInfo = Introspector.getBeanInfo(javaType);
		} catch (IntrospectionException e) {
			throw new RuntimeException("Error on introspecting entity class: " + javaType, e);
		}
		final String lastElement = Optional.ofNullable(element).orElseThrow(
				() -> new IllegalArgumentException("Invalid path [" + path + "]"));
		final Class<?> entityClass = javaType;
		PropertyDescriptor propertyDescriptor = Stream.of(beanInfo.getPropertyDescriptors())
				.filter(descriptor -> descriptor.getName().equals(lastElement)).findFirst()
				.orElseThrow(
						() -> new IllegalArgumentException(
								"There is no field with name [" + lastElement + "] on entity class [" + entityClass));
		return propertyDescriptor.getPropertyType();

	}

}
