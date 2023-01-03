import { Router } from "express";
import auth from "./routes/auth";
import users from "./routes/users";
import skills from "./routes/skills";
import classes from "./routes/classes";
import learningResource from "./routes/learningResource";
import files from "./routes/files";
import payments from "./routes/payments";

export default (): Router => {
  const app = Router();

  auth(app);
  users(app);
  skills(app);
  classes(app);
  learningResource(app);
  files(app);
  payments(app);

  return app;
};
