import dotenv from "dotenv";
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_PORT, DB_HOST, DB_NAME, DB_CLIENT } =
process.env;

export default {
    client: DB_CLIENT,
    connection: {
    host: DB_HOST,
    user: DB_USER,
    port: Number(DB_PORT),
    password: DB_PASSWORD,
    database: DB_NAME,
    },
    migrations: {
        tableName: "knex_migrations",
        directory: "./db/migrations",
      },
      seeds: {
        directory: "./db/seeds",
      },
};
    