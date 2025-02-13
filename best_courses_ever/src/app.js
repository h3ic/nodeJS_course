import createError from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import express from "express";
import path from "node:path";

import {
  usersRouter,
  coursesRouter,
  lessonsRouter,
  resourcesRouter,
} from "./routes/index.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter.apiRouter);
app.use("/api/courses", coursesRouter.apiRouter);
app.use("/api/lessons", lessonsRouter.apiRouter);
app.use("/api/resources", resourcesRouter.apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
