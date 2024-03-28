import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../app-config";
import { SERVER_STATUSES, sendError } from "../utils/errors";
import userSchema from "../models/user";
import { RequestWithUserID } from "../middlewars/auth";

export const getUsers = (req: Request, res: Response) =>
  userSchema
    .find({})
    .then((users) => res.status(SERVER_STATUSES.SUCCESS).send(users))
    .catch((err) => sendError(res, err.name));

export const getUser = (req: Request, res: Response) =>
  userSchema
    .findById({ _id: req.params.userId })
    .then((user) => res.status(SERVER_STATUSES.SUCCESS).send(user))
    .catch((err) => sendError(res, err.name));

export const getMe = (req: RequestWithUserID, res: Response) =>
  userSchema
    .findById({ _id: req.user?._id })
    .then((user) => res.status(SERVER_STATUSES.SUCCESS).send(user))
    .catch((err) => sendError(res, err.name));

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      userSchema.create({ name, about, avatar, password: hash, email }),
    )
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

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  return userSchema
    .findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Неправильные почта или пароль"));
        }
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        return res
          .cookie("jwt", token, {
            httpOnly: true,
            maxAge: 3600000 * 24 * 7,
            sameSite: true,
          })
          .send({ token });
      });
    })
    .catch((err) => {
      sendError(res, err.name);
    });
};
