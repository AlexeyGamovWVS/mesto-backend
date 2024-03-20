import { Response } from "express";

export const SERVER_STATUSES = {
  SERVER_ERROR: 500,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  POST_SUCCESS: 201,
  SUCCESS: 200,
};

export const SERVER_ERROR_MESSAGES = {
  SERVER_ERROR: "500: Сбой в работе сервера, свяжитесь с разработчиком",
  BAD_REQUEST:
    "400: Переданы некорректные данные. Пожалуйста, авторизуйтесь повторно или проверьте отправляемые данные на сервер",
  NOT_FOUND: "404: Ресурс не найден, проверьте адрес",
};

export const sendError = (res: Response, errorName: string) => {
  switch (errorName) {
    case "CastError":
      res
        .status(SERVER_STATUSES.NOT_FOUND)
        .send({ message: SERVER_ERROR_MESSAGES.NOT_FOUND });
      break;
    case "ValidationError":
      res
        .status(SERVER_STATUSES.BAD_REQUEST)
        .send({ message: SERVER_ERROR_MESSAGES.NOT_FOUND });
      break;
    default:
      res
        .status(SERVER_STATUSES.SERVER_ERROR)
        .send({ message: SERVER_ERROR_MESSAGES.SERVER_ERROR });
      break;
  }
};
