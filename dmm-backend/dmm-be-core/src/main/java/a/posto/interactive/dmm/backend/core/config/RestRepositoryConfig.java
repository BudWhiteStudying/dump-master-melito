package a.posto.interactive.dmm.backend.core.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.repository.support.Repositories;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
@RequiredArgsConstructor
public class RestRepositoryConfig implements RepositoryRestConfigurer {

    @Value("${api.cors.allowed.origins}")
    private String allowedCorsOrigins;

    @Value("${api.cors.allowed.methods}")
    private String[] allowedCorsMethods;

    private final Repositories repositories;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
        cors.addMapping("/**")
                .allowedOrigins(allowedCorsOrigins)
                .allowedMethods(allowedCorsMethods);
        repositories.iterator().forEachRemaining(config::exposeIdsFor);
    }
}
