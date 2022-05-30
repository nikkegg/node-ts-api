import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "config";
import helmet from "helmet";
import morgan from "morgan";
import hpp from "hpp";
import { stream } from "@src/utils/logger";
import express, { Application } from "express";

export const expressLoader = async (app: Application) => {
  // Logging
  app.use(
    morgan(config.get("log.format"), {
      stream,
      skip: () => process.env.NODE_ENV === "test",
    }),
  );

  // Middleware
  app.use(
    cors({
      origin: config.get("cors.origin"),
      credentials: config.get("cors.credentials"),
    }),
  );
  app.use(hpp());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Error handling, could do with some error reporting

  return app;
};
