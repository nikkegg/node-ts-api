import { Sequelize, Model, DataTypes, Optional } from "sequelize";
import { Customer } from "@src/types/models.interface";

type CustomerCreationAttributes = Optional<Customer, "id">;
export interface CustomerInstance
  extends Model<Customer, CustomerCreationAttributes>,
    Customer {}

export const CustomerModel = (sequelize: Sequelize) =>
  sequelize.define<CustomerInstance>(
    "Customer",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(45),
        unique: true,
        allowNull: false,
      },
      givenName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      familyName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      underscored: true,
      tableName: "customers",
      timestamps: false,
    },
  );
