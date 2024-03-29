import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { errors } from "celebrate";
import cookieParser from "cookie-parser";
import { requestLogger, errorLogger } from "./middlewars/logger";
import { MONGODB_URI, PORT } from "./app-config";
import appRouter from "./routers/app-router";
import getError from "./middlewars/error";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc.
});

const app = express();
app.use(helmet());
app.use(limiter);
mongoose.connect(MONGODB_URI);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use("/", appRouter);

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
// общий обработчик и логгер
app.use(errorLogger);
app.use(getError);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
