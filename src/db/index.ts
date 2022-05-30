import config from "config";
import Sequelize from "sequelize";
import { dbLogger } from "@src/utils/logger";
import { getDBPath } from "@src/db/getDBPath";

const dbPath = getDBPath();
const { dialect }: { dialect: "sqlite" } = config.get("dbConfig");
const sequelize = new Sequelize.Sequelize({
  dialect,
  storage: dbPath,
  logging: (msg) => dbLogger.info(msg),
});

export const DB = {
  sequelize,
  close: async () => sequelize.close(),
};
