package a.posto.interactive.dmm.backend.model.physical.entity;

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
public class GameState extends BaseCreationModificationTimeEntity {
    @NonNull
    private String label;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", foreignKey = @ForeignKey(name = "FK_GAME_STATE__GAME"))
    @RestResource(path = "game", rel = "game")
    private Game game;

    @OneToMany(mappedBy = "gameState", fetch = FetchType.LAZY)
    @RestResource(path = "counters", rel = "counters")
    private Set<Counter> counters;
}
