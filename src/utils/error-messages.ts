const ERR_MSG = {
  NOT_AUTH: "Пользователь не авторизован",
  BAD_AUTH: "Передан неверный логин или пароль.",
  BAD_REQ:
    "Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля",
  NOT_ALLOWED_DEL_CARD: "Совершена попытка удалить чужую карточку",
  NOT_FOUND:
    "Карточка или пользователь не найден или был запрошен несуществующий роут",
  EMAIL_EXIST: "Пользователь с данным email уже существует на сервере",
  SERV_ERROR: "На сервере произошла ошибка",
};

export default ERR_MSG;
