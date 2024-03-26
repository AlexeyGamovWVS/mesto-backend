const DEFAULTS = {
  PORT: 3000,
  MONGODB_URI: "mongodb://localhost:27017/mestodb",
};

export const { PORT = DEFAULTS.PORT, MONGODB_URI = DEFAULTS.MONGODB_URI } =
  process.env;
