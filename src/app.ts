import express from "express";
import mongoose from "mongoose";

const DEFAULTS = {
  PORT: 3000,
};
const { PORT = DEFAULTS.PORT } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
