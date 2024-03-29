import { NextFunction, Request, Response } from "express";
import NotFoundError from "../utils/not-found-error";

const errorResource = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Запрашиваемого ресурса не существет"));
};

export default errorResource;
