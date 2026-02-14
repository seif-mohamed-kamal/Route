import { commentModel } from "../../DB/model/comment.model.js";
import { postModel, userModel } from "../../DB/model/index.js";
import { Op } from "sequelize";

export const createComments = async (commentsArray) => {
  const comments = await commentModel.bulkCreate(commentsArray, {
    validate: true,
  });
  return comments;
};

export const updateComment = async (commentId, inputs) => {
  const comment = await commentModel.findByPk(commentId);

  if (!comment)
    throw new Error("there is no comment", { cause: { status: 404 } });
  if (inputs.userId != comment.userId)
    throw new Error("you are not auth", { cause: { status: 404 } });
  await comment.update(inputs);
  return comment;
};

export const findOrCreate= async (commentId, inputs) => {
  let comment = await commentModel.findByPk(commentId);
  if (comment) {
    return comment;
  }
  comment = await commentModel.create(inputs);
  return comment;
};

export const searchByWord = async (word) => {
  const { count, rows } = await commentModel.findAndCountAll({
    where: {
      content: {
        [Op.like]: `%${word}%`,
      },
    },
  });

  return { count, comments: rows };
};

export const getNewest = async (postId) => {
  const comments = await commentModel.findAll({
    where: { postId },
    order: [["createdAt", "DESC"]],
    limit: 3,
  });

  return comments;
};

export const getCommentDetailsById = async (commentId) => {
  const comment = await commentModel.findByPk(commentId, {
    attributes:["id" ,"content"],
    include: [
      { model: userModel, as: "user", attributes: ["id", "name" , "email"] },
      { model: postModel, as: "post", attributes: ["id", "title" , "content"] },
    ],
  });

  if (!comment) {
    throw new Error("Comment not found", { cause: { status: 404 } });
  }
  return comment;
};
