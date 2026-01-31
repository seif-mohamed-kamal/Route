import { Router } from "express";
import {
  createBooksCollection,
  deleteBookBeforeYear,
  getBookAgg,
  getBookAgg2,
  getBookAgg3,
  getBookBygenre,
  getBookBylimit,
  getBookByTitle,
  getBookByYaerInteger,
  getBookByYear,
  getBookExcludeGenre,
  getBooksWithLogs,
} from "./books.services.js";
import { addBatch, addBook } from "./books.services.js";
import { updateBookFuture } from "./books.services.js";

const router = Router();
//Q1
router.post("/books", async (req, res, next) => {
  const collection = await createBooksCollection();
  res.status(201).send({
    message: "Books collection created",
  });
});

router.post("/books/index", async (req, res, next) => {
  const result = await creayeIndex();
  res.status(201).json({
    message: "Index for Title created successfuuly",
  });
});

//Q5
router.post("/books/add", async (req, res, next) => {
  const bookData = req.body;
  const result = await addBook(bookData);

  res.status(201).send({
    message: "Book inserted successfully",
    insertedId: result.insertedId,
  });
});

//Q6
router.post("/books/add/batch", async (req, res, next) => {
  const batch = req.body;
  const result = await addBatch(batch);
  res.status(201).json({
    message: "Batch inserted successfuuly",
  });
});

//Q8
router.patch("/books/Future", async (req, res, next) => {
  const date = Number(req.body.year);
  const result = await updateBookFuture(date);
  res.status(201).json({
    message: "Future Updated successfuuly",
  });
});

//Q9
router.get("/books/title", async (req, res, next) => {
  const title = req.query.title;
  const result = await getBookByTitle(title);
  res.status(200).json({
    message: "Book Found Successfully",
    result,
  });
});
//Q10
router.get("/books/year", async (req, res, next) => {
  const from = Number(req.query.from);
  const to = Number(req.query.to);
  const result = await getBookByYear(from, to);
  res.status(200).json({
    message: "Book Found Successfully",
    result,
  });
});

//Q11
router.get("/books/genre", async (req, res, next) => {
  const genre = req.query.genre;
  const result = await getBookBygenre(genre);
  res.status(200).json({
    message: "Books Found Successfully",
    result,
  });
});

//Q12
router.get("/books/limit", async (req, res, next) => {
  const result = await getBookBylimit();
  res.status(200).json({
    message: "Books Found Successfully",
    result,
  });
});

//Q13
router.get("/books/year-integer", async (req, res, next) => {
  const result = await getBookByYaerInteger();
  res.status(200).json({
    message: "Books Found Successfully",
    result,
  });
});

//Q14
router.get("/books/exclude-genres", async (req, res, next) => {
  const result = await getBookExcludeGenre();
  res.status(200).json({
    message: "Books Found Successfully",
    result,
  });
});

//Q15
router.delete("/books/before-year", async (req, res, next) => {
  const year = Number(req.query.year);
  const result = await deleteBookBeforeYear(year);
  res.status(200).json({
    message: "Books Deleted Successfully",
    result,
  });
});

//Q16
router.get("/books/aggregate1", async (req, res, next) => {
  const result = await getBookAgg();
  res.status(200).json({
    message: "Books Found Successfully",
    result,
  });
});

//Q17
router.get("/books/aggregate2", async (req, res, next) => {
  const result = await getBookAgg2();
  res.status(200).json({
    message: "Books Found Successfully",
    result,
  });
});

//Q18
router.get("/books/aggregate3", async (req, res, next) => {
  const result = await getBookAgg3();
  res.status(200).json({
    message: "Books Found Successfully",
    result,
  });
});

//Q19
router.get("/books/aggregate4", async (req, res, next) => {
  const result = await getBooksWithLogs();
  res.status(200).json({
    message: "Books Found Successfully",
    result,
  });
});

export default router;
