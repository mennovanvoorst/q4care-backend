import { Application } from "express";
import { Server } from "http";
import "src/database/sequelize";
import { Server as SocketServer } from "socket.io";

import expressLoader from "./express";
import passportLoader from "./passport";

export default async ({
  expressApp,
  expressSession,
}: {
  expressApp: Application;
  expressSession: any;
}): Promise<{ server: Server }> => {
  await passportLoader();

  const server: Server = await expressLoader({
    app: expressApp,
    session: expressSession,
  });

  return { server };
};
