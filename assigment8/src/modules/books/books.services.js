import { bookModel } from "../../DB/model/books/index.js";
import { logsModel } from "../../DB/model/logs/logs.model.js";
import { ObjectId } from "mongodb";


export const createBooksCollection = async () => {
  try {
    const collection = await bookModel;
    return collection;
  } catch (error) {
    throw new Error("server Error", {
      cause: { status: 500 },
    });
  }
};

export const addBook = async (bookData) => {
  try {
    const collection = await bookModel;
    const result = await collection.insertOne(bookData);

    return result;
  } catch (error) {
    throw new Error("server Error", { cause: { status: 500 } });
  }
};

export const addBatch = async (inputs) => {
  try {
    if (!Array.isArray(inputs) || inputs.length < 3) {
      throw new Error("Batch must contain at least 3 documents", {
        cause: { status: 400 },
      });
    }
    const collection = await bookModel;
    const result = await collection.insertMany(inputs);
    return result;
  } catch (error) {
    if (error.message === "Batch must contain at least 3 documents") {
      throw error;
    }
    throw new Error(`Error inserting batch: ${error.message}`, {
      cause: { status: 500 },
    });
  }
};

export const updateBookFuture = async (bookData) => {
  try {
    const collection = await bookModel;
    const result = await collection.updateOne(
      { title: "Future" },
      { $set: { year: bookData } }
    );
    return result;
  } catch (error) {
    throw new Error("server Error", { cause: { status: 500 } });
  }
};

export const getBookByTitle = async (input) => {
  try {
    const collection = await bookModel;
    const result = await collection.findOne({ title: input });
    if (!result) {
      throw new Error(`The book with title: ${input} not found`, {
        cause: { status: 404 },
      });
    }
    return result;
  } catch (error) {
    if (error.message === `The book with title: ${input} not found`) {
      throw error;
    }
    throw new Error("server Error", { cause: { status: 500 } });
  }
};

export const getBookByYear = async (fromYear, toYear) => {
  try {
    const collection = await bookModel;
    const result = await collection
      .find({ year: { $gte: fromYear, $lte: toYear } })
      .toArray();
    if (!result) {
      throw new Error("there is no books", {
        cause: { status: 404 },
      });
    }
    return result;
  } catch (error) {
    if (error.message === "there is no books") {
      throw error;
    }
    throw new Error("server Error", { cause: { status: 500 } });
  }
};

export const getBookBygenre = async (input) => {
  try {
    const collection = await bookModel;
    const result = await collection
      .find({ genres: { $in: [input] } })
      .toArray();
    if (!result) {
      throw new Error(`The books with genre: ${input} not found`, {
        cause: { status: 404 },
      });
    }
    return result;
  } catch (error) {
    if (error.message === `The books with genre: ${input} not found`) {
      throw error;
    }
    throw new Error("server Error", { cause: { status: 500 } });
  }
};

export const getBookBylimit = async (input) => {
  try {
    const collection = await bookModel;
    const result = await collection.find({}).skip(2).limit(3).toArray();
    if (!result) {
      throw new Error("No Books To Fetch", {
        cause: { status: 404 },
      });
    }
    return result;
  } catch (error) {
    if (error.message === "No Books To Fetch") {
      throw error;
    }
    throw new Error("server Error", { cause: { status: 500 } });
  }
};

export const getBookByYaerInteger = async () => {
  try {
    const collection = await bookModel;
    const batch = await collection.find({ year: { $type: 16 } }).toArray();
    if (!batch) {
      throw new Error("NO book with year Integer", { cause: { status: 404 } });
    }
    // console.log(batch);
    return batch;
  } catch (error) {
    if (error.message === "NO book with year Integer") {
      throw error;
    }
    throw new Error("server Error", { cause: { status: 500 } });
  }
};

export const getBookExcludeGenre = async () => {
  try {
    const collection = await bookModel;
    const batch = await collection
      .find({ genres: { $nin: ["Horror"] } })
      .toArray();
    if (!batch) {
      throw new Error("NO book Found", { cause: { status: 404 } });
    }
    // console.log(batch);
    return batch;
  } catch (error) {
    if (error.message === "No book found") {
      throw error;
    }
    throw new Error("server Error", { cause: { status: 500 } });
  }
};

export const deleteBookBeforeYear = async (input) => {
  try {
    const collection = await bookModel;
    const batch = await collection.find({ year: { $lt: input } }).toArray();
    if (batch.length === 0) {
      throw new Error("No book found", {
        cause: { status: 404 },
      });
    }
    await collection.deleteMany({ year: { $lt: input } });
    return batch;
  } catch (error) {
    if (error.message === "No book found") {
      throw error;
    }
    throw new Error("server Error", { cause: { status: 500 } });
  }
};

export const getBookAgg = async () => {
  try {
    const collection = await bookModel;
    const batch = await collection
      .find({ year: { $gt: 2000 } })
      .sort({ year: -1 })
      .toArray();
    if (batch.length === 0) {
      throw new Error("No book found", {
        cause: { status: 404 },
      });
    }
    return batch;
  } catch (error) {
    if (error.message === "No book found") {
      throw error;
    }
    throw new Error("server Error", { cause: { status: 500 } });
  }
};

export const getBookAgg2 = async () => {
  try {
    const collection = await bookModel;
    const batch = await collection
      .find({ year: { $gt: 2000 } })
      .project({ title: 1, author: 1, year: 1, _id: 0 })
      .toArray();
    if (batch.length === 0) {
      throw new Error("No book found", {
        cause: { status: 404 },
      });
    }
    return batch;
  } catch (error) {
    if (error.message === "No book found") {
      throw error;
    }
    throw new Error("server Error", { cause: { status: 500 } });
  }
};

export const getBookAgg3 = async () => {
  try {
    const collection = await bookModel;
    const batch = await collection
      .aggregate([
        { $match: { year: { $gt: 2000 } } },
        { $project: { title: 1, genres: 1, _id: 0 } },
        { $unwind: "$genres" },
      ]).toArray();

    if (batch.length === 0) {
      throw new Error("No book found", {
        cause: { status: 404 },
      });
    }
    return batch;
  } catch (error) {
    if (error.message === "No book found") {
      throw error;
    }
    throw new Error("server Error", { cause: { status: 500 } });
  }
};

export const getBooksWithLogs = async () => {
  try {
    const result = await logsModel.aggregate([
      {
        $lookup: {
          from: "books",
          let: { bookId: { $toObjectId: "$book_id" } }, 
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$bookId"] } } }
          ],
          as: "book_details"
        }
      },
      {
        $project: {
          action: 1,
          book_details: { title: 1, author: 1, year: 1 }, 
          _id: 0
        }
      }
    ]).toArray();

    if (!result || result.length === 0) {
      throw new Error("No logs found", { cause: { status: 404 } });
    }
    return result;
  } catch (error) {
    throw new Error(error.message || "Server Error", {
      cause: error.cause || { status: 500 }
    });
  }
};
