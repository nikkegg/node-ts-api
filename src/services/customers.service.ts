import { DB } from "@src/db";
import { Customer } from "@src/types/models.interface";
import { HttpError } from "@src/errors/HttpError";
import { CreateCustomerDto } from "@src/validators/createCustomer.validator";

const createCustomer = async (
  payload: CreateCustomerDto,
): Promise<Customer> => {
  const newCustomer: Customer = await DB.Customers.create({ ...payload });
  return newCustomer;
};

const findCustomerById = async (id: string): Promise<Customer> => {
  const customer: Customer | null = await DB.Customers.findByPk(id);

  if (!customer) throw new HttpError(400, "Customer not found");
  return customer;
};

const findAllCustomers = async (): Promise<Customer[]> =>
  DB.Customers.findAll({ order: [["email", "ASC"]] });

export const customerService = {
  createCustomer,
  findAllCustomers,
  findCustomerById,
};
