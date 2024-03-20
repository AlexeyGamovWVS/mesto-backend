import { Request, Response } from "express";
import SERVER_STATUSES from "../utils/statuses";
import userSchema from "../models/user";

export const getUsers = (req: Request, res: Response) =>
  userSchema
    .find({})
    .then((users) => res.status(SERVER_STATUSES.SUCCESS).send({ users }))
    .catch(() => {
      res
        .status(SERVER_STATUSES.SERVER_ERROR)
        .send({ message: "Ошибка загрузки пользователей" });
    });

export const getUser = (req: Request, res: Response) => {
  const { userId } = req.params;
  return userSchema
    .findById({ _id: userId })
    .then((user) => res.status(SERVER_STATUSES.SUCCESS).send({ user }))
    .catch((err) =>
      res
        .status(SERVER_STATUSES.NOT_FOUND)
        .send({ message: `Ошибка: ${err} Пользователь не найден` }),
    );
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  return userSchema
    .create({ name, about, avatar })
    .then((user) => res.status(SERVER_STATUSES.POST_SUCCESS).send({ user }))
    .catch((err) => {
      res
        .status(SERVER_STATUSES.SERVER_ERROR)
        .send({ message: `Ошибка: ${err} Ошибка создания пользователя` });
    });
};
