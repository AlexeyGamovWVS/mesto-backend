import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/user";
import cardsRouter from "./routers/card";
import { auth } from "./middlewars/auth";

const DEFAULTS = {
  PORT: 3000,
};
const { PORT = DEFAULTS.PORT } = process.env;

const app = express();
mongoose.connect("mongodb://localhost:27017/mestodb");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(auth);
app.use("/users", userRouter);
app.use("/cards", cardsRouter);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
