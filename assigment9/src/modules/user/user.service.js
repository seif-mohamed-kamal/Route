import { startSession } from "mongoose";
import { userModel } from "../../DB/model/users/index.js";

export const profile = async (userId) => {
  const user = await userModel.findById(userId).select("-password");
  return user;
};

export const updateUser = async (userId, inputs) => {
  try {
    if (inputs.email) {
      const checkEmail = await userModel.findOne({ email: inputs.email });
      if (checkEmail) {
        throw new Error("Email already Exist", { cause: { status: 409 } });
      }
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, inputs, {
      new: true,
      runValidators: true,
    });

    return updatedUser;
  } catch (error) {
    throw new Error(error.message || "Server Error", {
      cause: error.cause || { status: 500 },
    });
  }
};

export const deleteUser = async (userId) => {
  try {
    const user = await userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("there is no user with that Id", {
        cause: { status: 404 },
      });
    }
    return user;
  } catch (error) {
    throw new Error(error.message || "server Error", {
      cause: error.cause || { status: 500 },
    });
  }
};


