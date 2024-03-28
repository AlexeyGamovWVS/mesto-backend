import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../app-config";
import userSchema from "../models/user";
import { RequestWithUserID } from "../middlewars/auth";
import SERVER_STATUSES from "../utils/server-statuses";
import NotFoundError from "../utils/not-found-error";
import ERR_MSG from "../utils/error-messages";
import BadRequestError from "../utils/bad-request-error";
import UniqueDataError from "../utils/unique-data-error";
import NotAuthorizedError from "../utils/not-authorized-error";

export const getUsers = (req: Request, res: Response, next: NextFunction) =>
  userSchema
    .find({})
    .then((users) => res.status(SERVER_STATUSES.SUCCESS).send(users))
    .catch(next);

export const getUser = (req: Request, res: Response, next: NextFunction) =>
  userSchema
    .findById({ _id: req.params.userId })
    .then((user) => res.status(SERVER_STATUSES.SUCCESS).send(user))
    .catch((err) =>
      err instanceof mongoose.Error.DocumentNotFoundError ||
      mongoose.Error.CastError
        ? next(new NotFoundError(ERR_MSG.NOT_FOUND))
        : next(err),
    );

export const getMe = (
  req: RequestWithUserID,
  res: Response,
  next: NextFunction,
) =>
  userSchema
    .findById({ _id: req.user?._id })
    .then((user) => res.status(SERVER_STATUSES.SUCCESS).send(user))
    .catch(next);

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      userSchema.create({ name, about, avatar, password: hash, email }),
    )
    .then((user) => res.status(SERVER_STATUSES.POST_SUCCESS).send(user))
    .catch((err) =>
      // eslint-disable-next-line no-nested-ternary
      err instanceof mongoose.Error.ValidationError
        ? next(new BadRequestError(ERR_MSG.BAD_REQ))
        : err.code === 11000
          ? next(new UniqueDataError(ERR_MSG.EMAIL_EXIST))
          : next(err),
    );
};

export const updateUser = (
  req: RequestWithUserID,
  res: Response,
  next: NextFunction,
) => {
  const { name, about } = req.body;
  return userSchema
    .findByIdAndUpdate({ _id: req.user?._id }, { name, about }, { new: true })
    .then((user) => res.status(SERVER_STATUSES.POST_SUCCESS).send(user))
    .catch((err) =>
      // eslint-disable-next-line no-nested-ternary
      err instanceof mongoose.Error.ValidationError
        ? next(new BadRequestError(ERR_MSG.BAD_REQ))
        : err instanceof mongoose.Error.DocumentNotFoundError
          ? next(new NotFoundError(ERR_MSG.NOT_FOUND))
          : next(err),
    );
};

export const updateUserAvatar = (
  req: RequestWithUserID,
  res: Response,
  next: NextFunction,
) => {
  const { avatar } = req.body;
  return userSchema
    .findByIdAndUpdate({ _id: req.user?._id }, { avatar }, { new: true })
    .then((user) => res.status(SERVER_STATUSES.POST_SUCCESS).send(user))
    .catch((err) =>
      // eslint-disable-next-line no-nested-ternary
      err instanceof mongoose.Error.ValidationError
        ? next(new BadRequestError(ERR_MSG.BAD_REQ))
        : err instanceof mongoose.Error.DocumentNotFoundError
          ? next(new NotFoundError(ERR_MSG.NOT_FOUND))
          : next(err),
    );
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return userSchema
    .findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new NotAuthorizedError(ERR_MSG.NOT_AUTH);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new NotAuthorizedError(ERR_MSG.BAD_AUTH);
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
    .catch(next);
};
