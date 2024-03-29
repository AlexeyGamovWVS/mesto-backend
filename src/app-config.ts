const DEFAULTS = {
  PORT: 3000,
  MONGODB_URI: "mongodb://localhost:27017/mestodb",
  JWT_SECRET: "Abra_Kadabra",
};

export const PROFILE_DEFAULTS = {
  name: "Жак-Ив Кусто",
  about: "Исследователь",
  avatar:
    "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
};

export const {
  PORT = DEFAULTS.PORT,
  MONGODB_URI = DEFAULTS.MONGODB_URI,
  JWT_SECRET = DEFAULTS.JWT_SECRET,
} = process.env;
