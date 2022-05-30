import { expressLoader } from "@src/loaders/express.loader";
import { Application } from "express";
// import {dbLoader}

export const init = async (app: Application): Promise<Application> => {
  return expressLoader(app);
};
