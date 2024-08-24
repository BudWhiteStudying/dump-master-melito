package a.posto.interactive.dmm.backend.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "a.posto.interactive.dmm.backend")
@EntityScan(basePackages = {"a.posto.interactive.dmm.backend.model"})
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }
}
