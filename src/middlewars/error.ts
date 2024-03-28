import { Request, Response, NextFunction } from "express";
import SERVER_STATUSES from "../utils/server-statuses";
import ERR_MSG from "../utils/error-messages";

interface Err extends Error {
  statusCode: number;
}

const getError = (
  err: Err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = SERVER_STATUSES.SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === SERVER_STATUSES.SERVER_ERROR
        ? `${ERR_MSG.SERV_ERROR} ${err}`
        : message,
  });
  next();
};

export default getError;
