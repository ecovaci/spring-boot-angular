package org.kpax.repository.support.builder;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.core.types.dsl.StringPath;
import org.kpax.repository.support.model.Filter;
import org.kpax.repository.support.model.FilterType;

/**
 * @author Eugen Covaci {@literal eugen.covaci.q@gmail.com}
 * Created on 3/7/2020
 */
public class StringPredicateBuilder implements PredicateBuilder {

    @Override
    public BooleanExpression buildPredicate(Filter filter, PathBuilder<?> pathBuilder) {
        StringPath stringPath = pathBuilder.getString(filter.getPath());
        if (filter.getType() == FilterType.equals) {
            return stringPath.equalsIgnoreCase(filter.getValue().toString());
        } else if (filter.getType() == FilterType.ne) {
            return stringPath.notEqualsIgnoreCase(filter.getValue().toString());
        } else if (filter.getType() == FilterType.contains) {
            return stringPath.upper().like("%" + filter.getValue().toString().toUpperCase() + "%");
        } else {
            throw new IllegalArgumentException(
                    "Invalid filter, type [" + filter.getType() + "] not allowed for string type");
        }
    }

    @Override
    public boolean appliesTo(Class<?> clazz) {
        return String.class.isAssignableFrom(clazz);
    }

}
