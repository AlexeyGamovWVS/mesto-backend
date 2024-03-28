import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../app-config";
import { SERVER_STATUSES } from "../utils/errors";

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
    return res
      .status(SERVER_STATUSES.NOT_AUTHORIZED)
      .send({ message: "Пожалуйста авторизуйтесь" });
  }
  let payload: any;
  try {
    payload = verify(jwtToken, JWT_SECRET);
    req.user = payload;
  } catch (error) {
    return res.status(SERVER_STATUSES.NOT_AUTHORIZED).send({
      message: "Пожалуйста авторизуйтесь",
    });
  }
  return next();
};
