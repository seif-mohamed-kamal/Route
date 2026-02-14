import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";

export const userModel = sequelize.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" },
  },
  {
    timestamps: true,
    paranoid: true,
    validate: {
      checkPasswordLength() {
        if (this.password.length <= 6) throw new Error("Password must be greater than 6 characters");
      },
    },
  }
);

userModel.addHook("beforeCreate", (user) => {
  if (user.name.length <= 2) throw new Error("Name must be greater than 2 characters");
});
