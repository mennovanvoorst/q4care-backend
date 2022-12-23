import express from "express";
import config from "@config";

import session from "express-session";
import { Pool } from "pg";

const PgSession = require("connect-pg-simple")(session);

const expressSession = session({
  store: new PgSession({
    pool: new Pool({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.name,
      port: config.database.port,
      max: 10,
      idleTimeoutMillis: 30000,
    }),
    tableName: "sessions",
  }),
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
});

const startServer = async (): Promise<void> => {
  const app = express();

  const { server } = await require("./loaders").default({
    expressApp: app,
    expressSession,
  });

  server
    .listen(config.port, () => {
      console.info(`Server listening on port ${config.port}`);
    })
    .on("error", (err: Error) => {
      console.error(err);
      process.exit(1);
    });
};
startServer();
