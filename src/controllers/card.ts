import { Request, Response } from "express";
import { RequestWithUserID } from "../middlewars/auth";
import SERVER_STATUSES from "../utils/statuses";
import cardSchema from "../models/card";

export const getCards = (req: Request, res: Response) => {
  cardSchema
    .find({})
    .then((cards) => {
      res.status(SERVER_STATUSES.SUCCESS).send({ cards });
    })
    .catch((err) => {
      res
        .status(SERVER_STATUSES.SERVER_ERROR)
        .send({ message: `${err} Ошибка загрузки пользователей` });
    });
};

export const createCard = (req: RequestWithUserID, res: Response) => {
  const { name, link } = req.body;

  return cardSchema
    .create({ name, link, owner: req.user?._id })
    .then((card) => res.status(SERVER_STATUSES.POST_SUCCESS).send(card))
    .catch((err) => {
      res
        .status(SERVER_STATUSES.SERVER_ERROR)
        .send({ message: `Ошибка: ${err} Не удалось добавить пост` });
    });
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  return cardSchema
    .findByIdAndDelete({ _id: cardId })
    .then((card) => {
      res.status(SERVER_STATUSES.SUCCESS).send(card);
    })
    .catch((err) => {
      res
        .status(SERVER_STATUSES.BAD_REQUEST)
        .send({ message: `Ошибка: ${err} Не удалось найти карточку` });
    });
};
