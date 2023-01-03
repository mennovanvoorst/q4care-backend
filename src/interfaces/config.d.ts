export interface ServerConfig {
  url: string;
  api: string;
  webhookUrl: string;
}
export interface DatabaseConfig {
  host: string;
  name: string;
  password: string;
  port: number;
  user: string;
}

export interface AppConfig {
  url: string;
}

export interface MailConfig {
  host: string;
  port: number;
  email: string;
  password: string;
}

export interface YoutubeConfig {
  key: string;
}

export interface MollieConfig {
  key: string;
}

export interface Config {
  app: AppConfig;
  database: DatabaseConfig;
  server: ServerConfig;
  mail: MailConfig;
  youtube: YoutubeConfig;
  debug: boolean;
  secret: string;
  port: number;
  serverAuthToken: string;
  mollie: MollieConfig;
}
