import { Router } from "express";
import { indexController } from "@src/controllers/index.controller";

export const indexRouter: Router = Router();
indexRouter.get("/", indexController.index);
