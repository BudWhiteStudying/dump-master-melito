package a.posto.interactive.dmm.backend.model.physical.entity;


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
public class Counter extends BaseEntity {
    @NonNull
    private Integer currentValue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_state_id", foreignKey = @ForeignKey(name = "FK_COUNTER__GAME_STATE"))
    @RestResource(path = "game-state", rel = "game-state")
    private GameState gameState;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "counter_kind_id", foreignKey = @ForeignKey(name = "FK_COUNTER__COUNTER_KIND"))
    @RestResource(path = "counter-kind", rel = "counter-kind")
    private CounterKind counterKind;
}
