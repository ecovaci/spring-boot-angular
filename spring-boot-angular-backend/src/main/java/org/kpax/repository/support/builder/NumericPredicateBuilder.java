package org.kpax.repository.support.builder;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.PathBuilder;
import org.kpax.repository.support.model.Filter;
import org.kpax.repository.support.model.FilterType;

import java.math.BigDecimal;

/**
 * @author Eugen Covaci {@literal eugen.covaci.q@gmail.com}
 * Created on 3/7/2020
 */
public class NumericPredicateBuilder implements PredicateBuilder {

    @Override
    public BooleanExpression buildPredicate(Filter filter, PathBuilder<?> pathBuilder) {
        BigDecimal attributeValue = new BigDecimal(filter.getValue().toString());
        NumberPath<BigDecimal> numberPath = pathBuilder.getNumber(filter.getPath(), BigDecimal.class);
        if (filter.getType() == FilterType.equals) {
            return numberPath.eq(attributeValue);
        } else if (filter.getType() == FilterType.gt) {
            return numberPath.gt(attributeValue);
        } else if (filter.getType() == FilterType.lt) {
            return numberPath.lt(attributeValue);
        } else if (filter.getType() == FilterType.gte) {
            return numberPath.goe(attributeValue);
        } else if (filter.getType() == FilterType.lte) {
            return numberPath.loe(attributeValue);
        } else if (filter.getType() == FilterType.ne) {
            return numberPath.ne(attributeValue);
        } else {
            throw new IllegalArgumentException(
                    "Invalid filter, type [" + filter.getType() + "] not allowed for numeric type");
        }
    }

    @Override
    public boolean appliesTo(Class<?> clazz) {
        return isNumeric(clazz);
    }

    private boolean isNumeric(Class<?> javaType) {
        if (javaType.isPrimitive()) {
            return javaType == Byte.TYPE ||
                    javaType == Short.TYPE ||
                    javaType == Integer.TYPE ||
                    javaType == Float.TYPE ||
                    javaType == Double.TYPE;
        }
        return Number.class.isAssignableFrom(javaType);
    }

}
