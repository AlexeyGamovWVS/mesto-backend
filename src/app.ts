import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { MONGODB_URI, PORT } from "./app-config";
import appRouter from "./routers/app-router";
import getError from "./middlewars/error";

const app = express();
mongoose.connect(MONGODB_URI);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", appRouter);
app.use(getError);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
