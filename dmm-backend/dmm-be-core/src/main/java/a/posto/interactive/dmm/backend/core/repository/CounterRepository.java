package a.posto.interactive.dmm.backend.core.repository;

import a.posto.interactive.dmm.backend.model.physical.entity.Counter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface CounterRepository extends JpaRepository<Counter, Long> {
}
