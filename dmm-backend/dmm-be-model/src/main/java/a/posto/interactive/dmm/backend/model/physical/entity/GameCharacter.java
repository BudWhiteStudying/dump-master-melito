package a.posto.interactive.dmm.backend.model.physical.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.*;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.lang.NonNull;

import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class GameCharacter extends BaseEntity {
    @NonNull
    private String name;
    @NonNull
    private String color;

    @OneToMany(mappedBy = "character", fetch = FetchType.LAZY)
    @RestResource(path = "images", rel = "images")
    private Set<CharacterImage> images;
}
