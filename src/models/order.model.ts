import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { Order } from "@src/types/models.interface";

type OrderCreationAttributes = Optional<Order, "id" | "date">;
export interface OrderInstance
  extends Model<Order, OrderCreationAttributes>,
    Order {}

export const OrderModel = (sequelize: Sequelize) =>
  sequelize.define<OrderInstance>(
    "Order",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        allowNull: false,
      },
      customerId: {
        type: DataTypes.UUID,
        references: {
          model: {
            tableName: "customers",
            schema: "schema",
          },
          key: "id",
        },
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.fn("strftime", "%d-%m-%Y", "now"),
        allowNull: false,
      },
    },
    {
      underscored: true,
      tableName: "orders",
      timestamps: false,
    },
  );
