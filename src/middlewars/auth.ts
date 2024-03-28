import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../app-config";
import NotAuthorizedError from "../utils/not-authorized-error";
import ERR_MSG from "../utils/error-messages";

export interface RequestWithUserID extends Request {
  user?: {
    _id: string;
  };
}

export const auth = (
  req: RequestWithUserID,
  res: Response,
  next: NextFunction,
) => {
  const jwtToken = req.cookies.jwt;
  if (!jwtToken) {
    return next(new NotAuthorizedError(ERR_MSG.NOT_AUTH));
  }
  let payload: any;
  try {
    payload = verify(jwtToken, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    return next(new NotAuthorizedError(ERR_MSG.BAD_AUTH));
  }
  return next();
};
