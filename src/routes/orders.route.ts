import { orderController } from "@src/controllers/orders.controller";
import { Router } from "express";
import { uuidParamRouterMatch } from "@src/utils/util";
import { createOrderSchema } from "@src/validators/createOrder.validator";

export const orderRouter: Router = Router();
orderRouter.get(
  `/customers/:customerId(${uuidParamRouterMatch})/orders`,
  orderController.getOrders,
);
orderRouter.get(
  `/customers/:customerId(${uuidParamRouterMatch})/orders/:orderId(${uuidParamRouterMatch})`,
  orderController.getOrder,
);
orderRouter.post(`/orders`, createOrderSchema, orderController.createOrder);
