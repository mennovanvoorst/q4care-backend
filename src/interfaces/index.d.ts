import UserModel from "@models/user";
import type { IncomingMessage } from "http";

/* eslint-disable no-unused-vars */
interface SessionIncomingMessage extends IncomingMessage {
  user: UserModel;
}

declare global {
  declare namespace Express {
    interface Request {
      user: any;
      login: any;
    }
  }
  declare module "socket.io" {
    interface Socket {
      request: SessionIncomingMessage;
    }
  }
}

export {};
