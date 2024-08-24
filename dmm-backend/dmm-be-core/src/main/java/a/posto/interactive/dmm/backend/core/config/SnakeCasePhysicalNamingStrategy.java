package a.posto.interactive.dmm.backend.core.config;

import org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy;
import org.hibernate.boot.model.naming.Identifier;
import org.hibernate.engine.jdbc.env.spi.JdbcEnvironment;

import java.util.Locale;

public class SnakeCasePhysicalNamingStrategy extends CamelCaseToUnderscoresNamingStrategy {

    @Override
    public Identifier toPhysicalCatalogName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return name!=null
                ? new Identifier(
                    applyUpperCase(super.toPhysicalCatalogName(name, jdbcEnvironment)),
                    name.isQuoted())
                : null;
    }

    @Override
    public Identifier toPhysicalSchemaName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return name!=null
                ? new Identifier(
                    applyUpperCase(super.toPhysicalSchemaName(name, jdbcEnvironment)),
                    name.isQuoted())
                : null;
    }

    @Override
    public Identifier toPhysicalTableName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return name!=null
                ? new Identifier(
                applyUpperCase(super.toPhysicalTableName(name, jdbcEnvironment)),
                name.isQuoted())
                : null;
    }

    @Override
    public Identifier toPhysicalSequenceName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return name!=null
                ? new Identifier(
                applyUpperCase(super.toPhysicalSequenceName(name, jdbcEnvironment)),
                name.isQuoted())
                : null;
    }

    @Override
    public Identifier toPhysicalColumnName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return name!=null
                ? new Identifier(
                applyLowerCase(super.toPhysicalColumnName(name, jdbcEnvironment)),
                name.isQuoted())
                : null;
    }

    private String applyLowerCase(Identifier name) {
        return name.getText()
                .toLowerCase(Locale.ROOT);
    }

    private String applyUpperCase(Identifier name) {
        return name.getText()
                .toUpperCase(Locale.ROOT);
    }
}
