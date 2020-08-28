package org.kpax.repository;

import org.kpax.entity.User;
import org.kpax.repository.support.QuerydslExecutorJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestRepository extends QuerydslExecutorJpaRepository<User, Long> {

}
