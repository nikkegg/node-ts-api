import config from "config";
import Sequelize from "sequelize";
import { dbLogger } from "@src/utils/logger";
import { getDBPath } from "@src/db/getDBPath";
import { CustomerModel } from "@src/models/customer.model";
import { OrderModel } from "@src/models/order.model";

const dbPath = getDBPath();
const { dialect }: { dialect: "sqlite" } = config.get("dbConfig");
const sequelize = new Sequelize.Sequelize({
  dialect,
  storage: dbPath,
  logging: (msg) => dbLogger.info(msg),
});

const Customers = CustomerModel(sequelize);
const Orders = OrderModel(sequelize);
Customers.hasMany(Orders);

export const DB = {
  Customers,
  Orders,
  sequelize,
  close: async () => sequelize.close(),
};
