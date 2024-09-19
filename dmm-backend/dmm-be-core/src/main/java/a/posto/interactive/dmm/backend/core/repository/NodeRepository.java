package a.posto.interactive.dmm.backend.core.repository;

import a.posto.interactive.dmm.backend.model.physical.entity.Node;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface NodeRepository extends JpaRepository<Node, Long> {
    List<Node> findByParentIsNull();
    List<Node> findByParentId(@Param("parentId") Long parentId);
    int countByParentId(@Param("parentId") Long parentId);
}
