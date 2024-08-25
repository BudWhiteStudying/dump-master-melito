package a.posto.interactive.dmm.backend.core.repository;

import a.posto.interactive.dmm.backend.model.physical.entity.Outcome;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface OutcomeRepository extends JpaRepository<Outcome, Long> {
}
