const env = process.env.NODE_ENV || "development";
export const getDBPath = () => {
  switch (env) {
    case "development":
      return "./customers.db";
    case "test":
      return "./customers_test.db";
    default:
      return "./customers.db";
  }
};
