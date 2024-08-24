package a.posto.interactive.dmm.backend.model.physical.entity;

import jakarta.persistence.MappedSuperclass;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public abstract class BaseCreationTimeEntity extends BaseEntity {
    @CreationTimestamp
    private Instant creationTime;
}
