import { Router } from "express";
import { upsertUser, getUserByEmail, getUserById } from "./user.service.js";

const router = Router();

router.put("/:id", async (req, res, next) => {
  const result = await upsertUser(req.params.id, req.body);

  res.status(201).json({
    message: "User updated",
    result,
  });
});

router.get("/by-email", async (req, res, next) => {
  const result = await getUserByEmail(req.query.email);

  res.status(200).json({
    message: "User found",
    result,
  });
});

router.get("/:id", async (req, res, next) => {
  const result = await getUserById(req.params.id);

  res.status(200).json({
    message: "User retrieved",
    result,
  });
});

export default router;
