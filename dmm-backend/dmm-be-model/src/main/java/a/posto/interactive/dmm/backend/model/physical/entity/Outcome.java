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
public class Outcome extends BaseEntity {
    @NonNull
    private String counterKind;
    @NonNull
    private Integer modifier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "choice_id", foreignKey = @ForeignKey(name = "FK_OUTCOME__NODE"))
    @RestResource(path = "node", rel = "node")
    private Node node;
}
