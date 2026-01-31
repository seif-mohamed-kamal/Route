import { Router } from "express";
import { createAuthor } from "./author.services.js";
const router = Router();

router.post("/", async (req, res, next) => {
  const data = req.body;
  const result = createAuthor(data);
  res.status(201).send({
    message: "Books collection created",
    result,
  });
});

export default router;
