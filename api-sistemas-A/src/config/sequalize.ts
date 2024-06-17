import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

console.log(process.env.DATABASE_URL);
console.log(__dirname + "/../models");
const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "sqlite",
  storage: `${process.env.DATABASE_NAME}.sqlite`,
  logging: false,
});

const authenticateDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log("Database connection has been established.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { authenticateDB };
export default sequelize;
