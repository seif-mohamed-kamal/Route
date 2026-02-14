import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";

export const postModel = sequelize.define(
  "post",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
  },
  { timestamps: true }
);
