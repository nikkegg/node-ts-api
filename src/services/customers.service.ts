import { DB } from "@src/db";
import { Customer } from "@src/types/models.interface";
import { HttpError } from "@src/errors/HttpError";

const findCustomerById = async (id: string): Promise<Customer> => {
  const customer: Customer | null = await DB.Customers.findByPk(id);

  if (!customer) throw new HttpError(400, "Customer not found");
  return customer;
};

const findAllCustomers = async (): Promise<Customer[]> =>
  DB.Customers.findAll({ order: [["email", "ASC"]] });

export const customerService = {
  findAllCustomers,
  findCustomerById,
};
