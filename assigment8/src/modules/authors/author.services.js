import { authorModel } from "../../DB/model/authors/auther.model.js";

export const createAuthor = async (authorData) => {
  try {
    const result = await authorModel.insertOne(authorData); 
    return result;
  } catch (error) {
    throw new Error("Failed to create author: " + error.message);
  }
};
