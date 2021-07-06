import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";

require('dotenv').config()

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/src/**/*entity.js'],
    synchronize: false,
    migrations: ['dist/src/db/migrations/postgres/*.js'],
    cli: {migrationsDir: 'src/db/migrations/postgres'},
    migrationsRun: false,
    migrationsTransactionMode: 'each',
};

export default config;
