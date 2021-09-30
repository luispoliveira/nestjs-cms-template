export const configuration = () => ({
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || '3000', 10),
    dbConfig: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    },
    migrationRun: (process.env.MIGRATION_RUN === 'true'),
    admin: {
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
    },
    jwtKeySecret: process.env.JWT_SECRET_KEY,
    cliPath: process.env.CLI_PATH
})
