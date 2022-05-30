import { DB } from "@src/db";
import { isStrictlyAlphabetic } from "@src/utils/util";
import { checkSchema, Schema } from "express-validator";

export interface CreateCustomerDto {
  familyName: string;
  givenName: string;
  email: string;
}

const isExistingUser = async (value: string): Promise<boolean> => {
  const emailExists = await DB.Customers.findOne({
    where: { email: value },
  });
  if (emailExists) {
    return Promise.reject();
  }
  return true;
};

const schema: Schema = {
  familyName: {
    in: ["body"],
    isEmpty: {
      negated: true,
      errorMessage: "Family name cannot be blank",
      bail: true,
    },
    isString: true,
    trim: true,
    escape: true,
    custom: {
      options: (value) => isStrictlyAlphabetic(value),
      bail: true,
      errorMessage: "Please use alphabetic characters only",
    },
  },
  givenName: {
    in: ["body"],
    isEmpty: {
      negated: true,
      errorMessage: "Given name cannot be blank",
      bail: true,
    },
    isString: true,
    trim: true,
    escape: true,
    custom: {
      options: (value) => isStrictlyAlphabetic(value),
      errorMessage: "Please use alphabetic characters only",
    },
  },
  email: {
    in: ["body"],
    normalizeEmail: true,
    isEmpty: {
      negated: true,
      errorMessage: "Please provide email address",
      bail: true,
    },
    isEmail: {
      errorMessage: "Please provide valid email address",
      bail: true,
    },
    trim: true,
    custom: {
      options: async (value) => isExistingUser(value),
      errorMessage: "Something went wrong",
      bail: true,
    },
  },
};

export const createCustomerSchema = checkSchema(schema);
