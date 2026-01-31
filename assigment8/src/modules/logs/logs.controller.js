import { Router } from "express";
import { addLogs, createLogs } from "./logs.services.js";
const router = Router();

router.post("/", async (req, res, next) => {
  const result = createLogs();
  res.status(201).send({
    message: "Books collection created",
    result,
  });
});

router.post("/add-logs", async (req, res, next) => {
  const data = req.body;
  const result = addLogs(data);
  res.status(201).send({
    message: "Books collection created",
    result,
  });
});


export default router;
