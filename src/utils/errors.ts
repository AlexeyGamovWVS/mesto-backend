import { Response } from "express";

export const SERVER_STATUSES = {
  SERVER_ERROR: 500,
  NOT_FOUND: 404,
  NOT_AUTHORIZED: 401,
  BAD_REQUEST: 400,
  POST_SUCCESS: 201,
  SUCCESS: 200,
};

export const SERVER_ERROR_MESSAGES = {
  SERVER_ERROR: "На сервере произошла ошибка",
  BAD_REQUEST:
    "Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля",
  NOT_FOUND:
    "Карточка или пользователь не найден или был запрошен несуществующий роут",
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
