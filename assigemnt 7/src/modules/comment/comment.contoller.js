import { Router } from "express";
import {
  createComments,
  updateComment,
  findOrCreate,
  searchByWord,
  getNewest,
  getCommentDetailsById,
} from "./comment.services.js";

const router = Router();

router.post("/", async (req, res) => {
  const data = req.body;
  const result = await createComments(data);
  res.status(201).json({
    message: "Comments created successfully",
    result,
  });
});

router.patch("/:commentId", async (req, res) => {
  const data = req.body;
  const id = req.params.commentId;
  const result = await updateComment(id, data);
  res.status(200).json({
    message: "Comment updated successfully",
    result,
  });
});

router.post("/find-or-create", async (req, res) => {
  const { commentId, postId, userId, content } = req.body;

  const result = await findOrCreate(commentId, { postId, userId, content });
  res.status(200).json({
    message: "your comment",
    result,
  });
});

router.get("/search", async (req, res) => {
  const word = req.query.word;
  const {comments , count} = await searchByWord(word);
  res.status(200).json({count , comments });
});

router.get("/newest/:postId", async (req, res) => {
  const postId = req.params.postId;
  const result = await getNewest(postId);
  res.status(200).json(result);
});

router.get("/details/:id", async (req, res) => {
  const commentId = req.params.id;
  const result = await getCommentDetailsById(commentId);
  res.status(200).json(result);
});

export default router;
