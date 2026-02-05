import { Router } from "express";
import { auth } from "../../middleware/token.js";
import { deleteUser, profile, updateUser } from "./user.service.js";

const router = Router();

router.get("/", async (req, res, next) => {
  const result = await profile(req.user.id);
  return res.status(200).json({
    message: "Profile",
    result,
  });
});

router.patch("/" , async(req,res,next) => {
    const data = req.body;
    const result = await updateUser(req.user.id,data);
    return res.status(201).json({
      message: "user updated successfully",
      result,
    });
})

router.delete("/", async (req, res, next) => {
    const result = await deleteUser(req.user.id);
    return res.status(200).json({
      message: "user deleted successfully",
      result,
    });
  });
  
export default router;
