import { userModel } from "../../DB/model/user.model.js";

export const signup = async (inputs) => {
  const { name, email, password, role } = inputs;
  const user = userModel.create({ name, email, password, role },{validate:true});
  return user;
};
