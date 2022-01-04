const rootDir = process.env.NODE_ENV === "development" ? "src" : "build";
const extensionFile = process.env.NODE_ENV === "development" ? "ts" : "js";

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
  entities: [`${rootDir}/entities/*.${extensionFile}`],
  migrations: [`${rootDir}/database/migrations/*.${extensionFile}`],
  cli: {
    migrationsDir: `${rootDir}/database/migrations`,
    entitiesDir: `${rootDir}/entities`,
  },
};
