package a.posto.interactive.dmm.backend.model.physical.entity;

import a.posto.interactive.dmm.backend.model.enumeration.SoundType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
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
public class Sound extends BaseFileEntity {
    @NonNull
    @Enumerated(value = EnumType.STRING)
    private SoundType kind;

    @OneToMany(mappedBy = "soundtrack", fetch = FetchType.LAZY)
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    @RestResource(exported = false)
    private Set<Node> nodes;
}
