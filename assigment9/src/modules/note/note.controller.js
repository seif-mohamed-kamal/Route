import { Router } from "express";
import {
  aggTitle,
  createNote,
  deleteAll,
  deleteNote,
  getNote,
  getNoteByContent,
  getNoteWithUser,
  replaceNote,
  skipNote,
  updateAll,
  updateNote,
} from "./note.sevice.js";
const router = Router();

router.post("/", async (req, res, next) => {
  const data = req.body;
  const result = await createNote(req.user.id, data);
  return res.status(201).json({
    message: "note created successfully",
    result,
  });
});

router.patch("/:Id", async (req, res, next) => {
  const noteId = req.params.Id;
  const data = req.body;
  const result = await updateNote(req.user.id, noteId, data);
  return res.status(201).json({
    message: "note updated successfully",
    result,
  });
});

router.put("/:Id", async (req, res, next) => {
  const noteId = req.params.Id;
  const data = req.body;
  const result = await replaceNote(req.user.id, noteId, data);
  return res.status(201).json({
    message: "note updated successfully",
    result,
  });
});

router.put("/update/all", async (req, res, next) => {
  const data = req.body;
  const result = await updateAll(req.user.id, data);
  return res.status(201).json({
    message: "note updated successfully",
    result,
  });
});

router.delete("/", async (req, res, next) => {
  const result = await deleteAll(req.user.id);
  return res.status(204).json({
    message: "notes deleted successfully",
    result,
  });
});

router.delete("/:Id", async (req, res, next) => {
  const noteId = req.params.Id;
  const result = await deleteNote(req.user.id, noteId);
  return res.status(204).json({
    message: "note deleted successfully",
    result,
  });
});

router.get("/paginate-sort", async (req, res, next) => {
  const limit = req.query.limit;
  const page = req.query.page;
  const skip = (page - 1) * limit;
  const result = await skipNote(req.user.id, skip, limit);
  return res.status(200).json({
    message: "note found successfully",
    result,
  });
});

router.get("/note-by-content", async (req, res, next) => {
  const content = req.query.content;
  //   console.log(content);
  const result = await getNoteByContent(req.user.id, content);
  return res.status(201).json({
    message: "note found successfully",
    result,
  });
});

router.get("/get-with-user", async (req, res, next) => {
  const result = await getNoteWithUser(req.user.id);
  return res.status(201).json({
    message: "note found successfully",
    result,
  });
});

router.get("/aggregate", async (req, res, next) => {
  const title = req.query.title;
  console.log(title);
  const result = await aggTitle(req.user.id, title);
  return res.status(201).json({
    message: "note found successfully",
    result,
  });
});

router.get("/:Id", async (req, res, next) => {
  const noteId = req.params.Id;
  const result = await getNote(req.user.id, noteId);
  return res.status(201).json({
    message: "note found successfully",
    result,
  });
});

export default router;
