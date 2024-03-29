import { Router } from "express";
import { auth } from "../middlewars/auth";
import { createUser, login } from "../controllers/user";
import userRouter from "./users";
import cardsRouter from "./cards";
import errorResource from "../controllers/404";
import { signinValidation, signupValidation } from "../utils/validation";

const appRouter = Router();

appRouter.post("/signin", signinValidation, login);
appRouter.post("/signup", signupValidation, createUser);

appRouter.use(auth);
appRouter.use("/users", userRouter);
appRouter.use("/cards", cardsRouter);
appRouter.all("/*", errorResource);

export default appRouter;
