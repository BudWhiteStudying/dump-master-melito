package a.posto.interactive.dmm.backend.core.repository;

import a.posto.interactive.dmm.backend.model.physical.entity.LanguageAwareText;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "texts", collectionResourceRel = "texts", itemResourceRel = "texts")
public interface LanguageAwareTextRepository extends JpaRepository<LanguageAwareText, Long> {
}
