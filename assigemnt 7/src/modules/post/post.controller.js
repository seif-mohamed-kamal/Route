import { Router } from "express";
import { createPost, deletePost, getCommentsCount, getPostsWithDetails } from "./post.services.js";
const router = Router();

router.post("/", async (req, res, next) => {
  const data = req.body;
  const result = await createPost(data);
  res.status(201).json({
    message: "post created successfully",
    result,
  });
});

router.get("/details", async (req, res, next) => {
  const result = await getPostsWithDetails();
  res.status(200).json({
    message: "posts found",
    result,
  });
});

router.get("/comment-count", async (req, res, next) => {
  const result = await getCommentsCount();
  res.status(200).json({
    message: "posts found",
    result,
  });
});

router.delete("/:postId", async (req, res, next) => {
  const {userId} = req.body;
  const postId = req.params.postId;
  const result = await deletePost(postId ,userId);
  res.status(200).json({
    message: "post created successfully",
    result,
  });
});


export default router;
