import { expressLoader } from "@src/loaders/express.loader";
import { Application } from "express";
import { connectToDatabase } from "@src/loaders/db.loader";

export const init = async (app: Application): Promise<Application> => {
  await connectToDatabase();
  return expressLoader(app);
};
