package a.posto.interactive.dmm.backend.model.physical.entity;

import jakarta.persistence.MappedSuperclass;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public abstract class BaseCreationModificationTimeEntity extends BaseCreationTimeEntity {
    @UpdateTimestamp
    private Instant modificationTime;
}
