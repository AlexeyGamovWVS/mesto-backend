import { Request, Response, NextFunction } from "express";

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
  req.user = {
    _id: "65fae49ed8f5ef68a65cb857",
  };

  next();
};
