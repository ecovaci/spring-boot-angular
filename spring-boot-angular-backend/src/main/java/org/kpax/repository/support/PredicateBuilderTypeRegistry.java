package org.kpax.repository.support;

import org.kpax.repository.support.builder.DatePredicateBuilder;
import org.kpax.repository.support.builder.NumericPredicateBuilder;
import org.kpax.repository.support.builder.PredicateBuilder;
import org.kpax.repository.support.builder.StringPredicateBuilder;
import org.springframework.util.Assert;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

/**
 * @author Eugen Covaci {@literal eugen.covaci.q@gmail.com}
 * Created on 3/7/2020
 */
public final class PredicateBuilderTypeRegistry {

    private final Set<PredicateBuilder> predicateBuilders = new HashSet<>();

    public PredicateBuilderTypeRegistry() {
       registerDefaultPredicateBuilderTypes();
    }

    private void registerDefaultPredicateBuilderTypes () {
        registerPredicateBuilder(new DatePredicateBuilder());
        registerPredicateBuilder(new NumericPredicateBuilder());
        registerPredicateBuilder(new StringPredicateBuilder());
    }

    public boolean registerPredicateBuilder(PredicateBuilder predicateBuilder) {
        Assert.notNull(predicateBuilder, "predicateBuilder cannot be null");
        return predicateBuilders.add(predicateBuilder);
    }

    public Optional<PredicateBuilder> findEligible (Class<?> javaType) {
        return predicateBuilders.stream().filter(p -> p.appliesTo(javaType)).reduce((a, b) -> {
            throw new IllegalStateException(
                    "Multiple predicate builders found for type [" + javaType + "]: " + a.getClass() + ", " + b.getClass());
        });
    }

    public void clear() {
        predicateBuilders.clear();
    }
}
