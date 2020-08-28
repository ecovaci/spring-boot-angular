package org.kpax.repository.support.builder;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.DatePath;
import com.querydsl.core.types.dsl.PathBuilder;
import org.kpax.repository.support.model.Filter;
import org.kpax.repository.support.model.FilterType;

import java.util.Calendar;
import java.util.Date;

/**
 * @author Eugen Covaci {@literal eugen.covaci.q@gmail.com}
 * Created on 3/7/2020
 */
public class DatePredicateBuilder implements PredicateBuilder {

    @Override
    public BooleanExpression buildPredicate(Filter filter, PathBuilder<?> pathBuilder) {
        Date attributeValue = new Date(Long.parseLong(filter.getValue().toString()));
        DatePath<Date> datePath = pathBuilder.getDate(filter.getPath(), Date.class);
        if (filter.getType() == FilterType.equals) {
            return datePath.eq(attributeValue);
        } else if (filter.getType() == FilterType.gt) {
            return datePath.after(attributeValue);
        } else if (filter.getType() == FilterType.lt) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(attributeValue);
            calendar.add(Calendar.DAY_OF_YEAR, 1);
            return datePath.before(calendar.getTime());
        } else if (filter.getType() == FilterType.gte) {
            return datePath.goe(attributeValue);
        } else if (filter.getType() == FilterType.lte) {
            return datePath.loe(attributeValue);
        } else if (filter.getType() == FilterType.gten) {
            return datePath.goe(attributeValue).or(datePath.isNull());
        } else if (filter.getType() == FilterType.lten) {
            return datePath.loe(attributeValue).or(datePath.isNull());
        } else if (filter.getType() == FilterType.ne) {
            return datePath.ne(attributeValue);
        } else {
            throw new IllegalArgumentException(
                    "Invalid filter, type [" + filter.getType() + "] not allowed for date type");
        }
    }

    @Override
    public boolean appliesTo(Class<?> clazz) {
        return Date.class.isAssignableFrom(clazz);
    }

}
