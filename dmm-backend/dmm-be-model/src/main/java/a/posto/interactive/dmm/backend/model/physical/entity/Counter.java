package a.posto.interactive.dmm.backend.model.physical.entity;


import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class Counter extends BaseEntity {
    private Integer currentValue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_state_id")
    private GameState gameState;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "counter_kind_id")
    private CounterKind counterKind;
}
