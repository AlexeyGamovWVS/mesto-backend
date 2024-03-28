import express from "express";
import mongoose from "mongoose";
import { errors } from "celebrate";
import cookieParser from "cookie-parser";
import { requestLogger, errorLogger } from "./middlewars/logger";
import { MONGODB_URI, PORT } from "./app-config";
import appRouter from "./routers/app-router";
import getError from "./middlewars/error";

const app = express();
mongoose.connect(MONGODB_URI);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use("/", appRouter);

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
// наш централизованный обработчик и логгер
app.use(errorLogger);
app.use(getError);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
