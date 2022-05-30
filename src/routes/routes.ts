import { indexRouter } from "@src/routes/index.route";
import { customerRouter } from "@src/routes/customers.route";
import { orderRouter } from "@src/routes/orders.route";

export const routes = [indexRouter, orderRouter, customerRouter];
