import { Request, Response, NextFunction } from "express";
import { customerService } from "@src/services/customers.service";
import { Customer } from "@src/types/models.interface";

const getCustomerById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { customerId } = req.params;
    const customer: Customer = await customerService.findCustomerById(
      customerId,
    );

    res.status(200).json({ data: customer, success: true });
  } catch (error) {
    next(error);
  }
};

const getCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allCustomers: Customer[] = await customerService.findAllCustomers();
    res.status(200).json({ data: allCustomers, success: true });
  } catch (error) {
    next(error);
  }
};

export const customersController = {
  getCustomers,
  getCustomerById,
};
