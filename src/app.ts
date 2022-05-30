import express, { Application } from "express";
import { routes } from "@src/routes/routes";
import { init } from "@src/loaders/loader.index";

const initApp = async () => {
  const app: Application = express();
  await init(app);
  // Routes
  routes.forEach((r) => app.use("/", r));
  return app;
};

const startApp = async () => {
  const app: Application = express();
  const port = 8080;
  const env = process.env.NODE_ENV || "development";
  // Routes
  routes.forEach((r) => app.use("/", r));
  // Start the server
  if (env !== "test") {
    app.listen(port, () => {
      if (env !== "test") {
        console.log(`=================================`);
        console.log(`======= ENV: ${env} =======`);
        console.log(`Server listening on the port ${port}`);
        console.log(`=================================`);
      }
    });
  }
};

export const App = { initApp, startApp };

App.startApp();
