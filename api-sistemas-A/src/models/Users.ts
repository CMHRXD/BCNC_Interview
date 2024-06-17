import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequalize";
import Clients from "./Clients";

export interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "User" }
);

User.hasMany(Clients, { foreignKey: "userId" });
Clients.belongsTo(User, { foreignKey: "userId" });

export default User;
