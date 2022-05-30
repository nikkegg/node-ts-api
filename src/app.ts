import express, { Application } from "express";
import { routes } from "@src/routes/routes";

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

export const App = { startApp };

App.startApp();
