package a.posto.interactive.dmm.backend.core.repository;

import a.posto.interactive.dmm.backend.model.physical.entity.CounterKind;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "counter-kinds")
public interface CounterKindRepository extends JpaRepository<CounterKind, Long> {
}
