package a.posto.interactive.dmm.backend.model.physical.entity;

import a.posto.interactive.dmm.backend.model.enumeration.NodeType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.lang.NonNull;

import java.util.Set;

@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Cacheable
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Node extends BaseEntity {
    @NonNull
    private String description;
    @NonNull
    @Enumerated(value = EnumType.STRING)
    private NodeType kind;

    @OneToMany(mappedBy = "node", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @RestResource(path = "texts", rel = "texts")
    private Set<LanguageAwareText> text;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.DETACH)
    @JoinColumn(name = "background_id", foreignKey = @ForeignKey(name = "FK_NODE__BKG_IMAGE"))
    @RestResource(path = "background-image", rel = "background-image")
    private BackgroundImage backgroundImage;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.DETACH)
    @JoinColumn(name = "soundtrack_id", foreignKey = @ForeignKey(name = "FK_NODE__SOUNDTRACK"))
    @RestResource(path = "soundtrack", rel = "soundtrack")
    private Sound soundtrack;

    @OneToMany(mappedBy = "node", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @RestResource(path = "outcomes", rel = "outcomes")
    private Set<Outcome> outcomes;

    @OneToMany(mappedBy = "dialog", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @RestResource(path = "lines", rel = "lines")
    private Set<Line> lines;

    //Node hierarchy relationships

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.DETACH)
    @JoinColumn(name = "parent_id", foreignKey = @ForeignKey(name = "FK_NODE__PARENT"))
    @RestResource(path = "parent", rel = "parent")
    private Node parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @RestResource(path = "children", rel = "children")
    @EqualsAndHashCode.Exclude
    private Set<Node> children;
}
