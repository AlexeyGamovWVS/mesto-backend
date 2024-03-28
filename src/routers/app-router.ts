import { Router } from "express";
import { auth } from "../middlewars/auth";
import { createUser, login } from "../controllers/user";
import userRouter from "./users";
import cardsRouter from "./cards";

const appRouter = Router();

appRouter.post("/signin", login);
appRouter.post("/signup", createUser);

appRouter.use(auth);
appRouter.use("/users", userRouter);
appRouter.use("/cards", cardsRouter);

export default appRouter;
