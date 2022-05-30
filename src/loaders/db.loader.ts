import { DB } from "@src/db/index";
import { logger } from "@src/utils/logger";

export const connectToDatabase = async () => {
  DB.sequelize
    .authenticate()
    .then(() => {
      logger.info("Connection to database has been established successfully.");
    })
    .catch((err) => {
      logger.error(err);
    });
};
