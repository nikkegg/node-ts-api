import { DB } from "@src/db";
import { Customer } from "@src/types/models.interface";

const findAllCustomers = async (): Promise<Customer[]> =>
  DB.Customers.findAll({ order: [["email", "ASC"]] });

export const customerService = {
  findAllCustomers,
};
