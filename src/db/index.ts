import config from "config";
import Sequelize from "sequelize";
import { dbLogger } from "@src/utils/logger";
import { getDBPath } from "@src/db/getDBPath";
import { CustomerModel } from "@src/models/customer.model";

const dbPath = getDBPath();
const { dialect }: { dialect: "sqlite" } = config.get("dbConfig");
const sequelize = new Sequelize.Sequelize({
  dialect,
  storage: dbPath,
  logging: (msg) => dbLogger.info(msg),
});

const Customers = CustomerModel(sequelize);

export const DB = {
  Customers,
  sequelize,
  close: async () => sequelize.close(),
};
