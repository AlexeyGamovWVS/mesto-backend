import { Request, Response } from "express";
import { RequestWithUserID } from "../middlewars/auth";
import { SERVER_STATUSES, sendError } from "../utils/errors";
import cardSchema from "../models/card";

export const getCards = (req: Request, res: Response) => {
  cardSchema
    .find({})
    .then((cards) => {
      res.status(SERVER_STATUSES.SUCCESS).send(cards);
    })
    .catch((err) => sendError(res, err.name));
};

export const createCard = (req: RequestWithUserID, res: Response) => {
  const { name, link } = req.body;
  return cardSchema
    .create({ name, link, owner: req.user?._id })
    .then((card) => res.status(SERVER_STATUSES.POST_SUCCESS).send(card))
    .catch((err) => sendError(res, err.name));
};

export const deleteCard = (req: RequestWithUserID, res: Response) => {
  const { cardId } = req.params;
  return cardSchema
    .findById({ _id: cardId })
    .then((card) => {
      if (card?.owner.toString() !== req.user?._id) {
        return Promise.reject(
          new Error("Карточка принадлежит другому пользователю"),
        );
      }
      return cardSchema
        .findByIdAndDelete({ _id: cardId })
        .then((deletedCard) => {
          res.status(SERVER_STATUSES.SUCCESS).send(deletedCard);
        })
        .catch((err) => sendError(res, err.name));
    })
    .catch((err) => sendError(res, err.name));
};

export const putLike = (req: RequestWithUserID, res: Response) => {
  const { cardId } = req.params;
  return cardSchema
    .findByIdAndUpdate(
      { _id: cardId },
      { $addToSet: { likes: req.user?._id } }, // добавить _id в массив, если его там нет
      { new: true },
    )
    .then((card) => {
      res.status(SERVER_STATUSES.POST_SUCCESS).send(card);
    })
    .catch((err) => sendError(res, err.name));
};

export const deleteLike = (req: RequestWithUserID, res: Response) => {
  const { cardId } = req.params;
  return cardSchema
    .findByIdAndUpdate(
      { _id: cardId },
      { $pull: { likes: req.user?._id } }, // убрать _id из массива
      { new: true },
    )
    .then((card) => {
      res.status(SERVER_STATUSES.POST_SUCCESS).send(card);
    })
    .catch((err) => sendError(res, err.name));
};
