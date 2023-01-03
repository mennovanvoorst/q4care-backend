import { Application } from "express";
import { Server } from "http";
import "src/database/sequelize";

import expressLoader from "./express";
import passportLoader from "./passport";
import cronLoader from "./cron";

export default async ({
  expressApp,
  expressSession,
}: {
  expressApp: Application;
  expressSession: any;
}): Promise<{ server: Server }> => {
  await passportLoader();
  await cronLoader();

  const server: Server = await expressLoader({
    app: expressApp,
    session: expressSession,
  });

  return { server };
};
