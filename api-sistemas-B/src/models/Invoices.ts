import { DataType, DataTypes, Model } from "sequelize";
import sequelize from "../config/sequalize";
enum Statuses {
  PAID = "Paid",
  UNPAID = "Unpaid",
}

class Invoices extends Model {
  public invoice_id!: number;
  public customer!: number;
  public amount_due!: number;
  public date_issued!: Date;
  public status!: Statuses;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Invoices.init(
  {
    invoice_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    customer: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount_due: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date_issued: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["Paid", "Unpaid"],
      defaultValue: "Paid",
    },
  },
  {
    sequelize,
    modelName: "Invoices",
    tableName: "invoices",
    timestamps: true,
  }
);

export default Invoices;
