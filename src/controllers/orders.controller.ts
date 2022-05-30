import { Request, Response, NextFunction } from "express";
import { Order } from "@src/types/models.interface";
import { orderService } from "@src/services/orders.service";
import { validationResult } from "express-validator";
import { CreateOrderDto } from "@src/validators/createOrder.validator";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
      return;
    }
    const orderData: CreateOrderDto = req.body;
    const newOrder: Order = await orderService.createOrder(orderData);
    res.status(201).json({ data: newOrder, message: "created" });
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerId, orderId } = req.params;
    const order: Order | null = await orderService.findOrder(
      customerId,
      orderId,
    );
    res.status(200).json({ data: order, message: "findOne" });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerId } = req.params;
    const orders: Order[] = await orderService.findAllOrders(customerId);
    res.status(200).json({ data: orders, message: "findAll" });
  } catch (error) {
    next(error);
  }
};

export const orderController = { createOrder, getOrders, getOrder };
