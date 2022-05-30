import { customersController } from "@src/controllers/customers.controller";
import { uuidParamRouterMatch } from "@src/utils/util";
import { Router } from "express";

export const customerRouter: Router = Router();
const path = "/customers";
customerRouter.get(path, customersController.getCustomers);
customerRouter.get(
  `${path}/:customerId(${uuidParamRouterMatch})`,
  customersController.getCustomerById,
);
customerRouter.post(path, customersController.createCustomer);
