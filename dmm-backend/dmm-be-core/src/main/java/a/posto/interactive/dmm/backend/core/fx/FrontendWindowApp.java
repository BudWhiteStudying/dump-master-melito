package a.posto.interactive.dmm.backend.core.fx;

import jakarta.annotation.PostConstruct;
import javafx.application.Application;
import javafx.application.Platform;
import javafx.scene.Scene;
import javafx.scene.web.WebView;
import javafx.stage.Stage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("!development")
public class FrontendWindowApp extends Application {

    @Value("${server.servlet.context-path}")
    private String contextPath;

    @Value("${application.label}")
    private String applicationLabel;

    @Override
    public void start(Stage primaryStage) {
        WebView webView = new WebView();

        webView.getEngine().load(String.format("http://localhost:8080%s", contextPath));

        Scene scene = new Scene(webView, 1024, 768);
        primaryStage.setTitle(applicationLabel);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    @PostConstruct
    private void loadUserInterface() {
        Platform.startup(() -> this.start(new Stage()));
    }
}
