import { DataType, DataTypes, Model } from "sequelize";
import sequelize from "../config/sequalize";
enum Estado {
  PAGADA = "Pagada",
  NOPAGADA = "No Pagada",
}

class Facturas extends Model {
  public id!: number;
  public cliente!: number;
  public monto!: number;
  public fecha_emision!: Date;
  public estado!: Estado;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Facturas.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    monto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fecha_emision: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM,
      values: ["Pagada", "No Pagada"],
      defaultValue: "Pendiente",
    },
  },
  {
    sequelize,
    modelName: "Facturas",
    tableName: "facturas",
    timestamps: true,
  }
);

export default Facturas;
