package a.posto.interactive.dmm.backend.model.physical.entity;


import a.posto.interactive.dmm.backend.model.enumeration.CharacterMood;
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
public class Line extends BaseEntity {
    @NonNull
    @Enumerated(value = EnumType.STRING)
    private CharacterMood mood;

    @OneToMany(mappedBy = "line", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @RestResource(path = "texts", rel = "texts")
    private Set<LanguageAwareText> text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sound_effect_id", foreignKey = @ForeignKey(name = "FK_LINE__SOUND_EFFECT"))
    @RestResource(path = "sound-effect", rel = "sound-effect")
    private Sound soundEffect;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "character_id", foreignKey = @ForeignKey(name = "FK_LINE__CHARACTER"))
    @RestResource(path = "character", rel = "character")
    private GameCharacter character;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dialog_id", foreignKey = @ForeignKey(name = "FK_LINE__NODE"))
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    @RestResource(exported = false)
    private Node dialog;
}
