import { DB } from "@src/db";

export const resetDB = async () => {
  try {
    await DB.sequelize.query("PRAGMA foreign_keys = 0");
    await DB.Customers.truncate({ cascade: true });
    await DB.sequelize.query("PRAGMA foreign_keys = 1");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
