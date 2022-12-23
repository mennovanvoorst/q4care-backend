import { Sequelize } from "sequelize-typescript";
import config from "./config";

const sequelize = new Sequelize({
  database: config.database,
  username: config.username,
  password: config.password,
  dialect: config.dialect as any,
  logging: config.logging,
  models: [`${__dirname}/models/*.ts`],
});

export default sequelize;
