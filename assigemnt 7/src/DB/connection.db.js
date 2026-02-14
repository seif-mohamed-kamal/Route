import { Sequelize } from "sequelize";
import {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_HOST,
} from "../../config/config.service.js";

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();

    await sequelize.sync({
      alter: true,
      force: false,
      match: /_test/,
    });

    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
