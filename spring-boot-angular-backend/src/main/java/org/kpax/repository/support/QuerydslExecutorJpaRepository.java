package org.kpax.repository.support;

import com.querydsl.jpa.JPQLQuery;
import org.kpax.repository.support.model.Filter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface QuerydslExecutorJpaRepository<T, ID> extends JpaRepository<T, ID> {

	/**
	 * Execute a QueryDsl Jpa query. This method can also have metadata: query hints
	 * and/or entity graph.
	 * @param query The query to be executed.
	 * @param pageable The paging information.
	 * @param filters The filters.
	 * @return The resulting page.
	 */
	Page<T> executeQuery(JPQLQuery<T> query, Pageable pageable, Filter... filters);

}
