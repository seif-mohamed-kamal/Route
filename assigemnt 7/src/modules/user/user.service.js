import { where } from "sequelize";
import { userModel } from "../../DB/model/user.model.js";

export const upsertUser = async (id, data) => {
  const user = await userModel.update(data, {
    where: {
      id: id,
    },
  });
  if(!user[0]){
    throw new Error('Invalid accountId')
  }

  return user;
};

export const getUserByEmail = async (email) => {
  const user = await userModel.findOne({
    where: { email },
  });

  if (!user) throw new Error("User not found");

  return user;
};

export const getUserById = async (id) => {
  const user = await userModel.findByPk(id, {
    attributes: { exclude: ["role"] },
  });

  if (!user) throw new Error("User not found");

  return user;
};
