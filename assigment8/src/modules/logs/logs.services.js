import { logsModel } from "../../DB/model/logs/logs.model.js";

export const createLogs = async () => {
  try {
    const collection = await logsModel;
    return collection;
  } catch (error) {
    throw new Error("server Error", {
      cause: { status: 500 },
    });
  }
};

export const addLogs = async (inputs) => {
  try {
    const collection = await logsModel;
    const result = await collection.insertOne(inputs);
    return result;
  } catch (error) {
    throw new Error("server Error", { cause: { status: 500 } });
  }
};

