package org.kpax.repository.support.builder;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import org.kpax.repository.support.model.Filter;

/**
 * @author Eugen Covaci {@literal eugen.covaci.q@gmail.com}
 * Created on 3/7/2020
 */
public interface PredicateBuilder {

    BooleanExpression buildPredicate(Filter filter, PathBuilder<?> pathBuilder);

    boolean appliesTo (Class<?> clazz);
}
