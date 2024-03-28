import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import { auth } from "../middlewars/auth";
import { createUser, login } from "../controllers/user";
import userRouter from "./users";
import cardsRouter from "./cards";
import errorResource from "../controllers/404";

const appRouter = Router();

appRouter.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
appRouter.post(
  "/signup",
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      })
      .unknown(true),
  }),
  createUser,
);

appRouter.use(auth);
appRouter.use("/users", userRouter);
appRouter.use("/cards", cardsRouter);
appRouter.all("/*", errorResource);

export default appRouter;
