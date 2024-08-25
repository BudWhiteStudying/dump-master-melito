package a.posto.interactive.dmm.backend.core.repository;

import a.posto.interactive.dmm.backend.model.physical.entity.BackgroundImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "background-image")
public interface BackgroundImageRepository extends JpaRepository<BackgroundImage, Long> {
}
