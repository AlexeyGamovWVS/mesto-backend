import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import { RequestWithUserID } from "../middlewars/auth";
import cardSchema from "../models/card";
import SERVER_STATUSES from "../utils/server-statuses";
import BadRequestError from "../utils/bad-request-error";
import ERR_MSG from "../utils/error-messages";
import NotAllowedError from "../utils/not-allowed-error";
import NotFoundError from "../utils/not-found-error";

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  cardSchema
    .find({})
    .populate(["owner", "likes"])
    .then((cards) => {
      res.status(SERVER_STATUSES.SUCCESS).send(cards);
    })
    .catch(next);
};

export const createCard = (
  req: RequestWithUserID,
  res: Response,
  next: NextFunction,
) => {
  const { name, link } = req.body;
  return cardSchema
    .create({ name, link, owner: req.user?._id })
    .then((card) => res.status(SERVER_STATUSES.POST_SUCCESS).send(card))
    .catch((err) =>
      err instanceof mongoose.Error.ValidationError
        ? next(new BadRequestError(ERR_MSG.BAD_REQ))
        : next(err),
    );
};

export const deleteCard = (
  req: RequestWithUserID,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  return cardSchema
    .findById({ _id: cardId })
    .then((card) =>
      card?.owner.toString() !== req.user?._id
        ? next(new NotAllowedError(ERR_MSG.NOT_ALLOWED_DEL_CARD))
        : cardSchema
            .findByIdAndDelete({ _id: cardId })
            .then((deletedCard) => {
              res.status(SERVER_STATUSES.SUCCESS).send(deletedCard);
            })
            .catch((err) => next(err)),
    )
    .catch((err) =>
      err instanceof mongoose.Error.DocumentNotFoundError ||
      mongoose.Error.CastError
        ? next(new NotFoundError(ERR_MSG.NOT_FOUND))
        : next(err),
    );
};

export const toggleLike = (
  req: RequestWithUserID,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  return cardSchema
    .findByIdAndUpdate(
      { _id: cardId },
      req.method === "PUT"
        ? { $addToSet: { likes: req.user?._id } }
        : { $pull: { likes: req.user?._id } },
      { new: true },
    )
    .then((card) => {
      res.status(SERVER_STATUSES.POST_SUCCESS).send(card);
    })
    .catch((err) =>
      err instanceof mongoose.Error.DocumentNotFoundError ||
      mongoose.Error.CastError
        ? next(new NotFoundError(ERR_MSG.NOT_FOUND))
        : next(err),
    );
};
