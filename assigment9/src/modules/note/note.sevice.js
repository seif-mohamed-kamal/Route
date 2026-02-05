import mongoose from "mongoose";
import { noteModel } from "../../DB/model/notes/note.model.js";

export const createNote = async (userId, inputs) => {
  try {
    const { title, content } = inputs;
    const user = await noteModel.create({
      userId,
      title,
      content,
    });
    return user;
  } catch (error) {
    throw new Error("server Error", { cause: { status: 500 } });
  }
};

export const updateNote = async (userId, noteId, inputs) => {
  try {
    const note = await noteModel.findById(noteId);
    if (!note) {
      throw new Error("there is no note wuth that id", {
        cause: { status: 404 },
      });
    }
    if (userId != note.userId) {
      throw new Error("you cannot update that note", {
        cause: { status: 404 },
      });
    }

    const updatedNote = await noteModel.findByIdAndUpdate(noteId, inputs, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    throw new Error(error.message || "server Error", {
      cause: error.cause || { status: 500 },
    });
  }
};

export const replaceNote = async (userId, noteId, inputs) => {
  try {
    const note = await noteModel.findById(noteId);
    if (!note) {
      throw new Error("there is no note wuth that id", {
        cause: { status: 404 },
      });
    }
    if (userId != note.userId) {
      throw new Error("you cannot update that note", {
        cause: { status: 404 },
      });
    }

    const updatedNote = await noteModel.findOneAndReplace(
      { _id: noteId },
      inputs,
      {
        new: true,
        runValidators: true,
      }
    );
  } catch (error) {
    throw new Error(error.message || "server Error", {
      cause: error.cause || { status: 500 },
    });
  }
};

export const updateAll = async (userId, inputs) => {
  try {
    const updatedNote = await noteModel.updateMany({ userId }, inputs);
    return updatedNote;
  } catch (error) {
    throw new Error(error.message || "server Error", {
      cause: error.cause || { status: 500 },
    });
  }
};

export const deleteNote = async (userId, noteId) => {
  try {
    const note = await noteModel.findById(noteId);
    if (!note) {
      throw new Error("there is no note wuth that id", {
        cause: { status: 404 },
      });
    }
    if (userId != note.userId) {
      throw new Error("you cannot delleete that note", {
        cause: { status: 404 },
      });
    }

    const updatedNote = await noteModel.findOneAndDelete({ _id: noteId });
  } catch (error) {
    throw new Error(error.message || "server Error", {
      cause: error.cause || { status: 500 },
    });
  }
};

export const getNote = async (userId, noteId) => {
  try {
    const note = await noteModel.findById(noteId);
    if (!note) {
      throw new Error("Note not found", {
        cause: { status: 404 },
      });
    }
    if (userId != note.userId) {
      throw new Error("you are not the owner", {
        cause: { status: 404 },
      });
    }

    return note;
  } catch (error) {
    throw new Error(error.message || "server Error", {
      cause: error.cause || { status: 500 },
    });
  }
};

export const getNoteByContent = async (userId, input) => {
  try {
    const note = await noteModel.findOne({ content: input });
    if (!note) {
      throw new Error("Note not found", {
        cause: { status: 404 },
      });
    }
    if (userId != note.userId) {
      throw new Error("you are not the owner", {
        cause: { status: 404 },
      });
    }

    return note;
  } catch (error) {
    throw new Error(error.message || "server Error", {
      cause: error.cause || { status: 500 },
    });
  }
};

export const getNoteWithUser = async (userId) => {
  try {
    const result = await noteModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      { $unwind: "$userId" },
      {
        $project: {
          title: 1,
          userId: {
            email: 1,
          },
          createdAt: 1,
          _id: 0,
        },
      },
    ]);

    if (!result || result.length === 0) {
      throw new Error("No notes found", { cause: { status: 404 } });
    }
    return result;
  } catch (error) {
    throw new Error(error.message || "Server Error", {
      cause: error.cause || { status: 500 },
    });
  }
};

export const aggTitle = async (userId, input) => {
  try {
    const result = await noteModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId), title: input } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          title: 1,
          userId: 1,
          createdAt: 1,
          user: {
            name: 1,
            email: 1,
          },
          _id: 0,
        },
      },
    ]);

    if (!result || result.length === 0) {
      throw new Error("No notes found", { cause: { status: 404 } });
    }
    return result;
  } catch (error) {
    throw new Error(error.message || "Server Error", {
      cause: error.cause || { status: 500 },
    });
  }
};

export const deleteAll = async (userId) => {
  try {
    const result = await noteModel.deleteMany({ userId });
    return "Done";
  } catch (error) {
    throw new Error(error.message || "Server Error", {
      cause: error.cause || { status: 500 },
    });
  }
};

export const skipNote = async (userId, skip, limit) => {
  try {
    const result = await noteModel
    .find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    if (!result || result.length === 0) {
      throw new Error("No notes found", { cause: { status: 404 } });
    }
    return result;
  } catch (error) {
    throw new Error(error.message || "Server Error", {
      cause: error.cause || { status: 500 },
    });
  }
};
