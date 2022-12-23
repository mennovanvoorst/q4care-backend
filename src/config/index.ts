import { Config } from "@interfaces/config";

const config: Config = {
  debug: (process.env.DEBUG as string) === "true",
  secret: process.env.SECRET as string,
  serverAuthToken: process.env.SERVER_AUTH_TOKEN as string,
  port: parseInt(process.env.PORT as string, 10),

  app: {
    url: process.env.APP_URL as string,
  },

  database: {
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    name: process.env.DB_NAME as string,
    port: parseInt(process.env.DB_PORT as string, 10),
  },

  server: {
    url: process.env.SERVER_URL as string,
    api: process.env.API_PREFIX as string,
  },

  mail: {
    host: process.env.MAIL_HOST as string,
    port: parseInt(process.env.MAIL_PORT as string, 10),
    email: process.env.MAIL_EMAIL as string,
    password: process.env.MAIL_PASSWORD as string,
  },

  youtube: {
    key: process.env.YOUTUBE_KEY as string,
  },
};

export default config;
