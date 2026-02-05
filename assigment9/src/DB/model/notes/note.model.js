import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value !== value.toUpperCase();
        },
        message: "Title must not be entirely uppercase",
      },
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    strict: true,
    strictQuery: true,
    timestamps: true,
  }
);

export const noteModel =
  mongoose.models.note || mongoose.model("note", noteSchema);
