import { DataType, DataTypes, Model } from "sequelize";
import sequelize from "../config/sequalize";

class Clients extends Model {
  public clientId!: string;
  public clientSecret!: string;
  public grants!: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Clients.init(
  {
    clientId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    clientSecret: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    grants: {
      type: DataTypes.STRING,
      get: function () {
        return JSON.parse(this.getDataValue("grants"));
      },
      set: function (val) {
        return this.setDataValue("grants", JSON.stringify(val));
      },
      allowNull: false,
    },
  },
  { sequelize, modelName: "Clients", tableName: "Clients", timestamps: true }
);

export default Clients;
