import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import {
  createCard,
  deleteCard,
  toggleLike,
  getCards,
} from "../controllers/card";

const cardsRouter = Router();

cardsRouter.get(
  "/",
  celebrate({
    cookies: Joi.object()
      .keys({
        jwt: Joi.string().required(),
      })
      .unknown(true),
  }),
  getCards,
);
cardsRouter.post(
  "/",
  celebrate({
    cookies: Joi.object()
      .keys({
        jwt: Joi.string().required(),
      })
      .unknown(true),
    body: Joi.object().keys({
      name: Joi.string().required(),
      link: Joi.string().uri().required(),
    }),
  }),
  createCard,
);
cardsRouter.delete(
  "/:cardId",
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
  deleteCard,
);
// likes
cardsRouter.put(
  ":cardId/likes",
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
  toggleLike,
);
cardsRouter.delete(
  ":cardId/likes",
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
  toggleLike,
);

export default cardsRouter;
