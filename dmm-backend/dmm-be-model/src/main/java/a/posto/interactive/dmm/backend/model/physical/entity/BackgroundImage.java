package a.posto.interactive.dmm.backend.model.physical.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.*;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class BackgroundImage extends BaseFileEntity {

    @OneToMany(mappedBy = "backgroundImage", fetch = FetchType.LAZY)
    @RestResource(path = "nodes", rel = "nodes")
    @EqualsAndHashCode.Exclude
    private Set<Node> nodes;
}
