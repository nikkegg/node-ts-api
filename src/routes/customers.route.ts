import { customersController } from "@src/controllers/customers.controller";
import { Router } from "express";

export const customerRouter: Router = Router();
const path = "/customers";
customerRouter.get(path, customersController.getCustomers);
