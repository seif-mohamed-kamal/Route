import { db } from "../../connection.db.js";

export const logsModel = await db.createCollection("logs", {capped: true,size: 1000, max: 2});