package a.posto.interactive.dmm.backend.model.physical.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class LanguageAwareText extends BaseEntity {
    @NonNull
    private String text;
    @NonNull
    private String languageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "line_id", foreignKey = @ForeignKey(name = "FK_TEXT__LINE"))
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    @RestResource(exported = false)
    private Line line;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "node_id", foreignKey = @ForeignKey(name = "FK_TEXT__NODE"))
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    @RestResource(exported = false)
    private Node node;
}
