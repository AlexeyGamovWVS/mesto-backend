import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../app-config";

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
    return res.status(401).send({ message: "Необходима авторизация" });
  }
  let payload: any;
  try {
    payload = verify(jwtToken, JWT_SECRET);
    req.user = payload;
  } catch (error) {
    return res.status(401).send({
      message: "Неверные данные для авторизации, пользователь не авторизован",
    });
  }
  return next();
};
