import { Application } from "express";
import { createServer, Server } from "http";
import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import config from "@config";
import routes from "@api";
import cors from "cors";
import passport from "passport";
import { expressErrorHandler } from "@utils";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default ({
  app,
  session,
}: {
  app: Application;
  session: any;
}): Server => {
  app.use(limiter);
  app.use(cookieParser());

  app.use(session);

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(
    cors({
      origin: [config.app.url],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );

  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.use(config.server.api, routes());
  app.use(expressErrorHandler);

  return createServer(app);
};
