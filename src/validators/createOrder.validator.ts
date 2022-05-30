// import { Request } from "express";
import { DB } from "@src/db";
import { checkSchema, Schema } from "express-validator";

export interface CreateOrderDto {
  customerId: string;
  date?: string;
}

const isExistingUser = async (value: string): Promise<boolean> => {
  const userExists = await DB.Customers.findOne({
    where: { id: value },
  });
  if (!userExists) {
    return Promise.reject();
  }
  return true;
};

const schema: Schema = {
  customerId: {
    in: ["body"],
    isString: true,
    isEmpty: {
      negated: true,
      errorMessage: "Can not create order without customer id",
      bail: true,
    },
    trim: true,
    custom: {
      options: async (value) => isExistingUser(value),
      errorMessage: "Please create an account first",
      bail: true,
    },
  },
};

export const createOrderSchema = checkSchema(schema);
