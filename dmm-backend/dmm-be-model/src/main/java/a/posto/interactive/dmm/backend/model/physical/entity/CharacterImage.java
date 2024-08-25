package a.posto.interactive.dmm.backend.model.physical.entity;

import a.posto.interactive.dmm.backend.model.enumeration.CharacterMood;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.lang.NonNull;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class CharacterImage extends BaseFileEntity {
    @NonNull
    @Enumerated(value = EnumType.STRING)
    private CharacterMood mood;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "character_id", foreignKey = @ForeignKey(name = "FK_CHARACTER_IMG__CHARACTER"))
    @RestResource(path = "character", rel = "character")
    private GameCharacter character;
}
