import { Model, DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";

export class commentModel extends Model {}

commentModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    postId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "comment", timestamps: true }
);
