import { DB } from "@src/db";
import { Order } from "@src/types/models.interface";
import { CreateOrderDto } from "@src/validators/createOrder.validator";

const createOrder = async (payload: CreateOrderDto) => {
  const ms = new Date();
  const date = ms.toISOString().split("T")[0];

  const newOrder: Order = await DB.Orders.create({
    ...payload,
    date: payload.date || date,
  });
  return newOrder;
};
const findOrder = async (
  customerId: string,
  orderId: string,
): Promise<Order | null> => {
  const orders: Order | null = await DB.Orders.findOne({
    where: { customerId, id: orderId },
  });
  return orders;
};

const findAllOrders = async (customerId: string): Promise<Order[]> => {
  const orders: Order[] = await DB.Orders.findAll({
    where: { customerId },
  });
  return orders;
};

export const orderService = { findAllOrders, findOrder, createOrder };
