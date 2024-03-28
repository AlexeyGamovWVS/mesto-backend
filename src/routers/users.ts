import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import {
  getUser,
  getUsers,
  updateUser,
  updateUserAvatar,
  getMe,
} from "../controllers/user";

const userRouter = Router();

userRouter.get(
  "/",
  celebrate({
    cookies: Joi.object()
      .keys({
        jwt: Joi.string().required(),
      })
      .unknown(true),
  }),
  getUsers,
);
userRouter.get(
  "/me",
  celebrate({
    cookies: Joi.object()
      .keys({
        jwt: Joi.string().required(),
      })
      .unknown(true),
  }),
  getMe,
);
userRouter.get(
  "/:userId",
  celebrate({
    cookies: Joi.object()
      .keys({
        jwt: Joi.string().required(),
      })
      .unknown(true),
    params: Joi.object().keys({
      userId: Joi.string().alphanum().min(2),
    }),
  }),
  getUser,
);
userRouter.patch(
  "/me",
  celebrate({
    cookies: Joi.object()
      .keys({
        jwt: Joi.string().required(),
      })
      .unknown(true),
    body: Joi.object().keys({
      name: Joi.string(),
      about: Joi.string(),
    }),
  }),
  updateUser,
);
userRouter.patch(
  "/me/avatar",
  celebrate({
    cookies: Joi.object()
      .keys({
        jwt: Joi.string().required(),
      })
      .unknown(true),
    body: Joi.object().keys({
      avatar: Joi.string().uri().required(),
    }),
  }),
  updateUserAvatar,
);

export default userRouter;
