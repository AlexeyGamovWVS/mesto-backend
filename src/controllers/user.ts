import { Request, Response } from "express";
import { SERVER_STATUSES, sendError } from "../utils/errors";
import userSchema from "../models/user";
import { RequestWithUserID } from "../middlewars/auth";

export const getUsers = (req: Request, res: Response) =>
  userSchema
    .find({})
    .then((users) => res.status(SERVER_STATUSES.SUCCESS).send(users))
    .catch((err) => sendError(res, err.name));

export const getUser = (req: Request, res: Response) => {
  const { userId } = req.params;
  return userSchema
    .findById({ _id: userId })
    .then((user) => res.status(SERVER_STATUSES.SUCCESS).send(user))
    .catch((err) => sendError(res, err.name));
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  return userSchema
    .create({ name, about, avatar })
    .then((user) => res.status(SERVER_STATUSES.POST_SUCCESS).send(user))
    .catch((err) => sendError(res, err.name));
};

export const updateUser = (req: RequestWithUserID, res: Response) => {
  const { name, about } = req.body;
  return userSchema
    .findByIdAndUpdate({ _id: req.user?._id }, { name, about }, { new: true })
    .then((user) => res.status(SERVER_STATUSES.POST_SUCCESS).send(user))
    .catch((err) => sendError(res, err.name));
};

export const updateUserAvatar = (req: RequestWithUserID, res: Response) => {
  const { avatar } = req.body;
  return userSchema
    .findByIdAndUpdate({ _id: req.user?._id }, { avatar }, { new: true })
    .then((user) => res.status(SERVER_STATUSES.POST_SUCCESS).send(user))
    .catch((err) => sendError(res, err.name));
};
