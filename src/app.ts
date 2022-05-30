import express, { Application } from "express";
import { routes } from "@src/routes/routes";
import { init } from "@src/loaders/loader.index";
import { logger } from "@src/utils/logger";

const initApp = async () => {
  const app: Application = express();
  await init(app);
  // Routes
  routes.forEach((r) => app.use("/", r));
  return app;
};

const startApp = async () => {
  const app = await initApp();
  const port = 3000;
  const env = process.env.NODE_ENV || "development";
  // Start the server
  if (env !== "test") {
    app.listen(port, () => {
      if (env !== "test") {
        logger.info(`=================================`);
        logger.info(`======= ENV: ${env} =======`);
        logger.info(`Server listening on the port ${port}`);
        logger.info(`=================================`);
      }
    });
  }
};

export const App = { initApp, startApp };

App.startApp();
