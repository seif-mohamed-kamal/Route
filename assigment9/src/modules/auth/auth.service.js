import { hash, compare } from "bcrypt";
import { userModel } from "../../DB/model/users/users.model.js";
import {
  encrypt_key,
  SALT_ROUND,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} from "../../../config/config.service.js";
import jwt from "jsonwebtoken";

import Cryptr from "cryptr";

export const signup = async (inputs) => {
  try {
    const { name, email, password, phone, age } = inputs;
    const checkEmail = await userModel.findOne({ email });
    if (checkEmail) {
      throw new Error("Email already Exists", { cause: { status: 409 } });
    }
    // console.log(encrypt_key)
    const cyptr = new Cryptr(encrypt_key);
    const encryp = cyptr.encrypt(phone);
    const hashPass = await hash(password, SALT_ROUND);
    const user = new userModel({
      name,
      email,
      password: hashPass,
      phone: encryp,
      age,
    });
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message || "Server Error", {
      cause: error.cause || { status: 500 },
    });
  }
};

export const login = async (inputs) => {
  try {
    const { email, password } = inputs;

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password", {
        cause: { status: 404 },
      });
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password", {
        cause: { status: 404 },
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    return {
      token,
    };
  } catch (error) {
    throw new Error(error.message || "Server Error", {
      cause: error.cause || { status: 500 },
    });
  }
};
 
