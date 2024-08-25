package a.posto.interactive.dmm.backend.model.physical.entity;

import jakarta.persistence.MappedSuperclass;
import lombok.*;
import org.springframework.lang.NonNull;

@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public abstract class BaseFileEntity extends BaseEntity {
    @NonNull
    private String description;
    @NonNull
    private String filePath;
}
